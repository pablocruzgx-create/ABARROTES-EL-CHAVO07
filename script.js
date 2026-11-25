/* ==========================================
   ABARROTES EL CHAVO07
   Sistema de compras en línea
   ========================================== */

// 1. PRODUCTOS DE LA TIENDA

const products = [

  // ABARROTES

  {
    id: 1,
    name: "Arroz Blanco 1 kg",
    category: "abarrotes",
    price: 28,
    stock: 30,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600"
  },
  {
    id: 2,
    name: "Frijol Negro 1 kg",
    category: "abarrotes",
    price: 38,
    stock: 25,
    image: "https://images.unsplash.com/photo-1551462147-37885acc36f1?w=600"
  },
  {
    id: 3,
    name: "Aceite Vegetal 1 L",
    category: "abarrotes",
    price: 42,
    stock: 20,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600"
  },
  {
    id: 4,
    name: "Azúcar 1 kg",
    category: "abarrotes",
    price: 30,
    stock: 25,
    image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=600"
  },
  {
    id: 5,
    name: "Pasta 200 g",
    category: "abarrotes",
    price: 16,
    stock: 40,
    image: "https://images.unsplash.com/photo-1551462147-37885acc36f1?w=600"
  },

  // VERDURAS

  {
    id: 6,
    name: "Jitomate 1 kg",
    category: "verduras",
    price: 32,
    stock: 20,
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=600"
  },
  {
    id: 7,
    name: "Zanahoria 1 kg",
    category: "verduras",
    price: 25,
    stock: 20,
    image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=600"
  },
  {
    id: 8,
    name: "Papa 1 kg",
    category: "verduras",
    price: 30,
    stock: 25,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600"
  },
  {
    id: 9,
    name: "Cebolla 1 kg",
    category: "verduras",
    price: 28,
    stock: 20,
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=600"
  },
  {
    id: 10,
    name: "Lechuga",
    category: "verduras",
    price: 22,
    stock: 15,
    image: "https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=600"
  },

  // LÁCTEOS

  {
    id: 11,
    name: "Leche 1 L",
    category: "lacteos",
    price: 29,
    stock: 30,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600"
  },
  {
    id: 12,
    name: "Queso 400 g",
    category: "lacteos",
    price: 75,
    stock: 15,
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=600"
  },
  {
    id: 13,
    name: "Yogur 1 L",
    category: "lacteos",
    price: 42,
    stock: 18,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600"
  },
  {
    id: 14,
    name: "Mantequilla 90 g",
    category: "lacteos",
    price: 32,
    stock: 20,
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600"
  },

  // BEBIDAS

  {
    id: 15,
    name: "Agua Natural 1 L",
    category: "bebidas",
    price: 15,
    stock: 40,
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600"
  },
  {
    id: 16,
    name: "Jugo de Naranja 1 L",
    category: "bebidas",
    price: 35,
    stock: 20,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600"
  },
  {
    id: 17,
    name: "Refresco 600 ml",
    category: "bebidas",
    price: 20,
    stock: 35,
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=600"
  },
  {
    id: 18,
    name: "Agua Mineral",
    category: "bebidas",
    price: 22,
    stock: 20,
    image: "https://images.unsplash.com/photo-1606168094336-48f205276929?w=600"
  }

];

// 2. VARIABLES DEL SISTEMA

let cart = JSON.parse(
  localStorage.getItem("chavo07_cart") || "[]"
);

let privacyAccepted =
  localStorage.getItem("chavo07_privacy") === "true";

let currentOrder = null;

const categoryNames = {
  abarrotes: "Abarrotes",
  verduras: "Verduras",
  lacteos: "Lácteos",
  bebidas: "Bebidas"
};

// 3. FUNCIONES GENERALES

function money(amount) {
  return amount.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN"
  });
}

function saveCart() {
  localStorage.setItem("chavo07_cart", JSON.stringify(cart));
}

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

// 4. NAVEGACIÓN

