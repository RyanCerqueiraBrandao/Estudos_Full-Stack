/* ═══════════════════════════════════════════════
   HYPERION STORE — script.js
   ═══════════════════════════════════════════════ */

const brlCurrency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

/* ── PRODUCT DATABASE ── */
const ALL_PRODUCTS = [
  { id: 1,  brand: 'Nike',         model: 'Air Max 270',          category: 'Lifestyle',  price: 849,  oldPrice: 999,  badge: 'Novo',        image: 'https://cdnimg.etiquetaunica.com.br/products/webp/tenis-nike-air-max-270-branco-jcm82-1675099157-0000003_v2.webp' },
  { id: 2,  brand: 'Adidas',       model: 'Ultraboost Light',     category: 'Corrida',    price: 799,  oldPrice: 949,  badge: '-15%',        image: 'https://trilhaesportes.fbitsstatic.net/img/p/tenis-adidas-ultraboost-light-unissex-cinza-laranja-71905/274048-4.jpg?w=1200&h=1200&v=no-value' },
  { id: 3,  brand: 'New Balance',  model: '9060',                 category: 'Lifestyle',  price: 929,  oldPrice: null, badge: 'Trend',       image: 'https://crepdogcrew.com/cdn/shop/files/NEWBALANCE_10.png?v=1764666734&width=1080' },
  { id: 4,  brand: 'Jordan',       model: 'Air Jordan 1 High',    category: 'Basquete',   price: 1199, oldPrice: null, badge: 'Exclusivo',   image: 'https://droper-media.s3.amazonaws.com/30122021174310879.webp' },
  { id: 5,  brand: 'Puma',         model: 'RS-X',                 category: 'Lifestyle',  price: 659,  oldPrice: 799,  badge: 'Oferta',      image: 'https://http2.mlstatic.com/D_NQ_NP_906940-MLB75762220422_042024-O-tnis-puma-rs-x-efekt-masculino.webp' },
  { id: 6,  brand: 'Asics',        model: 'Gel-Kayano 30',        category: 'Corrida',    price: 999,  oldPrice: null, badge: 'Run',         image: 'https://authenticfeet.vtexassets.com/arquivos/ids/407744-800-800?v=638442943546900000&width=800&height=800&aspect=true' },
  { id: 7,  brand: 'Mizuno',       model: 'Wave Prophecy',        category: 'Corrida',    price: 1399, oldPrice: 1599, badge: 'Premium',     image: 'https://lojavirus.fbitsstatic.net/img/p/tenis-mizuno-wave-prophecy-ls-air-mesh-off-white-prata-preto-102300003-77283/331559.jpg?w=1200&h=1200&v=202509251700' },
  { id: 8,  brand: 'Reebok',       model: 'Club C 85',            category: 'Lifestyle',  price: 549,  oldPrice: null, badge: null,          image: 'https://http2.mlstatic.com/D_NQ_NP_602023-MLB78133354294_082024-O-tnis-reebok-club-c-85-unissex-bege-claro.webp' },
  { id: 9,  brand: 'Under Armour', model: 'HOVR Phantom',         category: 'Treino',     price: 879,  oldPrice: null, badge: 'Treino',      image: 'https://imgcentauro-a.akamaihd.net/1200x1200/96607829A9.jpg' },
  { id: 10, brand: 'Converse',     model: 'Chuck Taylor All Star', category: 'Skate',     price: 399,  oldPrice: null, badge: null,          image: 'https://www.kicks.com.co/media/catalog/product/m/9/m9160c_frontf1-001.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:' },
  { id: 11, brand: 'Vans',         model: 'Old Skool',            category: 'Skate',      price: 429,  oldPrice: null, badge: 'Clássico',    image: 'https://images.tcdn.com.br/img/img_prod/901504/tenis_vans_skate_old_skool_azul_1745_1_e94935f213e78cd936b29ea4ea8c94a9.png' },
  { id: 12, brand: 'Fila',         model: 'Disruptor II',         category: 'Lifestyle',  price: 479,  oldPrice: 549,  badge: null,          image: 'https://ostoresneakers.vteximg.com.br/arquivos/ids/216081-1000-1000/tenis-fila-disruptor-2-5XM01765-125-0.jpg?v=637956677552500000' },
  { id: 13, brand: 'Nike',         model: 'Pegasus 41',           category: 'Corrida',    price: 899,  oldPrice: null, badge: 'Novo',        image: 'https://acdn-us.mitiendanube.com/stores/001/153/552/products/tenis-nike-air-zoom-pegasus-41-fd2722-104-ca17b57345d62ae06d17316033767507-1024-1024.webp' },
  { id: 14, brand: 'Adidas',       model: 'Gazelle Indoor',       category: 'Lifestyle',  price: 699,  oldPrice: null, badge: 'Retro',       image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73f2b1c3e16f423fa300baed88e28b87_faec/Tenis_Gazelle_Indoor_Preto_JI2060_db01_standard.jpg' },
  { id: 15, brand: 'New Balance',  model: '550',                  category: 'Basquete',   price: 749,  oldPrice: null, badge: null,          image: 'https://espacocon.fbitsstatic.net/img/p/tenis-new-balance-550-branco-azul-152698/368399-1.jpg?w=1200&h=1200&v=no-value' },
  { id: 16, brand: 'Jordan',       model: 'Air Jordan 4 Retro',   category: 'Basquete',   price: 1499, oldPrice: 1699, badge: 'Drop',        image: 'https://cdn.awsli.com.br/2500x2500/1144/1144748/produto/169741487/6a680d4dd2.jpg' },
  { id: 17, brand: 'On',           model: 'Cloudmonster',         category: 'Corrida',    price: 1299, oldPrice: null, badge: 'Performance', image: 'https://cdn.vnda.com.br/velocita/2024/02/15/15_49_30_715_15_2_4_438_small20png3me10122035cloudmonster_2ss24undyed_frostmg1.jpg?v=1708022970' },
  { id: 18, brand: 'Puma',         model: 'Deviate Nitro 2',      category: 'Corrida',    price: 1099, oldPrice: null, badge: null,          image: 'https://cdn.vnda.com.br/velocita/2024/02/22/12_04_38_958_12_2_5_588_380088011.jpg?v=1708614349' },
];

/* ── CART ── */
function escapeHTML(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildProductFallbackImage(product = {}) {
  const brand = escapeHTML(product.brand || 'Hyperion');
  const model = escapeHTML(product.model || 'Sneaker');
  const mark = escapeHTML((product.brand || 'H').charAt(0).toUpperCase());
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" role="img" aria-label="${brand} ${model}">
      <rect width="640" height="640" fill="#0c0c0c"/>
      <rect x="18" y="18" width="604" height="604" rx="18" fill="none" stroke="#222" stroke-width="2"/>
      <circle cx="320" cy="250" r="92" fill="#141414" stroke="#d63a1a" stroke-width="3"/>
      <text x="320" y="282" text-anchor="middle" fill="#f4f0e8" font-size="116" font-family="Arial, sans-serif" font-weight="700">${mark}</text>
      <text x="320" y="510" text-anchor="middle" fill="#d63a1a" font-size="34" font-family="Arial, sans-serif" letter-spacing="7">${brand}</text>
      <text x="320" y="555" text-anchor="middle" fill="#f4f0e8" font-size="28" font-family="Arial, sans-serif">${model}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderProductImage(product = {}, altText, { lazy = true } = {}) {
  const brand = escapeHTML(product.brand || 'Hyperion');
  const model = escapeHTML(product.model || 'Sneaker');
  const alt = escapeHTML(altText || `${product.brand || 'Hyperion'} ${product.model || 'Sneaker'}`.trim());
  const src = product.image ? escapeHTML(product.image) : buildProductFallbackImage(product);
  const loading = lazy ? ' loading="lazy"' : '';
  return `<img src="${src}" alt="${alt}"${loading} referrerpolicy="no-referrer" data-product-image data-brand="${brand}" data-model="${model}" />`;
}

function bindProductImageFallbacks(scope = document) {
  scope.querySelectorAll('img[data-product-image]').forEach(img => {
    if (img.dataset.fallbackBound === 'true') return;
    img.dataset.fallbackBound = 'true';
    const applyFallback = () => {
      if (img.dataset.fallbackApplied === 'true') return;
      img.dataset.fallbackApplied = 'true';
      img.src = buildProductFallbackImage({
        brand: img.dataset.brand,
        model: img.dataset.model,
      });
    };
    img.addEventListener('error', applyFallback);
    if (img.complete && img.naturalWidth === 0) applyFallback();
  });
}

const Cart = (() => {
  const STORAGE_KEY = 'hyperion_cart';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    updateCartBadge();
  }

  function getItems() { return load(); }

  function add(product, size, qty = 1) {
    const items = load();
    const key = `${product.id}-${size}`;
    const existing = items.find(i => i.key === key);
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, 5);
    } else {
      items.push({ key, id: product.id, brand: product.brand, model: product.model, price: product.price, image: product.image, size, qty });
    }
    save(items);
    showCartToast(`${product.brand} ${product.model} adicionado!`);
  }

  function remove(key) {
    save(load().filter(i => i.key !== key));
    if (document.getElementById('cartDrawer')) renderCartDrawer();
  }

  function updateQty(key, qty) {
    const items = load();
    const item = items.find(i => i.key === key);
    if (item) {
      item.qty = Math.max(1, Math.min(5, qty));
      save(items);
    }
    if (document.getElementById('cartDrawer')) renderCartDrawer();
  }

  function total() {
    return load().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function count() {
    return load().reduce((sum, i) => sum + i.qty, 0);
  }

  function clear() { save([]); }

  return { getItems, add, remove, updateQty, total, count, clear };
})();

/* ── WISHLIST ── */
const Wishlist = (() => {
  const KEY = 'hyperion_wish';
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } }
  function save(ids) { localStorage.setItem(KEY, JSON.stringify(ids)); }
  function has(id) { return load().includes(id); }
  function toggle(id) {
    const ids = load();
    const idx = ids.indexOf(id);
    if (idx > -1) ids.splice(idx, 1); else ids.push(id);
    save(ids);
    return idx === -1;
  }
  function count() { return load().length; }
  return { has, toggle, count, load };
})();

