"use strict";

require("dotenv").config();

const path = require("path");
const fs = require("fs");
const express = require("express");
const Database = require("better-sqlite3");
const Stripe = require("stripe");

const PORT = Number(process.env.PORT) || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "lumar2026";
const PUBLIC_BASE_URL = (process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`).replace(/\/$/, "");
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const FREE_SHIPPING_THRESHOLD = 45;

const stripe =
  STRIPE_SECRET_KEY && STRIPE_SECRET_KEY.startsWith("sk_test_") && !STRIPE_SECRET_KEY.includes("reemplaza")
    ? new Stripe(STRIPE_SECRET_KEY)
    : null;

const DATA_DIR = path.join(__dirname, "data");
fs.mkdirSync(DATA_DIR, { recursive: true });
const DB_PATH = path.join(DATA_DIR, "lumar.db");

const SEED_PRODUCTS = [
  {
    id: "alhambra",
    nombre: "Alhambra al Atardecer",
    precio: 18,
    stock: 20,
    coleccion: "relajacion",
    descripcion:
      "Una puesta de sol sobre los muros de la Alhambra: azahar dulce y vainilla cremosa que envuelve la estancia con calma andaluza.",
  },
  {
    id: "sierra",
    nombre: "Sierra Nevada",
    precio: 22,
    stock: 20,
    coleccion: "energia",
    descripcion:
      "Aire fresco de cumbre: pino resinoso y eucalipto limpio para despejar la mente y renovar el ambiente.",
  },
  {
    id: "albaicin",
    nombre: "Albaicín",
    precio: 16,
    stock: 20,
    coleccion: "relajacion",
    descripcion:
      "Callejeo lento por el barrio blanco: lavanda serena y romero mediterráneo para soltar el día.",
  },
  {
    id: "darro",
    nombre: "Carmen del Darro",
    precio: 20,
    stock: 20,
    coleccion: "romanticas",
    descripcion: "Rosa de jardín y ámbar cálido, como una carmen junto al río Darro al caer la tarde.",
  },
  {
    id: "sacromonte",
    nombre: "Sacromonte al Anochecer",
    precio: 19,
    stock: 20,
    coleccion: "relajacion",
    descripcion:
      "Notas profundas de sándalo e incienso suave, evocando cuevas, guitarra y el silencio del Sacromonte.",
  },
  {
    id: "naranjos",
    nombre: "Patio de los Naranjos",
    precio: 17,
    stock: 20,
    coleccion: "energia",
    descripcion:
      "Naranja amarga vibrante y canela suave: el aroma de un patio granadino en invierno soleado.",
  },
  {
    id: "generalife",
    nombre: "Jardines del Generalife",
    precio: 18,
    stock: 20,
    coleccion: "romanticas",
    descripcion:
      "Jazmín floral y limón luminoso, como pasear entre los jardines del Generalife al mediodía.",
  },
  {
    id: "bib",
    nombre: "Plaza Bib-Rambla",
    precio: 15,
    stock: 20,
    coleccion: "energia",
    descripcion:
      "Limón brillante y hierbabuena fresca: el zumbido alegre de la plaza un domingo por la mañana.",
  },
];

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS productos (
    id TEXT PRIMARY KEY,
    nombre TEXT NOT NULL,
    precio REAL NOT NULL,
    stock INTEGER NOT NULL,
    coleccion TEXT NOT NULL,
    descripcion TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numero TEXT UNIQUE NOT NULL,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    direccion TEXT NOT NULL,
    codigo_postal TEXT NOT NULL,
    ciudad TEXT NOT NULL,
    envio TEXT NOT NULL,
    coste_envio REAL NOT NULL,
    pago TEXT NOT NULL,
    subtotal REAL NOT NULL,
    total REAL NOT NULL,
    items_json TEXT NOT NULL,
    estado TEXT NOT NULL DEFAULT 'pendiente',
    stripe_session_id TEXT,
    pago_stripe TEXT,
    creado_en TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin_sessions (
    token TEXT PRIMARY KEY,
    created_at TEXT NOT NULL
  );
`);

const insertProduct = db.prepare(`
  INSERT OR IGNORE INTO productos (id, nombre, precio, stock, coleccion, descripcion)
  VALUES (@id, @nombre, @precio, @stock, @coleccion, @descripcion)
`);

const seedTx = db.transaction(() => {
  for (const p of SEED_PRODUCTS) insertProduct.run(p);
});
seedTx();

function shippingCost(zone, subtotal) {
  if (zone === "granada") return 3.9;
  if (zone === "baleares") return 8.9;
  if (zone === "peninsula") {
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5.9;
  }
  return null;
}

function orderNumberFromId(id) {
  return `LUMAR-${String(id).padStart(4, "0")}`;
}

function parseCookies(req) {
  const header = req.headers.cookie || "";
  const out = {};
  header.split(";").forEach((part) => {
    const [k, ...rest] = part.trim().split("=");
    if (!k) return;
    out[k] = decodeURIComponent(rest.join("=") || "");
  });
  return out;
}