function showPage(page) {

  document.querySelectorAll(".page").forEach(section => {
    section.classList.remove("active");
  });

  const target = document.getElementById(page);

  if (!target) return;

  target.classList.add("active");

  if (page === "catalog") renderProducts();
  if (page === "cart") renderCart();
  if (page === "checkout") renderCheckout();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// 5. PANTALLA DE INICIO Y PRIVACIDAD

function startShopping() {

  if (!privacyAccepted) {
    showPage("privacy");
    showToast("Primero revisa y acepta las políticas.");
    return;
  }

  showPage("catalog");
}

function openCatalog() {
  startShopping();
}

function acceptPrivacy() {

  const checkbox = document.getElementById("accept-privacy");

  if (!checkbox.checked) {
    showToast("Debes aceptar las políticas para continuar.");
    return;
  }

  privacyAccepted = true;

  localStorage.setItem("chavo07_privacy", "true");

  showToast("¡Políticas aceptadas correctamente!");

  showPage("catalog");
}

function selectCategory(category) {

  if (!privacyAccepted) {
    showPage("privacy");
    showToast("Acepta las políticas para acceder a los productos.");
    return;
  }

  document.getElementById("category-filter").value = category;

  showPage("catalog");
}

// 6. MOSTRAR PRODUCTOS

function renderProducts() {

  const grid = document.getElementById("product-grid");

  const category =
    document.getElementById("category-filter").value;

  const search =
    document.getElementById("search-input").value
      .toLowerCase().trim();

  const filtered = products.filter(product => {

    const matchCategory =
      category === "todos" || product.category === category;

    const matchSearch =
      product.name.toLowerCase().includes(search);

    return matchCategory && matchSearch;

  });

  if (filtered.length === 0) {

    grid.innerHTML = `
      <div class="empty-cart">
        <h3>No encontramos productos.</h3>
        <p>Prueba con otra búsqueda o categoría.</p>
      </div>
    `;

    return;
  }

  grid.innerHTML = filtered.map(product => `

    <article class="product-card">

      <div class="product-image">

        <img
          src="${product.image}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
        >

        <span class="product-tag">
          ${categoryNames[product.category]}
        </span>

      </div>

      <div class="product-info">

        <h3>${escapeHTML(product.name)}</h3>

        <p>Disponibles: ${product.stock} unidades</p>

        <div class="product-price">
          ${money(product.price)}
        </div>

        <div class="product-controls">

          <input
            type="number"
            id="quantity-${product.id}"
            value="1"
            min="1"
            max="${product.stock}"
            aria-label="Cantidad"
          >

        </div>

        <button
          class="add-button"
          onclick="addToCart(${product.id})"
          ${product.stock === 0 ? "disabled" : ""}
        >
          ${product.stock > 0 ? "🛒 Agregar al carrito" : "Agotado"}
        </button>

      </div>

    </article>

  `).join("");

}

// 7. AGREGAR PRODUCTOS AL CARRITO

function addToCart(id) {

  const product = products.find(p => p.id === id);

  if (!product || product.stock <= 0) {
    showToast("Producto no disponible.");
    return;
  }

  const quantity = Number(
    document.getElementById(`quantity-${id}`).value
  );

  if (!Number.isInteger(quantity) || quantity < 1) {
    showToast("Ingresa una cantidad válida.");
    return;
  }

  const existing = cart.find(item => item.id === id);

  const currentQuantity = existing
    ? existing.quantity
    : 0;

  if (currentQuantity + quantity > product.stock) {
    showToast("No hay suficientes productos disponibles.");
    return;
  }

  if (existing) {
    existing.quantity += quantity;
  } else {

    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      quantity
    });

  }

  saveCart();
  updateCartCount();

  showToast("¡Producto agregado al carrito!");
}

// 8. CONTAR PRODUCTOS

function updateCartCount() {

  const count = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  document.getElementById("cart-count").textContent = count;
}

// 9. CALCULAR SUBTOTAL Y TOTAL

function getSubtotal() {

  return cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

}

// En esta versión no se agrega costo de envío.

function getTotal() {
  return getSubtotal();
}

// 10. MOSTRAR CARRITO

function renderCart() {

  const container = document.getElementById("cart-items");

  if (cart.length === 0) {

    container.innerHTML = `
      <div class="empty-cart">
        <h3>🛒 Tu carrito está vacío.</h3>
        <p>Agrega productos para comenzar tu compra.</p>

        <button class="primary-button"
          onclick="showPage('catalog')">
          Ver productos
        </button>
      </div>
    `;

    updateSummary();
    return;
  }

  container.innerHTML = cart.map(item => `

    <div class="cart-item">

      <img src="${item.image}" alt="${escapeHTML(item.name)}">

      <div>

        <h3>${escapeHTML(item.name)}</h3>

        <p>${categoryNames[item.category]}</p>

        <p>Precio: ${money(item.price)}</p>

        <p>Cantidad:</p>

        <input
          type="number"
          min="1"
          max="${products.find(p => p.id === item.id)?.stock ?? 0}"
          value="${item.quantity}"
          onchange="changeQuantity(${item.id}, this.value)"
          aria-label="Modificar cantidad"
        >

        <p><b>${money(item.price * item.quantity)}</b></p>

      </div>

      <button
        class="remove-button"
        onclick="removeProduct(${item.id})"
        aria-label="Eliminar producto"
      >
        ✕
      </button>

    </div>

  `).join("");

  updateSummary();
}

// 11. MODIFICAR CANTIDADES

function changeQuantity(id, value) {

  const quantity = Number(value);

  const item = cart.find(p => p.id === id);
  const product = products.find(p => p.id === id);

  if (!item || !product) return;

  if (
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > product.stock
  ) {

    showToast("Cantidad no válida.");

    renderCart();
    return;
  }

  item.quantity = quantity;

  saveCart();
  updateCartCount();
  renderCart();

  showToast("Carrito actualizado.");
}

// 12. ELIMINAR PRODUCTOS

function removeProduct(id) {

  cart = cart.filter(item => item.id !== id);

  saveCart();
  updateCartCount();
  renderCart();

  showToast("Producto eliminado.");
}

// 13. ACTUALIZAR RESUMEN

function updateSummary() {

  const count = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  document.getElementById("item-count").textContent = count;

  document.getElementById("subtotal").textContent =
    money(getSubtotal());

  document.getElementById("total").textContent =
    money(getTotal());

}