/* ── REDIRECT TO CHECKOUT ── */
function redirectToCheckout(product) {
  const params = new URLSearchParams({
    brand: product.brand || '',
    model: product.model || '',
    price: String(product.price || 0),
    image: product.image || '',
    id: String(product.id || 0),
  });
  window.location.href = `compra.html?${params.toString()}`;
}

/* ── CART BADGE ── */
function updateCartBadge() {
  document.querySelectorAll('.cart-badge').forEach(el => {
    const n = Cart.count();
    el.textContent = n;
    el.style.display = n > 0 ? 'flex' : 'none';
  });
}

/* ── CART TOAST ── */
function showCartToast(msg) {
  let toast = document.getElementById('cartToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cartToast';
    toast.className = 'cart-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ── CART DRAWER ── */
function renderCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  if (!drawer) return;
  const items = Cart.getItems();
  const body = drawer.querySelector('.cart-drawer-body');
  const footer = drawer.querySelector('.cart-drawer-footer');

  if (items.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Seu carrinho está vazio.</p>
        <a href="loja.html" class="cart-goto-shop">Explorar Loja</a>
      </div>`;
    footer.innerHTML = '';
    return;
  }

  body.innerHTML = items.map(item => `
    <div class="cart-item" data-key="${item.key}">
      ${renderProductImage(item, item.model, { lazy: false })}
      <div class="cart-item-info">
        <p class="cart-item-brand">${item.brand}</p>
        <p class="cart-item-name">${item.model}</p>
        <p class="cart-item-size">Tam. ${item.size}</p>
        <div class="cart-item-controls">
          <button class="cart-qty-btn" data-action="dec" data-key="${item.key}">−</button>
          <span>${item.qty}</span>
          <button class="cart-qty-btn" data-action="inc" data-key="${item.key}">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <p class="cart-item-price">${brlCurrency.format(item.price * item.qty)}</p>
        <button class="cart-remove-btn" data-key="${item.key}">✕</button>
      </div>
    </div>`).join('');
  bindProductImageFallbacks(body);

  const shipping = Cart.total() >= 900 ? 0 : 29;
  footer.innerHTML = `
    <div class="cart-summary-line"><span>Subtotal</span><strong>${brlCurrency.format(Cart.total())}</strong></div>
    <div class="cart-summary-line"><span>Frete</span><strong>${shipping === 0 ? '<span class="free-ship">Grátis</span>' : brlCurrency.format(shipping)}</strong></div>
    <div class="cart-summary-total"><span>Total</span><strong>${brlCurrency.format(Cart.total() + shipping)}</strong></div>
    <a href="compra.html" class="cart-checkout-btn">Finalizar Pedido →</a>
    <button class="cart-clear-btn" id="cartClearBtn">Limpar carrinho</button>`;

  footer.querySelector('#cartClearBtn').onclick = () => {
    Cart.clear();
    renderCartDrawer();
  };
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (!drawer) return;
  renderCartDrawer();
  drawer.classList.add('open');
  if (overlay) overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (drawer) drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
  document.body.style.overflow = '';
}

/* ── SIZE MODAL ── */
function openSizeModal(product) {
  let modal = document.getElementById('sizeModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'sizeModal';
    modal.className = 'size-modal';
    modal.innerHTML = `
      <div class="size-modal-box">
        <button class="size-modal-close">✕</button>
        <div class="size-modal-product"></div>
        <p class="size-modal-label">Selecione o tamanho</p>
        <div class="size-grid"></div>
        <button class="size-confirm-btn" disabled>Adicionar ao Carrinho</button>
      </div>`;
    document.body.appendChild(modal);

    modal.querySelector('.size-modal-close').onclick = () => modal.classList.remove('open');
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  }

  modal.querySelector('.size-modal-product').innerHTML = `
    ${renderProductImage(product, product.model, { lazy: false })}
    <div>
      <p class="sm-brand">${product.brand}</p>
      <p class="sm-model">${product.model}</p>
      <p class="sm-price">${brlCurrency.format(product.price)}</p>
    </div>`;
  bindProductImageFallbacks(modal);

  const sizes = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
  const grid = modal.querySelector('.size-grid');
  grid.innerHTML = sizes.map(s => `<button class="size-opt" data-size="${s}">${s}</button>`).join('');

  let selectedSize = null;
  const confirmBtn = modal.querySelector('.size-confirm-btn');

  grid.querySelectorAll('.size-opt').forEach(btn => {
    btn.onclick = () => {
      grid.querySelectorAll('.size-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
      confirmBtn.disabled = false;
    };
  });

  confirmBtn.onclick = () => {
    if (!selectedSize) return;
    Cart.add(product, selectedSize);
    modal.classList.remove('open');
    updateCartBadge();
  };

  modal.classList.add('open');
}

/* ── SCROLL REVEAL ── */
function initReveal(scope = document) {
  const items = scope.querySelectorAll('.reveal:not(.vis)');
  if (!items.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  items.forEach(el => obs.observe(el));
}

/* ── NAV SCROLL ── */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── PARALLAX ── */
function initParallax() {
  const items = [
    { id: 'heroBg',   speed: 0.38 },
    { id: 'parallax1', speed: 0.3 },
    { id: 'parallax2', speed: 0.26 },
    { id: 'parallax3', speed: 0.3 },
  ].map(p => ({ el: document.getElementById(p.id), speed: p.speed })).filter(p => p.el);

  if (!items.length) return;
  const tick = () => {
    items.forEach(({ el, speed }) => {
      const rect = el.parentElement.getBoundingClientRect();
      if (rect.bottom < -400 || rect.top > window.innerHeight + 400) return;
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed}px)`;
    });
  };
  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

