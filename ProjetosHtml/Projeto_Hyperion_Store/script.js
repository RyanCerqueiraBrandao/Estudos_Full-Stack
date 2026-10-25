const brlCurrency = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
});

function redirectToCheckout(product) {
  const params = new URLSearchParams({
    brand: product.brand || '',
    model: product.model || '',
    price: String(product.price || 0),
    image: product.image || '',
  });
  window.location.href = `compra.html?${params.toString()}`;
}

// HOME NAV SCROLL
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// INDEX VITRINE
const indexProducts = [
  {
    brand: 'Nike',
    model: 'AIR MAX 270',
    priceValue: 849,
    priceLabel: 'R$ 849',
    oldPriceLabel: '',
    badge: 'Novo',
    image: 'https://images.unsplash.com/photo-1580902215245-bd46881c72c5?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Nike Air Max 270',
    delayClass: '',
  },
  {
    brand: 'Adidas',
    model: 'ULTRABOOST LIGHT',
    priceValue: 699,
    priceLabel: 'R$ 699',
    oldPriceLabel: 'R$ 879',
    badge: '-20%',
    image: 'https://trilhaesportes.fbitsstatic.net/img/p/tenis-adidas-ultraboost-light-unissex-cinza-laranja-71905/274048-4.jpg?w=1200&h=1200&v=no-value',
    alt: 'Adidas Ultraboost',
    delayClass: 'd1',
  },
  {
    brand: 'New Balance',
    model: '9060',
    priceValue: 929,
    priceLabel: 'R$ 929',
    oldPriceLabel: '',
    badge: '',
    image: 'https://crepdogcrew.com/cdn/shop/files/NEWBALANCE_10.png?v=1764666734&width=1080',
    alt: 'New Balance 9060',
    delayClass: 'd2',
  },
  {
    brand: 'Jordan',
    model: 'AIR JORDAN 1 HIGH',
    priceValue: 1199,
    priceLabel: 'R$ 1.199',
    oldPriceLabel: '',
    badge: 'Exclusivo',
    image: 'https://droper-media.s3.amazonaws.com/30122021174310879.webp',
    alt: 'Air Jordan 1 High',
    delayClass: 'd3',
  },
  {
    brand: 'Puma',
    model: 'RS-X',
    priceValue: 659,
    priceLabel: 'R$ 659',
    oldPriceLabel: '',
    badge: 'Trend',
    image: 'https://http2.mlstatic.com/D_NQ_NP_906940-MLB75762220422_042024-O-tnis-puma-rs-x-efekt-masculino.webp',
    alt: 'Puma RS-X',
    delayClass: 'd4',
  },
  {
    brand: 'Asics',
    model: 'GEL-KAYANO 30',
    priceValue: 999,
    priceLabel: 'R$ 999',
    oldPriceLabel: '',
    badge: 'Run',
    image: 'https://authenticfeet.vtexassets.com/arquivos/ids/407744-800-800?v=638442943546900000&width=800&height=800&aspect=true',
    alt: 'Asics Gel-Kayano',
    delayClass: 'd4',
  },
];

const indexProductGrid = document.getElementById('indexProductGrid');
if (indexProductGrid) {
  indexProductGrid.innerHTML = indexProducts
    .map((product) => {
      const badgeHTML = product.badge ? `<span class="card-badge">${product.badge}</span>` : '';
      const oldPriceHTML = product.oldPriceLabel ? `<span class="card-old">${product.oldPriceLabel}</span>` : '';
      const delayClass = product.delayClass ? ` ${product.delayClass}` : '';

      return `
      <div class="card reveal${delayClass}">
        <div class="card-img">
          <img src="${product.image}" alt="${product.alt}" loading="lazy" />
          <div class="card-img-overlay"></div>
          ${badgeHTML}
        </div>
        <div class="card-body">
          <div class="card-brand">${product.brand}</div>
          <div class="card-name">${product.model}</div>
          <div class="card-foot">
            <div><span class="card-price">${product.priceLabel}</span>${oldPriceHTML}</div>
            <button
              class="card-btn"
              type="button"
              data-brand="${product.brand}"
              data-model="${product.model}"
              data-price="${product.priceValue}"
              data-image="${product.image}"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    `;
    })
    .join('');

  indexProductGrid.addEventListener('click', (event) => {
    const button = event.target.closest('.card-btn');
    if (!button) return;

    redirectToCheckout({
      brand: button.dataset.brand || '',
      model: button.dataset.model || '',
      price: Number(button.dataset.price) || 0,
      image: button.dataset.image || '',
    });
  });
}

