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
            "PT ATRIANUR INDONESIA is a leading company in the oil and chemical sectors, providing premium lubricants, industrial oils, and specialized chemical solutions for industrial applications that meet international quality standards.",
        imageSrc: "/src/jakarta.jpg",
        author: "PT ATRIANUR INDONESIA",
        date: "November 12, 2025",
        readTime: "4 min",
        url: "#"
    },
    {
        title: "High-Quality Industrial Oil Products",
        excerpt:
            "A complete range of industrial lubricants and engine oils featuring advanced technology — designed to enhance operational efficiency, extend machine lifespan, and reduce maintenance costs.",
        imageSrc: "src/minyak.jpg",
        author: "Industrial Oil Division",
        date: "October 25, 2025",
        readTime: "5 min",
        url: "#"
    },
    {
        title: "Chemical Solutions for Manufacturing Processes",
        excerpt:
            "Providing high-quality chemicals, specialty additives, and process fluids for a wide range of industries — supported by professional technical expertise and process consulting.",
        imageSrc: "src/kimia.jpg",
        author: "Industrial Chemical Division",
        date: "September 8, 2025",
        readTime: "6 min",
        url: "#"
    },
    {
        title: "Commitment to Sustainability and the Environment",
        excerpt:
            "Developing eco-friendly formulations and sustainable products without compromising performance — aligned with global regulations and the company’s social responsibility standards.",
        imageSrc: "src/penyimpanan-bahan-kimia.webp",
        author: "ATRianur R&D",
        date: "August 15, 2025",
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
            title: 'About Us - ATRIANUR ENERGI INDONESIA',
            html: '<p><strong>PT Atrianur Energi Indonesia</strong> is a privately owned national company engaged in the collection and purchase of used cooking oil, as well as the electrical and mechanical procurement and installation for lifts, gondolas, and dumbwaiters. We offer a range of products for various industrial sectors. These products are produced and distributed domestically to meet the needs of communities throughout Indonesia.</p><p>We strive to be a leading and trusted company in the management of used cooking oil waste and in providing vertical transportation solutions within buildings across Indonesia — committed to quality, innovation, and environmental sustainability.</p><p><strong>PT Atrianur Energi Indonesia’s</strong> main markets include used cooking oil purchasing, lift systems, gondolas, dumbwaiters, and maintenance services.</p>'
        },
        visi: {
            title: 'Vision',
            html: '<p><strong>PT Atrianur Energi Indonesia</strong> is a privately owned national company engaged in the collection and purchase of used cooking oil, as well as the electrical and mechanical procurement and installation for lifts, gondolas, and dumbwaiters. We offer a range of products for various industrial sectors. These products are produced and distributed domestically to meet the needs of communities throughout Indonesia.</p><p>We aim to become a leading and trusted company in the management of used cooking oil waste and in providing vertical transportation solutions within buildings across Indonesia — with a commitment to quality, innovation, and environmental sustainability.</p><p><strong>PT Atrianur Energi Indonesia’s</strong> main markets include used cooking oil purchasing, lifts, gondolas, dumbwaiters, and maintenance services.</p>'
        },
        misi: {
            title: 'Mission',
            html: '<ul><li>To engage all business sectors and communities in waste collection activities under the management of PT Atrianur Energi Indonesia.</li><li>To support the economic growth of all business partners and communities collaborating with PT Atrianur Energi Indonesia by providing additional income opportunities through this business.</li><li>To deliver <strong>solutions</strong> for vertical transportation in buildings (Elevators and Escalators) by producing high-quality products and after-sales services, implementing ethical and proper business practices, in pursuit of Allah Almighty’s blessings.</li></ul>'
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