// 14. FINALIZAR COMPRA

function finishShopping() {

  if (cart.length === 0) {
    showToast("Agrega productos antes de finalizar.");
    return;
  }

  showPage("checkout");
}

// 15. MOSTRAR RESUMEN DEL PEDIDO

function renderCheckout() {

  const container = document.getElementById("checkout-items");

  container.innerHTML = cart.map(item => `

    <div class="summary-line">

      <span>
        ${escapeHTML(item.name)} x ${item.quantity}
      </span>

      <b>${money(item.price * item.quantity)}</b>

    </div>

  `).join("");

  document.getElementById("checkout-total").textContent =
    money(getTotal());

}

// 16. VALIDAR DATOS Y GENERAR TICKET

document.getElementById("purchase-form").addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    if (cart.length === 0) {
      showToast("Tu carrito está vacío.");
      showPage("catalog");
      return;
    }

    // Comprobar que los productos sigan disponibles.

    for (const item of cart) {

      const product = products.find(p => p.id === item.id);

      if (!product || product.stock < item.quantity) {
        showToast(`Existencias insuficientes de ${item.name}.`);
        showPage("catalog");
        return;
      }

    }

    // Obtener datos del comprador.

    const formData = new FormData(this);

    const customer = Object.fromEntries(formData.entries());

    // Crear pedido.

    currentOrder = {

      number: "CH07-" + Date.now().toString().slice(-8),

      date: new Date().toLocaleString("es-MX"),

      customer,

      items: cart.map(item => ({...item})),

      subtotal: getSubtotal(),

      total: getTotal(),

      status: "Compra confirmada"

    };

    // Actualizar existencias.

    cart.forEach(item => {

      const product = products.find(p => p.id === item.id);

      product.stock -= item.quantity;

    });

    // Guardar el pedido.

    const orders = JSON.parse(
      localStorage.getItem("chavo07_orders") || "[]"
    );

    orders.push(currentOrder);

    localStorage.setItem(
      "chavo07_orders",
      JSON.stringify(orders)
    );

    // Generar ticket.

    generateTicket(currentOrder);

    // Vaciar carrito.

    cart = [];

    saveCart();
    updateCartCount();

    this.reset();

    showToast("¡Compra confirmada! Ticket generado.");

    showPage("ticket");

  }
);

// 17. GENERADOR DE TICKET

function generateTicket(order) {

  const container = document.getElementById("ticket-content");

  container.innerHTML = `

    <div class="ticket-header">

      <div style="font-size:38px">🛒</div>

      <h2>ABARROTES EL CHAVO07</h2>

      <p>Tu tienda de confianza</p>

      <p>COMPROBANTE DE COMPRA</p>

      <p><b>Pedido: ${escapeHTML(order.number)}</b></p>

      <p>${escapeHTML(order.date)}</p>

    </div>

    <div style="margin-top:20px">

      <h3>Datos del cliente</h3>

      <p><b>Nombre:</b> ${escapeHTML(order.customer.name)}</p>

      <p><b>Teléfono:</b> ${escapeHTML(order.customer.phone)}</p>

      <p><b>Correo:</b> ${escapeHTML(order.customer.email)}</p>

      <p>
        <b>Dirección:</b>
        ${escapeHTML(order.customer.street)},
        ${escapeHTML(order.customer.neighborhood)},
        ${escapeHTML(order.customer.city)},
        ${escapeHTML(order.customer.state)},
        C.P. ${escapeHTML(order.customer.postal)}
      </p>

    </div>

    <h3 style="margin-top:25px">Productos comprados</h3>

    <table class="ticket-table">

      <thead>

        <tr>
          <th>Producto</th>
          <th>Cant.</th>
          <th>Importe</th>
        </tr>

      </thead>

      <tbody>

        ${order.items.map(item => `

          <tr>

            <td>${escapeHTML(item.name)}</td>

            <td>${item.quantity}</td>

            <td>${money(item.price * item.quantity)}</td>

          </tr>

        `).join("")}

      </tbody>

    </table>

    <div class="ticket-total">
      TOTAL: ${money(order.total)}
    </div>

    <div class="ticket-footer">

      <p><b>${escapeHTML(order.status)}</b></p>

      <p>¡Gracias por comprar en Abarrotes El Chavo07!</p>

      <p>Vuelve pronto. ♡</p>

    </div>

  `;

}

// 18. IMPRIMIR TICKET

function printTicket() {

  if (!currentOrder) {
    showToast("No hay un ticket disponible.");
    return;
  }

  window.print();

}

// 19. NUEVA COMPRA

function newPurchase() {

  currentOrder = null;

  showPage("home");

  showToast("¡Gracias por tu compra!");

}

// 20. FILTROS

document.getElementById("category-filter").addEventListener(
  "change",
  renderProducts
);

document.getElementById("search-input").addEventListener(
  "input",
  renderProducts
);

// 21. INICIAR SISTEMA

document.addEventListener("DOMContentLoaded", () => {

  updateCartCount();

  updateSummary();

  renderProducts();

});