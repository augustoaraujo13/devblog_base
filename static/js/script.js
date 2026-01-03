document.addEventListener('DOMContentLoaded', () => {
    // --- MODO DARK ---
    const themeBtn = document.getElementById('theme-toggle');
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            if (themeBtn) themeBtn.innerText = '☀️';
        } else {
            document.body.classList.remove('dark-theme');
            if (themeBtn) themeBtn.innerText = '🌙';
        }
    };

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('dark-theme') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme-pref', newTheme);
        });
    }
    applyTheme(localStorage.getItem('theme-pref'));

    // --- MENU MOBILE ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const spans = menuBtn ? menuBtn.querySelectorAll('span') : [];

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans.forEach(s => s.style.transform = 'none');
                spans[1].style.opacity = '1';
            }
        });
    }

    // Fechar menu ao clicar em links ou fora
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && !navMenu.contains(e.target) && e.target !== menuBtn) {
            navMenu.classList.remove('active');
            spans.forEach(s => s.style.transform = 'none');
            spans[1].style.opacity = '1';
        }
    });

    // --- CARROSSEL ---
    let currentSlide = 0;
    window.moveSlide = (direction) => {
        const track = document.getElementById('carousel-track');
        const slides = document.querySelectorAll('.carousel-item');
        if (!track || slides.length === 0) return;
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    };
    setInterval(() => window.moveSlide(1), 5000);
});