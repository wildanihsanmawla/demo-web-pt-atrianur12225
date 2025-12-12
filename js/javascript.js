const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length - 1]);
}

document.addEventListener('click', activate, false);

window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const productList = document.querySelector(".product-list");

  function activateSlider() {
    if (window.innerWidth <= 900) {
      productList.classList.add("slider-active");
      let isDown = false;
      let startX;
      let scrollLeft;

      productList.addEventListener("mousedown", (e) => {
        isDown = true;
        productList.classList.add("grabbing");
        startX = e.pageX - productList.offsetLeft;
        scrollLeft = productList.scrollLeft;
      });

      productList.addEventListener("mouseleave", () => {
        isDown = false;
        productList.classList.remove("grabbing");
      });

      productList.addEventListener("mouseup", () => {
        isDown = false;
        productList.classList.remove("grabbing");
      });

      productList.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - productList.offsetLeft;
        const walk = (x - startX) * 1.2; // kecepatan geser
        productList.scrollLeft = scrollLeft - walk;
      });
    } else {
      productList.classList.remove("slider-active");
      productList.style.overflowX = "unset";
    }
  }

  activateSlider();
  window.addEventListener("resize", activateSlider);
});

// === Navbar Hamburger Menu ===
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const topnav = document.getElementById("myTopnav");

  if (hamburgerBtn && topnav) {
    hamburgerBtn.addEventListener("click", function () {
      topnav.classList.toggle("responsive");
    });
  }
});


// Carousel Implementation

const posts = [
  {
    title: "PT ATRIANUR INDONESIA",
    excerpt:
      "PT ATRIANUR INDONESIA adalah perusahaan terkemuka di bidang minyak dan bahan kimia, menyediakan pelumas premium, oli industri, dan solusi kimia khusus untuk aplikasi industri dengan standar kualitas internasional.",
    imageSrc: "/src/jakarta.jpg",
    author: "PT ATRIANUR INDONESIA",
    date: "12 November 2025",
    readTime: "4 min",
    url: "#"
  },
  {
    title: "Produk Minyak Berkualitas Tinggi untuk Industri",
    excerpt:
      "Rangkaian lengkap pelumas dan oli mesin industrial dengan teknologi terdepan, dirancang untuk meningkatkan efisiensi operasional, memperpanjang umur mesin, dan mengurangi biaya maintenance.",
    imageSrc: "src/minyak.jpg",
    author: "Divisi Minyak Industri",
    date: "25 Oktober 2025",
    readTime: "5 min",
    url: "#"
  },
  {
    title: "Solusi Bahan Kimia untuk Proses Manufaktur",
    excerpt:
      "Menyediakan bahan kimia berkualitas tinggi, aditif spesial, dan cairan proses untuk berbagai industri dengan dukungan teknis profesional dan konsultasi proses.",
    imageSrc: "src/kimia.jpg",
    author: "Divisi Kimia Industri",
    date: "08 September 2025",
    readTime: "6 min",
    url: "#"
  },
  {
    title: "Komitmen Terhadap Keberlanjutan dan Lingkungan",
    excerpt:
      "Mengembangkan formulasi ramah lingkungan dan produk berkelanjutan tanpa mengorbankan performa, sesuai standar regulasi global dan tanggung jawab sosial perusahaan.",
    imageSrc: "src/penyimpanan-bahan-kimia.webp",
    author: "R&D ATRIANUR",
    date: "15 Agustus 2025",
    readTime: "4 min",
    url: "#"
  }
];

let currentIndex = 0;
let direction = 1;
const carousel = document.getElementById("carousel");

function createSlide(post, index) {
  const slide = document.createElement("div");
  slide.className = "slide";
  if (index === currentIndex) slide.classList.add("active");
  slide.style.backgroundImage = `url(${post.imageSrc})`;

  slide.innerHTML = `
      <div class="overlay"></div>
      <div class="slide-content">
        <h1><a href="${post.url}" style="color:white;text-decoration:none" target="_blank">${post.title}</a></h1>
        <p>${post.excerpt}</p>
        <div class="author">${post.author} • ${post.date} • ${post.readTime}</div>
      </div>
    `;

  return slide;
}

function renderSlides() {
  carousel.innerHTML = "";
  posts.forEach((post, i) => {
    const slide = createSlide(post, i);
    carousel.appendChild(slide);
  });

  const controls = document.createElement("div");
  controls.className = "controls";

  const dots = document.createElement("div");
  dots.className = "dots";
  posts.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = `dot ${i === currentIndex ? "active" : ""}`;
    dot.addEventListener("click", () => {
      direction = i > currentIndex ? 1 : -1;
      currentIndex = i;
      updateSlides();
    });
    dots.appendChild(dot);
  });

  const arrows = document.createElement("div");
  arrows.className = "arrows";
  const prevBtn = document.createElement("button");
  prevBtn.className = "arrow-btn";
  prevBtn.textContent = "<";
  prevBtn.onclick = () => {
    direction = -1;
    currentIndex = (currentIndex - 1 + posts.length) % posts.length;
    updateSlides();
  };

  const nextBtn = document.createElement("button");
  nextBtn.className = "arrow-btn";
  nextBtn.textContent = ">";
  nextBtn.onclick = () => {
    direction = 1;
    currentIndex = (currentIndex + 1) % posts.length;
    updateSlides();
  };

  arrows.appendChild(prevBtn);
  arrows.appendChild(nextBtn);
  controls.appendChild(dots);

  carousel.appendChild(controls);
}