/* ── MOBILE NAV ── */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMobile');
  if (!toggle || !menu) return;
  toggle.onclick = () => {
    const open = menu.classList.toggle('open');
    toggle.innerHTML = open ? '✕' : '☰';
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.innerHTML = '☰';
    document.body.style.overflow = '';
  }));
}

/* ── COUPON ── */
function initCoupon() {
  const el = document.getElementById('couponCode');
  if (!el) return;
  el.addEventListener('click', () => {
    navigator.clipboard.writeText('HYPERION25').then(() => {
      const orig = el.textContent;
      el.textContent = 'COPIADO! ✓';
      setTimeout(() => el.textContent = orig, 2000);
    });
  });
}

/* ── HOME PRODUCT GRID ── */
function initIndexGrid() {
  const grid = document.getElementById('indexProductGrid');
  if (!grid) return;

  const featured = ALL_PRODUCTS.slice(0, 6);
  grid.innerHTML = featured.map((p, i) => {
    const delay = ['', 'd1', 'd2', 'd3', 'd4', 'd4'][i];
    const badge = p.badge ? `<span class="card-badge">${p.badge}</span>` : '';
    const oldP  = p.oldPrice ? `<span class="card-old">${brlCurrency.format(p.oldPrice)}</span>` : '';
    return `
    <div class="card reveal ${delay}">
      <div class="card-img">
        <img src="${p.image}" alt="${p.brand} ${p.model}" loading="lazy" referrerpolicy="no-referrer" />
        <div class="card-img-overlay"></div>
        ${badge}
      </div>
      <div class="card-body">
        <div class="card-brand">${p.brand}</div>
        <div class="card-name">${p.model}</div>
        <div class="card-foot">
          <div><span class="card-price">${brlCurrency.format(p.price)}</span>${oldP}</div>
          <button class="card-btn" type="button"
            data-id="${p.id}" data-brand="${p.brand}" data-model="${p.model}"
            data-price="${p.price}" data-image="${p.image}">Comprar</button>
        </div>
      </div>
    </div>`;
  }).join('');
  initReveal(grid);

  grid.addEventListener('click', e => {
    const btn = e.target.closest('.card-btn');
    if (!btn) return;
    const p = ALL_PRODUCTS.find(x => x.id === Number(btn.dataset.id));
    if (p) openSizeModal(p);
  });
}