function requireAdmin(req, res, next) {
  const cookies = parseCookies(req);
  const token = cookies.lumar_admin || req.headers["x-admin-token"];
  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }
  const row = db.prepare("SELECT token FROM admin_sessions WHERE token = ?").get(token);
  if (!row) {
    return res.status(401).json({ error: "Sesión inválida" });
  }
  next();
}

function createAdminToken() {
  const token = require("crypto").randomBytes(24).toString("hex");
  db.prepare("INSERT INTO admin_sessions (token, created_at) VALUES (?, ?)").run(
    token,
    new Date().toISOString()
  );
  return token;
}

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, stripe: Boolean(stripe) });
});

app.get("/api/productos", (_req, res) => {
  const rows = db
    .prepare(
      "SELECT id, nombre, precio, stock, coleccion, descripcion FROM productos ORDER BY nombre COLLATE NOCASE"
    )
    .all();
  res.json(rows);
});

app.post("/api/pedidos", async (req, res) => {
  try {
    const body = req.body || {};
    const nombre = String(body.nombre || "").trim();
    const email = String(body.email || "").trim();
    const direccion = String(body.direccion || "").trim();
    const codigoPostal = String(body.codigo_postal || body.cp || "").trim();
    const ciudad = String(body.ciudad || "").trim();
    const envio = String(body.envio || "").trim();
    const pago = String(body.pago || "").trim();
    const items = Array.isArray(body.items) ? body.items : [];

    if (!nombre || !email || !direccion || !codigoPostal || !ciudad || !envio || !pago) {
      return res.status(400).json({ error: "Faltan datos obligatorios del pedido" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Email no válido" });
    }
    if (!["granada", "peninsula", "baleares"].includes(envio)) {
      return res.status(400).json({ error: "Método de envío no válido" });
    }
    if (!["Bizum", "Tarjeta", "PayPal", "Transferencia"].includes(pago)) {
      return res.status(400).json({ error: "Método de pago no válido" });
    }
    if (!items.length) {
      return res.status(400).json({ error: "El carrito está vacío" });
    }

    const getProduct = db.prepare("SELECT * FROM productos WHERE id = ?");
    const normalized = [];
    let subtotal = 0;

    for (const raw of items) {
      const qty = Math.max(1, Math.min(20, parseInt(raw.qty ?? raw.cantidad ?? 1, 10) || 1));
      const productId = raw.productId || raw.id || null;
      const type = raw.type || (productId ? "product" : "custom");

      if (type === "product" && productId) {
        const product = getProduct.get(productId);
        if (!product) {
          return res.status(400).json({ error: `Producto no encontrado: ${productId}` });
        }
        if (product.stock < qty) {
          return res.status(409).json({
            error: `Stock insuficiente de ${product.nombre} (quedan ${product.stock})`,
          });
        }
        const lineTotal = product.precio * qty;
        subtotal += lineTotal;
        normalized.push({
          type: "product",
          productId: product.id,
          nombre: product.nombre,
          precio: product.precio,
          qty,
        });
      } else {
        const precio = Number(raw.precio ?? raw.price);
        const nombreItem = String(raw.nombre || raw.name || "Artículo personalizado").trim();
        if (!Number.isFinite(precio) || precio < 0) {
          return res.status(400).json({ error: "Precio de línea no válido" });
        }
        subtotal += precio * qty;
        normalized.push({
          type,
          productId: productId || null,
          nombre: nombreItem,
          precio,
          qty,
          meta: raw.meta || null,
        });
      }
    }

    const costeEnvio = shippingCost(envio, subtotal);
    if (costeEnvio === null) {
      return res.status(400).json({ error: "No se pudo calcular el envío" });
    }
    const total = Math.round((subtotal + costeEnvio) * 100) / 100;
    const creadoEn = new Date().toISOString();

    const createOrder = db.transaction(() => {
      const info = db
        .prepare(
          `INSERT INTO pedidos (
            numero, nombre, email, direccion, codigo_postal, ciudad,
            envio, coste_envio, pago, subtotal, total, items_json, estado, creado_en
          ) VALUES (
            'TEMP', @nombre, @email, @direccion, @codigo_postal, @ciudad,
            @envio, @coste_envio, @pago, @subtotal, @total, @items_json, 'pendiente', @creado_en
          )`
        )
        .run({
          nombre,
          email,
          direccion,
          codigo_postal: codigoPostal,
          ciudad,
          envio,
          coste_envio: costeEnvio,
          pago,
          subtotal,
          total,
          items_json: JSON.stringify(normalized),
          creado_en: creadoEn,
        });

      const id = Number(info.lastInsertRowid);
      const numero = orderNumberFromId(id);
      db.prepare("UPDATE pedidos SET numero = ? WHERE id = ?").run(numero, id);

      const dec = db.prepare("UPDATE productos SET stock = stock - ? WHERE id = ? AND stock >= ?");
      for (const line of normalized) {
        if (line.type === "product" && line.productId) {
          const result = dec.run(line.qty, line.productId, line.qty);
          if (result.changes !== 1) {
            throw new Error(`No se pudo descontar stock de ${line.productId}`);
          }
        }
      }

      return { id, numero };
    });

    const { id, numero } = createOrder();

    let pagoStripe = "no_aplica";
    let stripeSessionId = null;
    let stripeCheckoutUrl = null;

    if (pago === "Tarjeta") {
      if (stripe) {
        try {
          const session = await stripe.checkout.sessions.create({
            mode: "payment",
            customer_email: email,
            line_items: [
              {
                price_data: {
                  currency: "eur",
                  product_data: {
                    name: `Pedido ${numero} — LUMAR Velas`,
                    description: "Pedido de prueba (Stripe TEST)",
                  },
                  unit_amount: Math.round(total * 100),
                },
                quantity: 1,
              },
            ],
            success_url: `${PUBLIC_BASE_URL}/?pedido=${encodeURIComponent(numero)}&pago=ok`,
            cancel_url: `${PUBLIC_BASE_URL}/?pedido=${encodeURIComponent(numero)}&pago=cancelado`,
            metadata: { numero, pedido_id: String(id) },
          });
          stripeSessionId = session.id;
          stripeCheckoutUrl = session.url;
          // Simulación de pago de prueba completado (sin exigir redirect real)
          pagoStripe = "pagado_simulado";
          db.prepare(
            "UPDATE pedidos SET stripe_session_id = ?, pago_stripe = ? WHERE id = ?"
          ).run(stripeSessionId, pagoStripe, id);
        } catch (err) {
          console.error("Stripe error:", err.message);
          pagoStripe = "error_stripe_pedido_guardado";
          db.prepare("UPDATE pedidos SET pago_stripe = ? WHERE id = ?").run(pagoStripe, id);
        }
      } else {
        pagoStripe = "simulado_sin_clave_stripe";
        db.prepare("UPDATE pedidos SET pago_stripe = ? WHERE id = ?").run(pagoStripe, id);
      }
    }

    res.status(201).json({
      ok: true,
      numero,
      total,
      coste_envio: costeEnvio,
      estado: "pendiente",
      pago_stripe: pagoStripe,
      stripe_session_id: stripeSessionId,
      stripe_checkout_url: stripeCheckoutUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || "No se pudo crear el pedido" });
  }
});

app.post("/api/admin/login", (req, res) => {
  const password = String((req.body && req.body.password) || "");
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Contraseña incorrecta" });
  }
  const token = createAdminToken();
  res.setHeader(
    "Set-Cookie",
    `lumar_admin=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
  );
  res.json({ ok: true, token });
});

app.post("/api/admin/logout", requireAdmin, (req, res) => {
  const cookies = parseCookies(req);
  const token = cookies.lumar_admin || req.headers["x-admin-token"];
  if (token) db.prepare("DELETE FROM admin_sessions WHERE token = ?").run(token);
  res.setHeader("Set-Cookie", "lumar_admin=; Path=/; Max-Age=0");
  res.json({ ok: true });
});

app.get("/api/admin/resumen", requireAdmin, (_req, res) => {
  const pedidos = db
    .prepare(
      `SELECT id, numero, nombre, email, ciudad, envio, pago, total, estado, creado_en, pago_stripe
       FROM pedidos ORDER BY id DESC`
    )
    .all();
  const productos = db
    .prepare("SELECT id, nombre, precio, stock, coleccion FROM productos ORDER BY nombre COLLATE NOCASE")
    .all();
  const totalVendido = db.prepare("SELECT COALESCE(SUM(total), 0) AS total FROM pedidos").get().total;
  res.json({ pedidos, productos, total_vendido: totalVendido });
});

app.patch("/api/admin/pedidos/:id/estado", requireAdmin, (req, res) => {
  const id = Number(req.params.id);
  const estado = String((req.body && req.body.estado) || "");
  if (!["pendiente", "enviado", "entregado"].includes(estado)) {
    return res.status(400).json({ error: "Estado no válido" });
  }
  const result = db.prepare("UPDATE pedidos SET estado = ? WHERE id = ?").run(estado, id);
  if (!result.changes) return res.status(404).json({ error: "Pedido no encontrado" });
  res.json({ ok: true, id, estado });
});

app.patch("/api/admin/productos/:id/stock", requireAdmin, (req, res) => {
  const id = String(req.params.id);
  const stock = Number(req.body && req.body.stock);
  if (!Number.isInteger(stock) || stock < 0) {
    return res.status(400).json({ error: "Stock no válido" });
  }
  const result = db.prepare("UPDATE productos SET stock = ? WHERE id = ?").run(stock, id);
  if (!result.changes) return res.status(404).json({ error: "Producto no encontrado" });
  res.json({ ok: true, id, stock });
});

app.get("/admin", (_req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});

app.use(
  express.static(__dirname, {
    index: "index.html",
    dotfiles: "deny",
    setHeaders(res, filePath) {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    },
  })
);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno" });
});

app.listen(PORT, () => {
  console.log(`LUMAR Velas escuchando en ${PUBLIC_BASE_URL} (puerto ${PORT})`);
  console.log(`SQLite: ${DB_PATH}`);
  console.log(`Stripe TEST: ${stripe ? "activo" : "simulado (sin clave válida)"}`);
});
