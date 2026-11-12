(() => {
  "use strict";

  const WHATSAPP_NUMBER = "34600000000";
  const FREE_SHIPPING_THRESHOLD = 45;
  const GIFT_BOX_EXTRA = 5;

  const PRODUCTS = [
    {
      id: "alhambra",
      name: "Alhambra al Atardecer",
      price: 18,
      notes: ["azahar", "vainilla"],
      burnHours: 40,
      collections: ["relajacion", "romanticas"],
      badge: "Más vendido",
      image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
      description:
        "Una puesta de sol sobre los muros de la Alhambra: azahar dulce y vainilla cremosa que envuelve la estancia con calma andaluza.",
      reviews: [
        { author: "Elena M.", city: "Centro", stars: 5, text: "Huele a patio con azahar. Perfecta para leer por la noche." },
        { author: "Carlos P.", city: "Armilla", stars: 5, text: "Combustión limpia y aroma elegante. Repetiré." },
      ],
    },
    {
      id: "sierra",
      name: "Sierra Nevada",
      price: 22,
      notes: ["pino", "eucalipto"],
      burnHours: 42,
      collections: ["energia"],
      badge: "Nuevo",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
      description:
        "Aire fresco de cumbre: pino resinoso y eucalipto limpio para despejar la mente y renovar el ambiente.",
      reviews: [
        { author: "Nuria G.", city: "Monachil", stars: 5, text: "Ideal tras el trabajo. Fresca sin ser agresiva." },
        { author: "Pablo S.", city: "Beiro", stars: 4, text: "Muy sierra, muy Granada. Buena duración." },
      ],
    },
    {
      id: "albaicin",
      name: "Albaicín",
      price: 16,
      notes: ["lavanda", "romero"],
      burnHours: 38,
      collections: ["relajacion"],
      badge: "Más vendido",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=900&q=80",
      description:
        "Callejeo lento por el barrio blanco: lavanda serena y romero mediterráneo para soltar el día.",
      reviews: [
        { author: "Isabel R.", city: "Albaicín", stars: 5, text: "Mi favorita para yoga en casa." },
        { author: "Miguel A.", city: "Chana", stars: 5, text: "Aroma herbal precioso. Packaging cuidado." },
      ],
    },
    {
      id: "darro",
      name: "Carmen del Darro",
      price: 20,
      notes: ["rosa", "ámbar"],
      burnHours: 40,
      collections: ["romanticas"],
      badge: "Nuevo",
      image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=900&q=80",
      description:
        "Rosa de jardín y ámbar cálido, como una carmen junto al río Darro al caer la tarde.",
      reviews: [
        { author: "Ana Belén", city: "Realejo", stars: 5, text: "Romántica sin empalagar. Regalo seguro." },
        { author: "Diego V.", city: "Ronda", stars: 4, text: "Muy elegante. Mecha estable." },
      ],
    },
    {
      id: "sacromonte",
      name: "Sacromonte al Anochecer",
      price: 19,
      notes: ["sándalo", "incienso"],
      burnHours: 41,
      collections: ["relajacion", "hogar"],
      badge: "Más vendido",
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=80",
      description:
        "Notas profundas de sándalo e incienso suave, evocando cuevas, guitarra y el silencio del Sacromonte.",
      reviews: [
        { author: "Rocío L.", city: "Sacromonte", stars: 5, text: "Acogedora, casi ceremonial. Nos encanta." },
        { author: "Hugo T.", city: "Granada", stars: 5, text: "Perfecta para cenas en casa." },
      ],
    },
    {
      id: "naranjos",
      name: "Patio de los Naranjos",
      price: 17,
      notes: ["naranja amarga", "canela"],
      burnHours: 39,
      collections: ["energia", "hogar"],
      badge: "Nuevo",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80",
      description:
        "Naranja amarga vibrante y canela suave: el aroma de un patio granadino en invierno soleado.",
      reviews: [
        { author: "Carmen F.", city: "Centro", stars: 5, text: "Alegre y cálida a la vez. Imprescindible." },
        { author: "Sergio N.", city: "Maracena", stars: 4, text: "Llena el salón en minutos." },
      ],
    },
    {
      id: "generalife",
      name: "Jardines del Generalife",
      price: 18,
      notes: ["jazmín", "limón"],
      burnHours: 40,
      collections: ["romanticas", "hogar"],
      badge: "Más vendido",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
      description:
        "Jazmín floral y limón luminoso, como pasear entre los jardines del Generalife al mediodía.",
      reviews: [
        { author: "Patricia O.", city: "Genil", stars: 5, text: "Fresca y romántica. Ideal en el dormitorio." },
        { author: "Andrés K.", city: "Granada", stars: 5, text: "Calidad artesanal evidente." },
      ],
    },
    {
      id: "bib",
      name: "Plaza Bib-Rambla",
      price: 15,
      notes: ["limón", "hierbabuena"],
      burnHours: 36,
      collections: ["energia", "hogar"],
      badge: "Nuevo",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
      description:
        "Limón brillante y hierbabuena fresca: el zumbido alegre de la plaza un domingo por la mañana.",
      reviews: [
        { author: "Laura C.", city: "Zaidín", stars: 4, text: "Muy refrescante para la cocina." },
        { author: "Iván M.", city: "Centro", stars: 5, text: "Precio genial y aroma limpio." },
      ],
    },
  ];

  const IG_PHOTOS = [
    "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=600&q=80",
  ];

  const LEGAL = {
    aviso: {
      title: "Aviso Legal",
      html: `
        <p>LUMAR Velas — Granada. Taller artesanal con domicilio en Granada (España).</p>
        <h3>Objeto</h3>
        <p>Este sitio web ofrece información y venta de velas aromáticas artesanales. Los precios incluyen IVA cuando proceda según normativa española.</p>
        <h3>Propiedad intelectual</h3>
        <p>Textos, fotografías y marca LUMAR son propiedad de sus titulares. Queda prohibida su reproducción sin autorización.</p>
        <h3>Contacto</h3>
        <p>Email: hola@lumarvelas.es · WhatsApp disponible en la web.</p>`,
    },
    privacidad: {
      title: "Política de Privacidad",
      html: `
        <p>Conforme al Reglamento (UE) 2016/679 (RGPD) y la LOPDGDD.</p>
        <h3>Responsable</h3>
        <p>LUMAR Velas — Granada. Contacto: hola@lumarvelas.es.</p>
        <h3>Datos que tratamos</h3>
        <p>Nombre, dirección, CP, ciudad, email y datos de pedido necesarios para gestionar compras, envíos y atención al cliente.</p>
        <h3>Finalidad y base legal</h3>
        <p>Ejecución del contrato de compraventa, interés legítimo en mejorar el servicio y consentimiento para comunicaciones comerciales (descuento por email).</p>
        <h3>Derechos</h3>
        <p>Puedes ejercer acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a hola@lumarvelas.es. También puedes reclamar ante la AEPD.</p>`,
    },
    cookies: {
      title: "Política de Cookies",
      html: `
        <p>Esta web usa cookies técnicas necesarias para el carrito y preferencias locales (descuento mostrado). No usamos cookies publicitarias de terceros en esta versión estática.</p>
        <h3>Gestión</h3>
        <p>Puedes borrar el almacenamiento local desde la configuración de tu navegador. Al continuar navegando aceptas el uso de cookies técnicas esenciales.</p>`,
    },
  };

  /** @type {{key:string, productId?:string, name:string, price:number, qty:number, image:string, meta?:string, type:'product'|'custom'|'gift'}[]} */
  let cart = loadCart();
  let activeFilter = "todas";
  let searchQuery = "";
  let lastProductName = "";

  const els = {
    productGrid: document.getElementById("product-grid"),
    bestsellersGrid: document.getElementById("bestsellers-grid"),
    emptyState: document.getElementById("empty-state"),
    search: document.getElementById("search"),
    cartDrawer: document.getElementById("cart-drawer"),
    cartOverlay: document.querySelector(".cart-overlay"),
    cartItems: document.getElementById("cart-items"),
    cartCount: document.querySelector("[data-cart-count]"),
    cartSubtotal: document.querySelector("[data-cart-subtotal]"),
    cartTotal: document.querySelector("[data-cart-total]"),
    comboNote: document.querySelector("[data-combo-note]"),
    comboDiscount: document.querySelector("[data-combo-discount]"),
    productModal: document.getElementById("product-modal"),
    modalBody: document.getElementById("modal-body"),
    checkoutModal: document.getElementById("checkout-modal"),
    checkoutForm: document.getElementById("checkout-form"),
    legalModal: document.getElementById("legal-modal"),
    legalTitle: document.getElementById("legal-title"),
    legalBody: document.getElementById("legal-body"),
    emailModal: document.getElementById("email-modal"),
    emailForm: document.getElementById("email-form"),
    toast: document.getElementById("toast"),
    createForm: document.getElementById("create-form"),
    giftForm: document.getElementById("gift-form"),
    igGrid: document.getElementById("ig-grid"),
    whatsapp: document.getElementById("whatsapp-float"),
    navToggle: document.querySelector(".nav-toggle"),
    siteNav: document.getElementById("site-nav"),
    year: document.getElementById("year"),
  };

  function euro(n) {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);
  }

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem("lumar-cart") || "[]");
    } catch {
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem("lumar-cart", JSON.stringify(cart));
  }

  function productById(id) {
    return PRODUCTS.find((p) => p.id === id);
  }

  function badgeClass(badge) {
    return badge === "Nuevo" ? "badge nuevo" : "badge";
  }

  function collectionLabel(key) {
    const map = {
      relajacion: "Relajación",
      energia: "Energía",
      romanticas: "Románticas",
      hogar: "Hogar",
    };
    return map[key] || key;
  }

  function renderProductCard(product) {
    const notes = product.notes.join(" · ");
    return `
      <article class="product-card" data-id="${product.id}">
        <button type="button" class="product-media" data-open-product="${product.id}" aria-label="Ver ${escapeHtml(product.name)}">
          <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy" width="600" height="750" />
          <span class="${badgeClass(product.badge)}">${product.badge}</span>
        </button>
        <div class="product-body">
          <h3>${escapeHtml(product.name)}</h3>
          <p class="product-notes">${escapeHtml(notes)}</p>
          <div class="product-meta">
            <span class="price">${euro(product.price)}</span>
            <span class="burn">~${product.burnHours} h</span>
          </div>
          <div class="product-actions">
            <div class="qty" data-qty-for="${product.id}">
              <button type="button" data-qty-dec aria-label="Quitar unidad">−</button>
              <input type="number" min="1" max="20" value="1" aria-label="Cantidad" />
              <button type="button" data-qty-inc aria-label="Añadir unidad">+</button>
            </div>
            <button type="button" class="btn btn-primary" data-add="${product.id}">Añadir al carrito</button>
          </div>
        </div>
      </article>`;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function filteredProducts() {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const matchFilter =
        activeFilter === "todas" || p.collections.includes(activeFilter);
      if (!matchFilter) return false;
      if (!q) return true;
      const hay = [p.name, ...p.notes, ...p.collections.map(collectionLabel)].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }

  function renderShop() {
    const list = filteredProducts();
    els.productGrid.innerHTML = list.map(renderProductCard).join("");
    els.emptyState.hidden = list.length > 0;
  }

  function renderBestsellers() {
    const best = PRODUCTS.filter((p) => p.badge === "Más vendido").slice(0, 3);
    els.bestsellersGrid.innerHTML = best.map(renderProductCard).join("");
  }

  function renderIg() {
    els.igGrid.innerHTML = IG_PHOTOS.map(
      (src, i) => `
      <a href="https://instagram.com/lumarvelas" target="_blank" rel="noopener noreferrer" aria-label="Foto Instagram ${i + 1}">
        <img src="${src}" alt="Vela LUMAR en ambiente granadino" loading="lazy" width="400" height="400" />
      </a>`
    ).join("");
  }

  function fillGiftSelects() {
    const options = PRODUCTS.map(
      (p) => `<option value="${p.id}">${escapeHtml(p.name)} — ${euro(p.price)}</option>`
    ).join("");
    ["gift-1", "gift-2", "gift-3"].forEach((id, idx) => {
      const el = document.getElementById(id);
      el.innerHTML = options;
      el.selectedIndex = Math.min(idx, PRODUCTS.length - 1);
    });
  }

  function getQty(productId, root = document) {
    const wrap = root.querySelector(`[data-qty-for="${productId}"] input`);
    const n = wrap ? parseInt(wrap.value, 10) : 1;
    return Number.isFinite(n) && n > 0 ? Math.min(n, 20) : 1;
  }

  function addProductToCart(productId, qty = 1) {
    const product = productById(productId);
    if (!product) return;
    const key = `product:${productId}`;
    const existing = cart.find((i) => i.key === key);
    if (existing) existing.qty += qty;
    else {
      cart.push({
        key,
        type: "product",
        productId,
        name: product.name,
        price: product.price,
        qty,
        image: product.image,
      });
    }
    lastProductName = product.name;
    updateWhatsApp();
    saveCart();
    renderCart();
    showToast(`${product.name} añadida al carrito`);
  }

  function removeFromCart(key) {
    cart = cart.filter((i) => i.key !== key);
    saveCart();
    renderCart();
  }

  /** 3x2: for each collection group of product lines, every 3rd cheapest unit free */
  function computeComboDiscount() {
    const byCollection = {};
    cart.forEach((item) => {
      if (item.type !== "product" || !item.productId) return;
      const product = productById(item.productId);
      if (!product) return;
      // Use primary collection for combo grouping
      const col = product.collections[0];
      if (!byCollection[col]) byCollection[col] = [];
      for (let i = 0; i < item.qty; i++) {
        byCollection[col].push(item.price);
      }
    });

    let discount = 0;
    Object.values(byCollection).forEach((prices) => {
      if (prices.length < 3) return;
      prices.sort((a, b) => a - b);
      const freeCount = Math.floor(prices.length / 3);
      for (let i = 0; i < freeCount; i++) discount += prices[i];
    });
    return discount;
  }

  function cartSubtotalRaw() {
    return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function cartTotals() {
    const subtotal = cartSubtotalRaw();
    const discount = computeComboDiscount();
    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total };
  }

  function renderCart() {
    const { subtotal, discount, total } = cartTotals();
    const count = cart.reduce((n, i) => n + i.qty, 0);
    els.cartCount.textContent = String(count);

    if (!cart.length) {
      els.cartItems.innerHTML = `<p class="empty-state">Tu carrito está vacío. Explora la tienda.</p>`;
    } else {
      els.cartItems.innerHTML = cart
        .map(
          (item) => `
        <div class="cart-item">
          <img src="${item.image}" alt="" width="64" height="64" />
          <div>
            <h4>${escapeHtml(item.name)}</h4>
            <p>${item.qty} × ${euro(item.price)}${item.meta ? ` · ${escapeHtml(item.meta)}` : ""}</p>
          </div>
          <button type="button" class="remove-item" data-remove="${escapeHtml(item.key)}">Quitar</button>
        </div>`
        )
        .join("");
    }

    els.cartSubtotal.textContent = euro(subtotal);
    els.cartTotal.textContent = euro(total);
    if (discount > 0) {
      els.comboNote.hidden = false;
      els.comboDiscount.textContent = `−${euro(discount)}`;
    } else {
      els.comboNote.hidden = true;
    }
    updateCheckoutSummary();
  }

  function openCart() {
    els.cartDrawer.classList.add("is-open");
    els.cartDrawer.setAttribute("aria-hidden", "false");
    els.cartOverlay.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    els.cartDrawer.classList.remove("is-open");
    els.cartDrawer.setAttribute("aria-hidden", "true");
    els.cartOverlay.hidden = true;
    if (
      els.productModal.hidden &&
      els.checkoutModal.hidden &&
      els.legalModal.hidden &&
      els.emailModal.hidden
    ) {
      document.body.style.overflow = "";
    }
  }

  function openModal(el) {
    el.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeModal(el) {
    el.hidden = true;
    if (
      els.productModal.hidden &&
      els.checkoutModal.hidden &&
      els.legalModal.hidden &&
      els.emailModal.hidden &&
      !els.cartDrawer.classList.contains("is-open")
    ) {
      document.body.style.overflow = "";
    }
  }

  function openProductModal(id) {
    const product = productById(id);
    if (!product) return;
    lastProductName = product.name;
    updateWhatsApp();
    const collections = product.collections.map(collectionLabel).join(", ");
    els.modalBody.innerHTML = `
      <div class="modal-product">
        <img src="${product.image}" alt="${escapeHtml(product.name)}" />
        <div>
          <p class="eyebrow">${escapeHtml(collections)}</p>
          <h2 id="modal-title">${escapeHtml(product.name)}</h2>
          <p>${escapeHtml(product.description)}</p>
          <p class="product-notes"><strong>Notas:</strong> ${escapeHtml(product.notes.join(", "))}</p>
          <p class="product-meta"><span class="price">${euro(product.price)}</span><span class="burn">~${product.burnHours} h</span></p>
          <div class="product-actions" style="margin-top:0.75rem">
            <div class="qty" data-qty-for="modal-${product.id}">
              <button type="button" data-qty-dec aria-label="Quitar unidad">−</button>
              <input type="number" min="1" max="20" value="1" aria-label="Cantidad" />
              <button type="button" data-qty-inc aria-label="Añadir unidad">+</button>
            </div>
            <button type="button" class="btn btn-primary" data-add-modal="${product.id}">Añadir al carrito</button>
          </div>
          <div class="reviews" aria-label="Opiniones">
            <h3 style="font-family:var(--font-display);margin:1rem 0 0;color:var(--brown)">Opiniones</h3>
            ${product.reviews
              .map(
                (r) => `
              <div class="review">
                <strong>${escapeHtml(r.author)} · ${escapeHtml(r.city)}</strong>
                <div class="stars" aria-label="${r.stars} de 5">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</div>
                <p>${escapeHtml(r.text)}</p>
              </div>`
              )
              .join("")}
          </div>
        </div>
      </div>`;
    openModal(els.productModal);
  }

  function shippingCost(subtotalAfterDiscount) {
    const selected = els.checkoutForm.querySelector('input[name="envio"]:checked');
    if (!selected) return 0;
    const zone = selected.value;
    let cost = parseFloat(selected.dataset.cost || "0");
    if (zone === "peninsula" && subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD) {
      cost = 0;
    }
    return cost;
  }

  function updateCheckoutSummary() {
    const { total } = cartTotals();
    const ship = shippingCost(total);
    const pay = total + ship;
    const productsEl = document.querySelector("[data-checkout-products]");
    const shippingEl = document.querySelector("[data-checkout-shipping]");
    const totalEl = document.querySelector("[data-checkout-total]");
    if (productsEl) productsEl.textContent = euro(total);
    if (shippingEl) shippingEl.textContent = euro(ship);
    if (totalEl) totalEl.textContent = euro(pay);
  }

  function showToast(msg) {
    els.toast.textContent = msg;
    els.toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => {
      els.toast.hidden = true;
    }, 2800);
  }

  function updateWhatsApp() {
    const name = lastProductName || "información sobre vuestras velas";
    const text = lastProductName
      ? `Hola, quiero pedir la vela ${lastProductName}`
      : "Hola, quiero pedir información sobre vuestras velas";
    els.whatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    els.whatsapp.setAttribute("aria-label", `WhatsApp: ${name}`);
  }

  function bindQtyControls(root) {
    root.addEventListener("click", (e) => {
      const dec = e.target.closest("[data-qty-dec]");
      const inc = e.target.closest("[data-qty-inc]");
      if (!dec && !inc) return;
      const wrap = e.target.closest(".qty");
      const input = wrap && wrap.querySelector("input");
      if (!input) return;
      let v = parseInt(input.value, 10) || 1;
      if (dec) v = Math.max(1, v - 1);
      if (inc) v = Math.min(20, v + 1);
      input.value = String(v);
    });
  }

  // Events
  document.addEventListener("click", (e) => {
    const openProduct = e.target.closest("[data-open-product]");
    if (openProduct) {
      openProductModal(openProduct.dataset.openProduct);
      return;
    }

    const add = e.target.closest("[data-add]");
    if (add) {
      const id = add.dataset.add;
      addProductToCart(id, getQty(id));
      return;
    }

    const addModal = e.target.closest("[data-add-modal]");
    if (addModal) {
      const id = addModal.dataset.addModal;
      const qty = getQty(`modal-${id}`, els.modalBody);
      addProductToCart(id, qty);
      return;
    }

    if (e.target.closest("[data-open-cart]")) {
      openCart();
      return;
    }

    if (e.target.closest("[data-close-cart]")) {
      closeCart();
      return;
    }

    const remove = e.target.closest("[data-remove]");
    if (remove) {
      removeFromCart(remove.dataset.remove);
      return;
    }

    if (e.target.closest("[data-open-checkout]")) {
      if (!cart.length) {
        showToast("Añade alguna vela antes de pagar");
        return;
      }
      closeCart();
      updateCheckoutSummary();
      openModal(els.checkoutModal);
      return;
    }

    if (e.target.closest("[data-close-checkout]")) {
      closeModal(els.checkoutModal);
      return;
    }

    if (e.target.closest("[data-close-modal]")) {
      closeModal(els.productModal);
      return;
    }

    if (e.target.closest("[data-close-legal]")) {
      closeModal(els.legalModal);
      return;
    }

    if (e.target.closest("[data-close-email]")) {
      closeModal(els.emailModal);
      localStorage.setItem("lumar-email-dismissed", "1");
      return;
    }

    const legalBtn = e.target.closest("[data-legal]");
    if (legalBtn) {
      const key = legalBtn.dataset.legal;
      const doc = LEGAL[key];
      if (doc) {
        els.legalTitle.textContent = doc.title;
        els.legalBody.innerHTML = doc.html;
        openModal(els.legalModal);
      }
      return;
    }

    const chip = e.target.closest("[data-filter]");
    if (chip) {
      activeFilter = chip.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((c) => {
        c.classList.toggle("is-active", c === chip);
      });
      renderShop();
    }
  });

  els.search.addEventListener("input", () => {
    searchQuery = els.search.value;
    renderShop();
  });

  els.checkoutForm.addEventListener("change", (e) => {
    if (e.target.name === "envio") updateCheckoutSummary();
  });

  els.checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(els.checkoutForm);
    const { total } = cartTotals();
    const ship = shippingCost(total);
    const pago = data.get("pago");
    showToast(`Pedido recibido · ${euro(total + ship)} · ${pago}. Te escribimos pronto.`);
    cart = [];
    saveCart();
    renderCart();
    closeModal(els.checkoutModal);
    els.checkoutForm.reset();
    document.getElementById("ciudad").value = "Granada";
  });

  els.createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(els.createForm);
    const aroma = data.get("aroma");
    const color = data.get("color");
    const frase = String(data.get("frase") || "").trim();
    const name = `Vela personalizada · ${aroma}`;
    cart.push({
      key: `custom:${Date.now()}`,
      type: "custom",
      name,
      price: 24,
      qty: 1,
      image: PRODUCTS[0].image,
      meta: `${color} · «${frase}»`,
    });
    lastProductName = name;
    updateWhatsApp();
    saveCart();
    renderCart();
    openCart();
    showToast("Vela personalizada añadida");
    els.createForm.reset();
    els.createForm.querySelector('input[name="aroma"]').checked = true;
    els.createForm.querySelector('input[name="color"]').checked = true;
  });

  els.giftForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(els.giftForm);
    const ids = [data.get("g1"), data.get("g2"), data.get("g3")];
    const products = ids.map((id) => productById(String(id))).filter(Boolean);
    if (products.length !== 3) return;
    const base = products.reduce((s, p) => s + p.price, 0);
    const price = base + GIFT_BOX_EXTRA;
    const mensaje = String(data.get("mensaje") || "").trim();
    const name = "Gift Box LUMAR (3 velas)";
    cart.push({
      key: `gift:${Date.now()}`,
      type: "gift",
      name,
      price,
      qty: 1,
      image: products[0].image,
      meta: `${products.map((p) => p.name).join(" + ")} · tarjeta: «${mensaje}»`,
    });
    lastProductName = products[0].name;
    updateWhatsApp();
    saveCart();
    renderCart();
    openCart();
    showToast("Gift Box añadida al carrito");
  });

  els.emailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("lumar-email-joined", "1");
    closeModal(els.emailModal);
    showToast("¡Listo! Usa el código LUMAR10 en tu primer pedido");
  });

  els.navToggle.addEventListener("click", () => {
    const open = els.siteNav.classList.toggle("is-open");
    els.navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  els.siteNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      els.siteNav.classList.remove("is-open");
      els.navToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      closeModal(els.productModal);
      closeModal(els.checkoutModal);
      closeModal(els.legalModal);
      closeModal(els.emailModal);
    }
  });

  bindQtyControls(document);

  // Init
  els.year.textContent = String(new Date().getFullYear());
  renderBestsellers();
  renderShop();
  renderIg();
  fillGiftSelects();
  renderCart();
  updateWhatsApp();

  // Better hero image (candles) — swap if primary fails conceptually via secondary CSS already set
  // Email popup after short delay
  setTimeout(() => {
    if (
      !localStorage.getItem("lumar-email-joined") &&
      !localStorage.getItem("lumar-email-dismissed")
    ) {
      openModal(els.emailModal);
    }
  }, 4500);
})();
