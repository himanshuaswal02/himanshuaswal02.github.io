$(document).ready(function(){
    var contactConfig = (typeof PORTFOLIO_CONFIG !== 'undefined' && PORTFOLIO_CONFIG.contact)
        ? PORTFOLIO_CONFIG.contact
        : { web3formsAccessKey: '', recipientEmail: 'himanshu.aswal002@gmail.com' };

    initThemeToggle();

    function initThemeToggle() {
        var $toggle = $('#theme-toggle');
        if (!$toggle.length) return;

        $toggle.on('click', function () {
            var current = document.documentElement.getAttribute('data-theme') || 'light';
            var next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            document.documentElement.style.backgroundColor = next === 'dark' ? '#0f1826' : '#efe7dc';
            localStorage.setItem('portfolio-theme', next);
        });
    }

    function setMobileNav(open) {
        var $menu = $('.site-header .menu');
        var $icon = $('.nav-toggle i');
        var $toggle = $('.nav-toggle');
        $menu.toggleClass('active', open);
        $icon.toggleClass('fa-bars', !open).toggleClass('fa-times', open);
        $toggle.attr('aria-label', open ? 'Close menu' : 'Open menu');
        $('body').toggleClass('nav-open', open);
    }

    function updateNavbar() {
        var scrolled = window.scrollY > 20;
        $('.site-header').toggleClass('sticky', scrolled || $('body').hasClass('nav-open'));
    }

    $(window).on('scroll', function () {
        updateNavbar();

        if ($('.site-header .menu').hasClass('active')) {
            setMobileNav(false);
        }

        if (window.scrollY > 500) {
            $('.scroll-up-btn').addClass('show');
        } else {
            $('.scroll-up-btn').removeClass('show');
        }
    });
    updateNavbar();

    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        $('html').css("scrollBehavior", "auto");
    });

    $('.site-header .menu li a').click(function(){
        $('html').css("scrollBehavior", "smooth");
        setMobileNav(false);
        updateNavbar();
    });

    $('.nav-toggle').on('click keydown', function(e){
        if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
        if (e.type === 'keydown') e.preventDefault();
        var willOpen = !$('.site-header .menu').hasClass('active');
        setMobileNav(willOpen);
        updateNavbar();
    });

    new Typed(".typing", {
        strings: [
            "high-converting Shopify stores",
            "custom Liquid themes",
            "multi-region e-commerce",
            "pixel-perfect storefronts",
            "scalable online brands"
        ],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true
    });

    new Typed(".typing-2", {
        strings: [
            "scale online",
            "convert visitors",
            "launch faster",
            "grow revenue",
            "go global"
        ],
        typeSpeed: 80,
        backSpeed: 50,
        loop: true
    });

    new Typed(".typing-3", {
        strings: ["Let's build your Shopify store :)"],
        typeSpeed: 80,
        backSpeed: 40,
        loop: true
    });

    renderTestimonials();
    initProjectsSwiper();
    initTestimonialsSwiper();

    function initProjectsSwiper() {
        var el = document.querySelector('.projects-swiper');
        if (!el || typeof Swiper === 'undefined') return;

        new Swiper('.projects-swiper', {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: true,
            grabCursor: true,
            autoplay: false,
            navigation: {
                nextEl: '.projects-swiper .swiper-button-next',
                prevEl: '.projects-swiper .swiper-button-prev'
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 18
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
        });
    }

    function initTestimonialsSwiper() {
        var el = document.querySelector('.testimonials-swiper');
        if (!el || typeof Swiper === 'undefined') return;
        if (!el.querySelector('.swiper-slide')) return;

        new Swiper(el, {
            slidesPerView: 1,
            spaceBetween: 16,
            loop: true,
            grabCursor: true,
            watchOverflow: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            navigation: {
                nextEl: el.querySelector('.swiper-button-next'),
                prevEl: el.querySelector('.swiper-button-prev')
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 18
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            }
        });
    }

    $('#contact-form').on('submit', function(e){
        e.preventDefault();

        var $form = $(this);
        var $status = $('#form-status');
        var $btn = $('#contact-submit');
        var $btnText = $btn.find('.btn-text');
        var $btnLoading = $btn.find('.btn-loading');
        var accessKey = contactConfig.web3formsAccessKey;

        if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
            $status.removeClass('success').addClass('error')
                .text('Email not configured. Add your key in JS/config.js (see JS/config.example.js).');
            return;
        }

        $btn.prop('disabled', true);
        $btnText.attr('hidden', true);
        $btnLoading.removeAttr('hidden');
        $status.removeClass('success error').text('');

        var payload = {
            access_key: accessKey,
            name: $('#contact-name').val(),
            email: $('#contact-email').val(),
            subject: '[' + $('#contact-service').val() + '] ' + $('#contact-subject').val(),
            message: $('#contact-message').val(),
            from_name: 'Portfolio Contact Form',
            replyto: $('#contact-email').val()
        };

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(function(res){ return res.json(); })
        .then(function(data){
            if (data.success) {
                $status.addClass('success').text('Message sent! I\'ll get back to you within 24 hours.');
                $form[0].reset();
            } else {
                throw new Error(data.message || 'Something went wrong.');
            }
        })
        .catch(function(){
            $status.addClass('error').text('Failed to send. Please email me at ' + contactConfig.recipientEmail);
        })
        .finally(function(){
            $btn.prop('disabled', false);
            $btnText.removeAttr('hidden');
            $btnLoading.attr('hidden', true);
        });
    });

    function renderTestimonials() {
        var $container = $('#testimonials-carousel');
        if (!$container.length || typeof PORTFOLIO_DATA === 'undefined') return;

        var html = PORTFOLIO_DATA.testimonials.map(function(t) {
            var stars = '';
            for (var i = 0; i < t.rating; i++) stars += '<i class="fas fa-star"></i>';

            var projectLink = t.storeUrl
                ? '<a href="' + t.storeUrl + '" target="_blank" rel="noopener">' + t.project + '</a>'
                : t.project;

            return (
                '<div class="swiper-slide">' +
                    '<article class="testimonial-card">' +
                        '<div class="testimonial-stars" aria-label="' + t.rating + ' out of 5 stars">' + stars + '</div>' +
                        '<blockquote class="testimonial-quote"><p>' + t.quote + '</p></blockquote>' +
                        '<div class="testimonial-author">' +
                            '<strong>' + t.name + '</strong>' +
                            '<span>' + t.role + '</span>' +
                        '</div>' +
                        '<p class="testimonial-project"><i class="fab fa-shopify" aria-hidden="true"></i> ' + projectLink + '</p>' +
                    '</article>' +
                '</div>'
            );
        }).join('');

        $container.html(html);
    }
});
