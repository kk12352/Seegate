const I18N = {
  zh: {
    brandSub: "Clarity Moves Everything",
    navHome: "首页",
    navProducts: "产品",
    navAbout: "关于",
    navContact: "联系",
    heroEyebrow: "数据、桌面与生活的统一体验",
    heroTitle: "Clarity Moves Everything",
    heroDesc: "Seegate 以清晰、稳定和精致的科技语言，打造覆盖存储、办公和智能生活场景的电子产品系列。",
    heroBtnPrimary: "探索产品",
    heroBtnSecondary: "了解品牌",
    productsTitle: "精选产品",
    productsDesc: "从高速存储到桌面外设，再到智能生活设备，Seegate 用统一的品牌语言连接每一个高频使用场景。",
    viewDetail: "查看详情",
    aboutTitle: "关于 Seegate",
    aboutP1: "Seegate 是一个面向现代工作与生活方式的科技电子品牌。我们关注产品在真实日常中的可靠性、触感和视觉一致性，让工具更安静地融入空间。",
    aboutP2: "品牌 logo 由 SG 字母与流动波形构成，代表数据流、海潮和稳定连接。它被应用在每一件产品表面，形成统一而清晰的产品家族识别。",
    aboutFeature1: "统一品牌标识",
    aboutFeature2: "高质感材料",
    aboutFeature3: "多场景生态",
    contactTitle: "联系 Seegate",
    contactDesc: "如需商务合作、售后支持或产品咨询，欢迎通过邮箱与社交媒体联系 Seegate 团队。",
    serviceTime: "服务时间：周一至周五 09:00 - 18:00",
    footerText: "© 2026 Seegate. Clarity Moves Everything.",
    crumbHome: "首页",
    backHome: "返回首页",
    nextProduct: "下一个产品"
  },
  en: {
    brandSub: "Clarity Moves Everything",
    navHome: "Home",
    navProducts: "Products",
    navAbout: "About",
    navContact: "Contact",
    heroEyebrow: "Unified technology for data, desks, and daily life",
    heroTitle: "Clarity Moves Everything",
    heroDesc: "Seegate builds refined electronics for storage, workspaces, and smart living with a clear, stable, and cohesive design language.",
    heroBtnPrimary: "Explore Products",
    heroBtnSecondary: "About the Brand",
    productsTitle: "Featured Products",
    productsDesc: "From fast storage to workspace essentials and smart home devices, Seegate connects everyday tools through one consistent brand language.",
    viewDetail: "View Details",
    aboutTitle: "About Seegate",
    aboutP1: "Seegate is a technology electronics brand for modern work and living. We focus on reliability, tactile quality, and visual consistency in products people use every day.",
    aboutP2: "The brand logo combines the letters SG with a flowing wave form, representing data flow, ocean movement, and stable connection. It appears across each product surface as a clear family identity.",
    aboutFeature1: "Unified Brand Mark",
    aboutFeature2: "Premium Materials",
    aboutFeature3: "Multi-scene Ecosystem",
    contactTitle: "Contact Seegate",
    contactDesc: "For business cooperation, after-sales support, or product questions, contact the Seegate team by email or social media.",
    serviceTime: "Service hours: Monday to Friday 09:00 - 18:00",
    footerText: "© 2026 Seegate. Clarity Moves Everything.",
    crumbHome: "Home",
    backHome: "Back to Home",
    nextProduct: "Next Product"
  }
};

const LANG_KEY = "seegate-language";
const products = window.SEEGATE_PRODUCTS || [];
const langButtons = document.querySelectorAll(".lang-btn");
const i18nNodes = document.querySelectorAll("[data-i18n]");

function getLang() {
  return localStorage.getItem(LANG_KEY) || "zh";
}

function productText(product, lang) {
  return product[lang] || product.zh;
}

function renderCards(lang) {
  const grid = document.querySelector("#productGrid");
  if (!grid) return;

  grid.innerHTML = products.map((product) => {
    const text = productText(product, lang);
    return `
      <article class="card">
        <div class="card-media">
          <span class="tag">${product.category}</span>
          <img src="${product.image}" alt="${text.name}">
        </div>
        <div class="card-body">
          <h3>${text.name}</h3>
          <p class="lead">${text.lead}</p>
          <p class="body-copy">${text.body}</p>
          <div class="card-footer">
            <div class="price">${product.price}</div>
            <a class="detail-link" href="${product.page}">${I18N[lang].viewDetail}</a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderProductDetail(lang) {
  const detail = document.querySelector("[data-product]");
  if (!detail) return;

  const id = Number(detail.dataset.product);
  const product = products.find((item) => item.id === id) || products[0];
  const text = productText(product, lang);
  const next = products.find((item) => item.id === id + 1) || products[0];

  document.title = `${text.name} | Seegate`;
  document.querySelector("#crumbCurrent").textContent = text.name;
  document.querySelector("#productImage").src = product.image;
  document.querySelector("#productImage").alt = text.name;
  document.querySelector("#productTag").textContent = product.category;
  document.querySelector("#productTitle").textContent = text.name;
  document.querySelector("#productLead").textContent = text.lead;
  document.querySelector("#productDesc1").textContent = text.desc1;
  document.querySelector("#productDesc2").textContent = text.desc2;
  document.querySelector("#productPrice").textContent = product.price;
  document.querySelector("#nextProduct").href = next.page;

  document.querySelector("#productSpecs").innerHTML = text.specs.map(([label, value]) => `
    <div class="spec"><strong>${label}</strong><span>${value}</span></div>
  `).join("");
}

function setLanguage(lang) {
  const dict = I18N[lang] || I18N.zh;

  i18nNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) node.textContent = dict[key];
  });

  document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
  langButtons.forEach((button) => button.classList.toggle("active", button.dataset.lang === lang));
  localStorage.setItem(LANG_KEY, lang);
  renderCards(lang);
  renderProductDetail(lang);
}

setLanguage(getLang());
langButtons.forEach((button) => button.addEventListener("click", () => setLanguage(button.dataset.lang)));