/* ── COUNTER ANIMATION ── */
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (!counters.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      const duration = 1600;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = prefix + (target * ease).toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => obs.observe(el));
}

/* ── LOJA PAGE ── */
function initLojaPage() {
  const searchInput   = document.getElementById('searchInput');
  const sortSelect    = document.getElementById('sortSelect');
  const brandFilters  = document.getElementById('brandFilters');
  const catFilters    = document.getElementById('categoryFilters');
  const priceRange    = document.getElementById('priceRange');
  const priceValue    = document.getElementById('priceValue');
  const clearBtn      = document.getElementById('clearFilters');
  const productGrid   = document.getElementById('productGrid');
  const resultsCount  = document.getElementById('resultsCount');

  if (!productGrid) return;

  const state = {
    search: '',
    brands: new Set(),
    categories: new Set(),
    maxPrice: 2200,
    sort: 'featured',
  };

  // Build filter options
  const brands = [...new Set(ALL_PRODUCTS.map(p => p.brand))].sort((a,b) => a.localeCompare(b,'pt-BR'));
  const cats   = [...new Set(ALL_PRODUCTS.map(p => p.category))].sort((a,b) => a.localeCompare(b,'pt-BR'));

  function makeCheckbox(value, group, container) {
    const lbl = document.createElement('label');
    lbl.className = 'filter-option';
    const cb = document.createElement('input');
    cb.type = 'checkbox'; cb.value = value; cb.dataset.group = group;
    const txt = document.createElement('span');
    txt.textContent = value;
    lbl.append(cb, txt);
    container.appendChild(lbl);
  }

  if (brandFilters) brands.forEach(b => makeCheckbox(b, 'brand', brandFilters));
  if (catFilters)   cats.forEach(c => makeCheckbox(c, 'category', catFilters));

  function getFiltered() {
    const q = state.search.trim().toLowerCase();
    let list = ALL_PRODUCTS.filter(p => {
      return (!q || p.model.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
        && (state.brands.size === 0 || state.brands.has(p.brand))
        && (state.categories.size === 0 || state.categories.has(p.category))
        && p.price <= state.maxPrice;
    });
    if (state.sort === 'price-asc')  list.sort((a,b) => a.price - b.price);
    if (state.sort === 'price-desc') list.sort((a,b) => b.price - a.price);
    if (state.sort === 'name-asc')   list.sort((a,b) => a.model.localeCompare(b.model,'pt-BR'));
    if (state.sort === 'sale')       list = list.filter(p => p.oldPrice).sort((a,b) => (b.oldPrice-b.price) - (a.oldPrice-a.price));
    return list;
  }

  function cardHTML(p) {
    const badge = p.badge ? `<span class="badge">${p.badge}</span>` : '';
    const oldP  = p.oldPrice ? `<span class="old-price">${brlCurrency.format(p.oldPrice)}</span>` : '';
    const heart = `<button class="wish-btn ${Wishlist.has(p.id) ? 'wished' : ''}" data-id="${p.id}" title="Favoritar">♥</button>`;
    return `
    <article class="product-card">
      <div class="product-image">
        ${renderProductImage(p, `${p.brand} ${p.model}`)}
        ${badge}${heart}
      </div>
      <div class="product-body">
        <p class="product-brand">${p.brand}</p>
        <h3 class="product-name">${p.model}</h3>
        <p class="product-meta">${p.category}</p>
        <div class="product-foot">
          <p class="price">${brlCurrency.format(p.price)}${oldP}</p>
          <button class="buy-btn" type="button"
            data-id="${p.id}" data-brand="${p.brand}" data-model="${p.model}"
            data-price="${p.price}" data-image="${p.image}">+ Carrinho</button>
        </div>
      </div>
    </article>`;
  }

  function render() {
    const list = getFiltered();
    if (resultsCount) resultsCount.textContent = `${list.length} produto${list.length !== 1 ? 's' : ''} encontrado${list.length !== 1 ? 's' : ''}`;
    productGrid.innerHTML = list.length
      ? list.map(cardHTML).join('')
      : `<div class="empty"><p>Nenhum produto encontrado.</p></div>`;
    bindProductImageFallbacks(productGrid);
  }

  function syncPrice() {
    if (priceValue) priceValue.textContent = `Até ${brlCurrency.format(state.maxPrice)}`;
  }

  function clearFilters() {
    state.search = ''; state.brands.clear(); state.categories.clear();
    state.maxPrice = 2200; state.sort = 'featured';
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'featured';
    if (priceRange) priceRange.value = '2200';
    document.querySelectorAll('.filter-option input').forEach(cb => cb.checked = false);
    syncPrice(); render();
  }

  if (searchInput) searchInput.addEventListener('input', e => { state.search = e.target.value; render(); });
  if (sortSelect) sortSelect.addEventListener('change', e => { state.sort = e.target.value; render(); });
  if (brandFilters) brandFilters.addEventListener('change', e => {
    if (!e.target.matches('input[type=checkbox]')) return;
    e.target.checked ? state.brands.add(e.target.value) : state.brands.delete(e.target.value);
    render();
  });
  if (catFilters) catFilters.addEventListener('change', e => {
    if (!e.target.matches('input[type=checkbox]')) return;
    e.target.checked ? state.categories.add(e.target.value) : state.categories.delete(e.target.value);
    render();
  });
  if (priceRange) priceRange.addEventListener('input', e => { state.maxPrice = Number(e.target.value); syncPrice(); render(); });
  if (clearBtn) clearBtn.addEventListener('click', clearFilters);

  // Product grid interactions
  productGrid.addEventListener('click', e => {
    const buyBtn = e.target.closest('.buy-btn');
    if (buyBtn) {
      const p = ALL_PRODUCTS.find(x => x.id === Number(buyBtn.dataset.id));
      if (p) openSizeModal(p);
      return;
    }
    const wishBtn = e.target.closest('.wish-btn');
    if (wishBtn) {
      const id = Number(wishBtn.dataset.id);
      const added = Wishlist.toggle(id);
      wishBtn.classList.toggle('wished', added);
      showCartToast(added ? '♥ Adicionado aos favoritos' : 'Removido dos favoritos');
    }
  });

  // Category quick-filter chips
  document.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.cat;
      state.categories.clear();
      if (cat !== 'all') state.categories.add(cat);
      // sync checkboxes
      if (catFilters) catFilters.querySelectorAll('input[type=checkbox]').forEach(cb => {
        cb.checked = cat !== 'all' && cb.value === cat;
      });
      render();
    });
  });

  syncPrice(); render();
}