// PARALLAX
const parallaxItems = [
  { id: 'heroBg', speed: 0.38 },
  { id: 'parallax1', speed: 0.32 },
  { id: 'parallax2', speed: 0.28 },
  { id: 'parallax3', speed: 0.32 },
];
const pEls = parallaxItems
  .map((p) => ({ el: document.getElementById(p.id), speed: p.speed }))
  .filter((item) => item.el);

if (pEls.length > 0) {
  const doParallax = () => {
    pEls.forEach(({ el, speed }) => {
      const parent = el.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      if (rect.bottom < -300 || rect.top > window.innerHeight + 300) return;
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateY(${center * speed}px)`;
    });
  };

  window.addEventListener('scroll', doParallax, { passive: true });
  doParallax();
}

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('vis');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach((item) => observer.observe(item));
}

// COPY COUPON
const coupon = document.getElementById('couponCode');
if (coupon) {
  coupon.addEventListener('click', () => {
    navigator.clipboard.writeText('HYPERION25').then(() => {
      const originalText = coupon.textContent;
      coupon.textContent = 'COPIADO!';
      coupon.style.background = '#555';
      setTimeout(() => {
        coupon.textContent = originalText;
        coupon.style.background = '';
      }, 1800);
    });
  });
}

// LOJA PAGE
{
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const brandFilters = document.getElementById('brandFilters');
  const categoryFilters = document.getElementById('categoryFilters');
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  const clearFiltersButton = document.getElementById('clearFilters');
  const productGrid = document.getElementById('productGrid');
  const resultsCount = document.getElementById('resultsCount');

  if (
    searchInput &&
    sortSelect &&
    brandFilters &&
    categoryFilters &&
    priceRange &&
    priceValue &&
    clearFiltersButton &&
    productGrid &&
    resultsCount
  ) {
    const products = [
      {
        id: 1,
        brand: 'Nike',
        model: 'Air Max 270',
        category: 'Lifestyle',
        price: 849,
        oldPrice: 999,
        badge: 'Novo',
        image: 'https://cdnimg.etiquetaunica.com.br/products/webp/tenis-nike-air-max-270-branco-jcm82-1675099157-0000003_v2.webp',
      },
      {
        id: 2,
        brand: 'Adidas',
        model: 'Ultraboost Light',
        category: 'Corrida',
        price: 799,
        oldPrice: 949,
        badge: '-15%',
        image: 'https://trilhaesportes.fbitsstatic.net/img/p/tenis-adidas-ultraboost-light-unissex-cinza-laranja-71905/274048-4.jpg?w=1200&h=1200&v=no-value',
      },
      {
        id: 3,
        brand: 'New Balance',
        model: '9060',
        category: 'Lifestyle',
        price: 929,
        oldPrice: null,
        badge: 'Trend',
        image: 'https://crepdogcrew.com/cdn/shop/files/NEWBALANCE_10.png?v=1764666734&width=1080',
      },
      {
        id: 4,
        brand: 'Jordan',
        model: 'Air Jordan 1 High',
        category: 'Basquete',
        price: 1199,
        oldPrice: null,
        badge: 'Exclusivo',
        image: 'https://droper-media.s3.amazonaws.com/30122021174310879.webp',
      },
      {
        id: 5,
        brand: 'Puma',
        model: 'RS-X',
        category: 'Lifestyle',
        price: 659,
        oldPrice: 799,
        badge: 'Oferta',
        image: 'https://http2.mlstatic.com/D_NQ_NP_906940-MLB75762220422_042024-O-tnis-puma-rs-x-efekt-masculino.webp',
      },
      {
        id: 6,
        brand: 'Asics',
        model: 'Gel-Kayano 30',
        category: 'Corrida',
        price: 999,
        oldPrice: null,
        badge: 'Run',
        image: 'https://authenticfeet.vtexassets.com/arquivos/ids/407744-800-800?v=638442943546900000&width=800&height=800&aspect=true',
      },
      {
        id: 7,
        brand: 'Mizuno',
        model: 'Wave Prophecy',
        category: 'Corrida',
        price: 1399,
        oldPrice: 1599,
        badge: 'Premium',
        image: 'https://lojavirus.fbitsstatic.net/img/p/tenis-mizuno-wave-prophecy-ls-air-mesh-off-white-prata-preto-102300003-77283/331559.jpg?w=1200&h=1200&v=202509251700',
      },
      {
        id: 8,
        brand: 'Reebok',
        model: 'Club C 85',
        category: 'Lifestyle',
        price: 549,
        oldPrice: null,
        badge: null,
        image: 'https://http2.mlstatic.com/D_NQ_NP_602023-MLB78133354294_082024-O-tnis-reebok-club-c-85-unissex-bege-claro.webp',
      },
      {
        id: 9,
        brand: 'Under Armour',
        model: 'HOVR Phantom',
        category: 'Treino',
        price: 879,
        oldPrice: null,
        badge: 'Treino',
        image: 'https://imgcentauro-a.akamaihd.net/1200x1200/96607829A9.jpg',
      },
      {
        id: 10,
        brand: 'Converse',
        model: 'Chuck Taylor All Star',
        category: 'Skate',
        price: 399,
        oldPrice: null,
        badge: null,
        image: 'https://www.kicks.com.co/media/catalog/product/m/9/m9160c_frontf1-001.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=&width=&canvas=:',
      },
      {
        id: 11,
        brand: 'Vans',
        model: 'Old Skool',
        category: 'Skate',
        price: 429,
        oldPrice: null,
        badge: 'Classico',
        image: 'https://images.tcdn.com.br/img/img_prod/901504/tenis_vans_skate_old_skool_azul_1745_1_e94935f213e78cd936b29ea4ea8c94a9.png',
      },
      {
        id: 12,
        brand: 'Fila',
        model: 'Disruptor II',
        category: 'Lifestyle',
        price: 479,
        oldPrice: 549,
        badge: null,
        image: 'https://ostoresneakers.vteximg.com.br/arquivos/ids/216081-1000-1000/tenis-fila-disruptor-2-5XM01765-125-0.jpg?v=637956677552500000',
      },
      {
        id: 13,
        brand: 'Nike',
        model: 'Pegasus 41',
        category: 'Corrida',
        price: 899,
        oldPrice: null,
        badge: 'Novo',
        image: 'https://acdn-us.mitiendanube.com/stores/001/153/552/products/tenis-nike-air-zoom-pegasus-41-fd2722-104-ca17b57345d62ae06d17316033767507-1024-1024.webp',
      },
      {
        id: 14,
        brand: 'Adidas',
        model: 'Gazelle Indoor',
        category: 'Lifestyle',
        price: 699,
        oldPrice: null,
        badge: 'Retro',
        image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/73f2b1c3e16f423fa300baed88e28b87_faec/Tenis_Gazelle_Indoor_Preto_JI2060_db01_standard.jpg',
      },
      {
        id: 15,
        brand: 'New Balance',
        model: '550',
        category: 'Basquete',
        price: 749,
        oldPrice: null,
        badge: null,
        image: 'https://espacocon.fbitsstatic.net/img/p/tenis-new-balance-550-branco-azul-152698/368399-1.jpg?w=1200&h=1200&v=no-value',
      },
      {
        id: 16,
        brand: 'Jordan',
        model: 'Air Jordan 4 Retro',
        category: 'Basquete',
        price: 1499,
        oldPrice: 1699,
        badge: 'Drop',
        image: 'https://cdn.awsli.com.br/2500x2500/1144/1144748/produto/169741487/6a680d4dd2.jpg',
      },
      {
        id: 17,
        brand: 'On',
        model: 'Cloudmonster',
        category: 'Corrida',
        price: 1299,
        oldPrice: null,
        badge: 'Performance',
        image: 'https://cdn.vnda.com.br/velocita/2024/02/15/15_49_30_715_15_2_4_438_small20png3me10122035cloudmonster_2ss24undyed_frostmg1.jpg?v=1708022970',
      },
      {
        id: 18,
        brand: 'Puma',
        model: 'Deviate Nitro 2',
        category: 'Corrida',
        price: 1099,
        oldPrice: null,
        badge: null,
        image: 'https://cdn.vnda.com.br/velocita/2024/02/22/12_04_38_958_12_2_5_588_380088011.jpg?v=1708614349',
      },
    ];

    const state = {
      search: '',
      brands: new Set(),
      categories: new Set(),
      maxPrice: Number(priceRange.value),
      sort: 'featured',
    };

    function createCheckboxOption(value, group) {
      const label = document.createElement('label');
      label.className = 'filter-option';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = value;
      checkbox.dataset.group = group;

      const text = document.createElement('span');
      text.textContent = value;

      label.append(checkbox, text);
      return label;
    }

    function mountFilterOptions() {
      const uniqueBrands = [...new Set(products.map((product) => product.brand))].sort((a, b) =>
        a.localeCompare(b, 'pt-BR')
      );
      const uniqueCategories = [...new Set(products.map((product) => product.category))].sort((a, b) =>
        a.localeCompare(b, 'pt-BR')
      );

      uniqueBrands.forEach((brand) => {
        brandFilters.appendChild(createCheckboxOption(brand, 'brand'));
      });
      uniqueCategories.forEach((category) => {
        categoryFilters.appendChild(createCheckboxOption(category, 'category'));
      });
    }

    function getFilteredProducts() {
      const query = state.search.trim().toLowerCase();

      let filtered = products.filter((product) => {
        const matchesSearch =
          query.length === 0 ||
          product.model.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query);
        const matchesBrand = state.brands.size === 0 || state.brands.has(product.brand);
        const matchesCategory = state.categories.size === 0 || state.categories.has(product.category);
        const matchesPrice = product.price <= state.maxPrice;

        return matchesSearch && matchesBrand && matchesCategory && matchesPrice;
      });

      if (state.sort === 'price-asc') {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (state.sort === 'price-desc') {
        filtered = filtered.sort((a, b) => b.price - a.price);
      } else if (state.sort === 'name-asc') {
        filtered = filtered.sort((a, b) => a.model.localeCompare(b.model, 'pt-BR'));
      }

      return filtered;
    }

    function productCardTemplate(product) {
      const oldPriceHTML = product.oldPrice
        ? `<span class="old-price">${brlCurrency.format(product.oldPrice)}</span>`
        : '';

      const badgeHTML = product.badge ? `<span class="badge">${product.badge}</span>` : '';

      return `
    <article class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.brand} ${product.model}" loading="lazy" />
        ${badgeHTML}
      </div>
      <div class="product-body">
        <p class="product-brand">${product.brand}</p>
        <h3 class="product-name">${product.model}</h3>
        <p class="product-meta">${product.category}</p>
        <div class="product-foot">
          <p class="price">${brlCurrency.format(product.price)}${oldPriceHTML}</p>
          <button
            class="buy-btn"
            type="button"
            data-brand="${product.brand}"
            data-model="${product.model}"
            data-price="${product.price}"
            data-image="${product.image}"
          >
            Comprar
          </button>
        </div>
      </div>
    </article>
  `;
    }

    function renderProducts() {
      const filtered = getFilteredProducts();

      resultsCount.textContent = `${filtered.length} produto${filtered.length === 1 ? '' : 's'} encontrado${
        filtered.length === 1 ? '' : 's'
      }`;

      if (filtered.length === 0) {
        productGrid.innerHTML = `
      <div class="empty">
        <p>Nenhum produto encontrado com os filtros atuais.</p>
      </div>
    `;
        return;
      }

      productGrid.innerHTML = filtered.map(productCardTemplate).join('');
    }

    function syncPriceLabel() {
      priceValue.textContent = `Ate ${brlCurrency.format(state.maxPrice)}`;
    }

    function updateCheckboxState(group, value, checked) {
      const targetSet = group === 'brand' ? state.brands : state.categories;

      if (checked) {
        targetSet.add(value);
        return;
      }
      targetSet.delete(value);
    }

    function clearFilters() {
      state.search = '';
      state.brands.clear();
      state.categories.clear();
      state.maxPrice = Number(priceRange.max);
      state.sort = 'featured';

      searchInput.value = '';
      sortSelect.value = 'featured';
      priceRange.value = String(state.maxPrice);

      document.querySelectorAll('.filter-option input[type="checkbox"]').forEach((checkbox) => {
        checkbox.checked = false;
      });

      syncPriceLabel();
      renderProducts();
    }

    searchInput.addEventListener('input', (event) => {
      state.search = event.target.value;
      renderProducts();
    });

    sortSelect.addEventListener('change', (event) => {
      state.sort = event.target.value;
      renderProducts();
    });

    brandFilters.addEventListener('change', (event) => {
      if (!event.target.matches('input[type="checkbox"]')) return;
      updateCheckboxState('brand', event.target.value, event.target.checked);
      renderProducts();
    });

    categoryFilters.addEventListener('change', (event) => {
      if (!event.target.matches('input[type="checkbox"]')) return;
      updateCheckboxState('category', event.target.value, event.target.checked);
      renderProducts();
    });

    priceRange.addEventListener('input', (event) => {
      state.maxPrice = Number(event.target.value);
      syncPriceLabel();
      renderProducts();
    });

    clearFiltersButton.addEventListener('click', clearFilters);

    productGrid.addEventListener('click', (event) => {
      const button = event.target.closest('.buy-btn');
      if (!button) return;

      redirectToCheckout({
        brand: button.dataset.brand || '',
        model: button.dataset.model || '',
        price: Number(button.dataset.price) || 0,
        image: button.dataset.image || '',
      });
    });

    mountFilterOptions();
    syncPriceLabel();
    renderProducts();
  }
}

// COMPRA PAGE
{
  const productBrand = document.getElementById('productBrand');
  const productModel = document.getElementById('productModel');
  const productImage = document.getElementById('productImage');
  const unitPrice = document.getElementById('unitPrice');
  const quantity = document.getElementById('quantity');
  const subtotalValue = document.getElementById('subtotalValue');
  const shippingValue = document.getElementById('shippingValue');
  const totalValue = document.getElementById('totalValue');
  const checkoutForm = document.getElementById('checkoutForm');
  const statusMessage = document.getElementById('statusMessage');

  if (
    productBrand &&
    productModel &&
    productImage &&
    unitPrice &&
    quantity &&
    subtotalValue &&
    shippingValue &&
    totalValue &&
    checkoutForm &&
    statusMessage
  ) {
    const params = new URLSearchParams(window.location.search);
    const product = {
      brand: params.get('brand') || 'Hyperion',
      model: params.get('model') || 'Sneaker',
      price: Number(params.get('price')) || 0,
      image: params.get('image') || '',
    };

    const SHIPPING_FLAT = 29;

    const updateSummary = () => {
      const qty = Number(quantity.value) > 0 ? Number(quantity.value) : 1;
      const subtotal = product.price * qty;
      const shipping = subtotal >= 900 ? 0 : SHIPPING_FLAT;
      const total = subtotal + shipping;

      subtotalValue.textContent = brlCurrency.format(subtotal);
      shippingValue.textContent = shipping === 0 ? 'Gratis' : brlCurrency.format(shipping);
      totalValue.textContent = brlCurrency.format(total);
    };

    productBrand.textContent = product.brand;
    productModel.textContent = product.model;
    productImage.src =
      product.image ||
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&fit=crop';
    productImage.alt = `${product.brand} ${product.model}`;
    unitPrice.textContent = brlCurrency.format(product.price);

    quantity.addEventListener('input', updateSummary);

    checkoutForm.addEventListener('submit', (event) => {
      event.preventDefault();
      statusMessage.textContent =
        'Pedido simulado com sucesso! Em um ecommerce real, voce seguiria para o pagamento.';
    });

    updateSummary();
  }
}