function updateSlides() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide, i) => {
    slide.classList.remove("active", "exit-left", "exit-right");
    if (i === currentIndex) {
      slide.classList.add("active");
    } else if (direction === 1) {
      slide.classList.add("exit-left");
    } else {
      slide.classList.add("exit-right");
    }
  });

  // Update dots
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

setInterval(() => {
  direction = 1;
  currentIndex = (currentIndex + 1) % posts.length;
  updateSlides();
}, 8000);

renderSlides();


// Modal popup
(function () {
  const modal = document.getElementById('infoModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  const contents = {
    about: {
      title: 'Tentang Kami - ATRIANUR ENERGI INDONESIA',
      html: '<p><strong>PT Atrianur Energi Indonesia</strong> adalah perusahaan swasta nasional yang bergerak di bidang pembelian minyak jelantah dan pengerjaan dan pengadaan elektrikal mekanikal untuk lift, gondola, dumbwaiter dengan menawarkan pilihan produk untuk berbagai jenis industri. Produk-produk ini diproduksi dan dipasarkan ke pasar domestik untuk memenuhi kebutuhan masyarakat di seluruh Indonesia.</p> <p>Menjadi perusahaan yang terdepan dan terpercaya di bidang pengelolaan limbah minyak jelantah serta penyedia solusi transportasi vertikal dalam gedung di Indonesia, dengan komitmen terhadap kualitas, inovasi, dan keberlanjutan lingkungan.</p><strong>PT Atrianur Energi Indonesia</strong> pasar utama adalah: pembelian minyak jelantah, lift, gondola, dumbwaiter dan layanan servis.</p>'
    },
    visi: {
      title: 'Visi',
      html: '<p><strong>PT Atrianur Energi Indonesia</strong> adalah perusahaan swasta nasional yang bergerak di bidang pembelian minyak jelantah dan pengerjaan dan pengadaan elektrikal mekanikal untuk lift, gondola, dumbwaiter dengan menawarkan pilihan produk untuk berbagai jenis industri. Produk-produk ini diproduksi dan dipasarkan ke pasar domestik untuk memenuhi kebutuhan masyarakat di seluruh Indonesia.</p> <p>Menjadi perusahaan yang terdepan dan terpercaya di bidang pengelolaan limbah minyak jelantah serta penyedia solusi transportasi vertikal dalam gedung di Indonesia, dengan komitmen terhadap kualitas, inovasi, dan keberlanjutan lingkungan.</p><strong>PT Atrianur Energi Indonesia</strong> pasar utama adalah: pembelian minyak jelantah, lift, gondola, dumbwaiter dan layanan servis.</p>'
    },
    misi: {
      title: 'Misi',
      html: '<ul><li>Merangkul seluruh elemen bisnis serta masyarakat ikut serta dalam kegiatan pengumpulan limbah di bawah naungan PT Atrianur Energi Indonesia</li><li>Membantu peningkatan perekonomian seluruh elemen bisnis serta masyarakat yang bermitra dengan PT Atrianur Energi Indonesia dengan memperoleh pendapatan tambahan melalui bisnis ini.</li><li>Memberikan SOLUSI untuk transportasi vertikal dalam gedung (Elevator dan Eskalator) dengan menghasilkan Produk dan Jasa serta pelayanan Purna Jual yang berkualitas, dengan cara menjalankan Proses Bisnis yang Halal dan Baik, dalam upaya mendapatkan Keberkahan Allah Ta ala</li></ul>'
    }
  };

  function openModal(key) {
    const data = contents[key] || contents.about;
    modalTitle.textContent = data.title;
    modalBody.innerHTML = data.html;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    // focus management
    const dialog = modal.querySelector('.modal-card');
    dialog.focus();
  }
  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }

  // Open modal when elements with data-key are activated
  document.querySelectorAll('[data-key]').forEach(el => {
    el.addEventListener('click', function (e) {
      const key = el.getAttribute('data-key') || 'about';
      openModal(key);
    });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(el.getAttribute('data-key') || 'about');
      }
    });
  });

  document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const key = btn.getAttribute('data-key') || (btn.closest('[data-key]') && btn.closest('[data-key]').getAttribute('data-key')) || 'about';
      openModal(key);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();