/* ── COMPRA PAGE ── */
function initCompraPage() {
  const productBrand  = document.getElementById('productBrand');
  const productModel  = document.getElementById('productModel');
  const productImage  = document.getElementById('productImage');
  const unitPrice     = document.getElementById('unitPrice');
  const quantity      = document.getElementById('quantity');
  const subtotalValue = document.getElementById('subtotalValue');
  const shippingValue = document.getElementById('shippingValue');
  const totalValue    = document.getElementById('totalValue');
  const checkoutForm  = document.getElementById('checkoutForm');
  const statusMessage = document.getElementById('statusMessage');
  const paymentSelect = document.getElementById('payment');

  if (!checkoutForm) return;

  const params = new URLSearchParams(window.location.search);

  // If coming from cart (no product id), show cart items
  const cartItems = Cart.getItems();
  const productId = Number(params.get('id'));
  let product = null;

  // Try to find product from URL params or cart
  if (productId) {
    product = ALL_PRODUCTS.find(p => p.id === productId) || {
      brand: params.get('brand') || 'Hyperion',
      model: params.get('model') || 'Sneaker',
      price: Number(params.get('price')) || 0,
      image: params.get('image') || '',
    };
  }

  const SHIPPING = 29;

  function calcTotals() {
    const qty = Math.max(1, Number(quantity?.value) || 1);
    let subtotal = 0;

    if (product) {
      subtotal = product.price * qty;
    } else {
      subtotal = Cart.total();
    }

    const shipping = subtotal >= 900 ? 0 : SHIPPING;
    const total    = subtotal + shipping;

    if (subtotalValue) subtotalValue.textContent = brlCurrency.format(subtotal);
    if (shippingValue) {
      if (shipping === 0) {
        shippingValue.innerHTML = '<span class="free-ship">Grátis ✓</span>';
      } else {
        shippingValue.textContent = brlCurrency.format(shipping);
      }
    }
    if (totalValue) totalValue.textContent = brlCurrency.format(total);

    // Show pix discount
    const pixHint = document.getElementById('pixHint');
    if (pixHint && paymentSelect) {
      const isPix = paymentSelect.value === 'Pix';
      const discount = isPix ? Math.round(total * 0.05) : 0;
      pixHint.textContent = isPix ? `Desconto Pix: −${brlCurrency.format(discount)} → ${brlCurrency.format(total - discount)}` : '';
    }
  }

  // Render product info
  if (product) {
    if (productBrand) productBrand.textContent = product.brand;
    if (productModel) productModel.textContent = product.model;
    if (productImage) {
      productImage.dataset.productImage = 'true';
      productImage.dataset.brand = product.brand || 'Hyperion';
      productImage.dataset.model = product.model || 'Sneaker';
      productImage.referrerPolicy = 'no-referrer';
      bindProductImageFallbacks(document);
      productImage.src = product.image || buildProductFallbackImage(product);
      productImage.alt = `${product.brand} ${product.model}`;
    }
    if (unitPrice) unitPrice.textContent = brlCurrency.format(product.price);
  } else if (cartItems.length > 0) {
    // Render cart summary
    const panel = document.querySelector('.product-panel');
    if (panel) {
      panel.innerHTML = `<p class="panel-label">Itens do Carrinho</p>
        <div class="cart-checkout-items">
          ${cartItems.map(i => `
            <div class="cc-item">
              ${renderProductImage(i, i.model, { lazy: false })}
              <div>
                <p class="cc-brand">${i.brand}</p>
                <p class="cc-model">${i.model}</p>
                <p class="cc-details">Tam. ${i.size} · Qtd. ${i.qty}</p>
              </div>
              <p class="cc-price">${brlCurrency.format(i.price * i.qty)}</p>
            </div>`).join('')}
        </div>`;
      bindProductImageFallbacks(panel);
    }
    const qtyLabel = document.querySelector('label[for="quantity"]')?.closest('label');
    if (qtyLabel) qtyLabel.style.display = 'none';
  }

  if (quantity) quantity.addEventListener('input', calcTotals);
  if (paymentSelect) paymentSelect.addEventListener('change', calcTotals);

  // CEP mask
  const zipInput = document.getElementById('zip');
  if (zipInput) {
    zipInput.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 5) v = v.slice(0,5) + '-' + v.slice(5,8);
      e.target.value = v;
    });
  }

  // Card number mask
  const cardNum = document.getElementById('cardNumber');
  if (cardNum) {
    cardNum.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '').slice(0,16);
      v = v.replace(/(.{4})/g, '$1 ').trim();
      e.target.value = v;
    });
  }

  // Expiry mask
  const expiry = document.getElementById('cardExpiry');
  if (expiry) {
    expiry.addEventListener('input', e => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2,4);
      e.target.value = v;
    });
  }

  // Toggle card fields
  if (paymentSelect) {
    paymentSelect.addEventListener('change', () => {
      const cardFields = document.getElementById('cardFields');
      if (cardFields) cardFields.style.display = paymentSelect.value === 'Cartão de crédito' ? 'grid' : 'none';
    });
  }

  checkoutForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = checkoutForm.querySelector('.confirm-btn');
    btn.textContent = 'Processando...';
    btn.disabled = true;
    setTimeout(() => {
      if (statusMessage) {
        statusMessage.innerHTML = `
          <div class="success-msg">
            <span class="success-check">✓</span>
            <div>
              <strong>Pedido realizado com sucesso!</strong>
              <p>Em um e-commerce real você seria redirecionado ao pagamento. Obrigado pela simulação!</p>
            </div>
          </div>`;
      }
      Cart.clear();
      updateCartBadge();
      btn.textContent = 'Pedido Confirmado ✓';
    }, 1400);
  });

  calcTotals();
}

/* ── SEARCH OVERLAY ── */
function initSearchOverlay() {
  const trigger = document.getElementById('searchTrigger');
  const overlay = document.getElementById('searchOverlay');
  const close   = document.getElementById('searchClose');
  const input   = document.getElementById('searchOverlayInput');
  const results = document.getElementById('searchResults');
  if (!trigger || !overlay) return;

  trigger.onclick = () => { overlay.classList.add('open'); input?.focus(); };
  close?.addEventListener('click', () => overlay.classList.remove('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

  input?.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = ''; return; }
    const found = ALL_PRODUCTS.filter(p =>
      p.model.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    ).slice(0, 6);
    results.innerHTML = found.length
      ? found.map(p => `
        <div class="search-result-item" data-id="${p.id}">
          ${renderProductImage(p, p.model, { lazy: false })}
          <div>
            <p class="sr-brand">${p.brand}</p>
            <p class="sr-model">${p.model}</p>
          </div>
          <p class="sr-price">${brlCurrency.format(p.price)}</p>
        </div>`).join('')
      : `<p class="search-empty">Nenhum resultado para "${input.value}"</p>`;
    bindProductImageFallbacks(results);

    results.querySelectorAll('.search-result-item').forEach(item => {
      item.onclick = () => {
        const p = ALL_PRODUCTS.find(x => x.id === Number(item.dataset.id));
        if (p) { overlay.classList.remove('open'); openSizeModal(p); }
      };
    });
  });
}

/* ── NEWSLETTER ── */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const msg = form.querySelector('.nl-msg');
    const email = form.querySelector('input[type=email]');
    if (msg) { msg.textContent = `${email?.value || ''} cadastrado com sucesso! 🎉`; msg.style.color = '#6ed47a'; }
    if (email) email.value = '';
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  initReveal();
  initNav();
  initParallax();
  initMobileNav();
  initCoupon();
  initIndexGrid();
  initCounters();
  initLojaPage();
  initCompraPage();
  initSearchOverlay();
  initNewsletter();

  // Cart drawer
  document.querySelectorAll('[data-cart-open]').forEach(btn =>
    btn.addEventListener('click', openCartDrawer)
  );
  document.getElementById('cartDrawerClose')?.addEventListener('click', closeCartDrawer);
  document.getElementById('drawerOverlay')?.addEventListener('click', closeCartDrawer);

  // Cart drawer delegation
  document.getElementById('cartDrawer')?.addEventListener('click', e => {
    const qBtn = e.target.closest('.cart-qty-btn');
    if (qBtn) {
      const key = qBtn.dataset.key;
      const item = Cart.getItems().find(i => i.key === key);
      if (item) Cart.updateQty(key, item.qty + (qBtn.dataset.action === 'inc' ? 1 : -1));
    }
    const rmBtn = e.target.closest('.cart-remove-btn');
    if (rmBtn) Cart.remove(rmBtn.dataset.key);
  });
});
