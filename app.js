jQuery(document).ready(function($) {
    'use strict';

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    });

    window.addEventListener('scroll', function() {
        var fixedNavBar = $('.header-navbar'),
            nav = $('.nav-sticky-top'),
            btn = $('.btn-nav');
        if (window.scrollY > 50) {
            fixedNavBar.addClass('sticky-top bg-dark shadow slideInDown');
            // nav.removeClass('nav-white');
            // btn.removeClass('btn-white').addClass('btn-outline-primary');
        } else {
            fixedNavBar.removeClass('bg-dark shadow slideInDown');
            // nav.addClass('nav-white');
            // btn.addClass('btn-white').removeClass('btn-outline-primary');
        }
    });

    /*=============================
        [01. Carousel]
    ===============================*/

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 5; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1.owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        dots: false,
        lazyLoad: true
    }).on('changed.owl.carousel', syncPosition);

    sync2.on('initialized.owl.carousel', function() {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items: slidesPerPage,
            // dots: true,
            margin: 10,
            // nav: true,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate: 100,
            responsive: {
                0: {
                    items: 3,
                    // nav: true
                },
                480: {
                    items: 4,
                    // nav: true
                },
                768: {
                    items: 5,
                    // nav: true,
                    // loop: false
                }
            }
        }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - (el.item.count / 2) - .5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }

        //end block

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });

    $('.carousel-4-items').owlCarousel({
        items: 4,
        loop: true,
        // autoplay: true,
        dots: false,
        margin: 10,
        itemsScaleUp: true,
        nav: true,
        // center: true,
        // navContainer: '.owl-stage-outer'
        navigationText: [
            "<i class='fa fa-chevron-left'></i>",
            "<i class='fa fa-chevron-right'></i>"
        ],
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            480: {
                items: 3,
                nav: true
            },
            1366: {
                items: 4,
                nav: true,
                // loop: false
            }
        }
    });

    $('.carousel-7-items').owlCarousel({
        items: 7,
        loop: true,
        // autoplay: true,
        dots: false,
        margin: 10,
        itemsScaleUp: true,
        responsive: {
            0: {
                items: 2,
                nav: true
            },
            480: {
                items: 3,
                nav: true
            },
            768: {
                items: 5,
                nav: true,
                // loop: false
            },
            1024: {
                items: 7,
                nav: true,
                // loop: false
            }
        }

        // lazyLoad: true
    });

    /*=============================
        [03. Header]
    ===============================*/
    $(document).on('click', '.toggle-menu, .close-menu', function() {
        $('.main-nav-d, .navbar-mobile').toggle();
    });

    $(document).on('click', '.btn-categories-toggle', function() {
        $('.categories-dropdown').slideToggle();
    });

    /*=============================
        [04. Cart]
    ===============================*/
    $(document).on('click', '.btn-cart-offcanvas', function(e) {
        e.preventDefault();

        $('.cart-offcanvas').addClass('show');
        $('.cart-ovelay').fadeIn();
    });

    $(document).on('click', '.close-cart-offcanvas, .cart-ovelay', function(e) {
        e.preventDefault();

        $('.cart-offcanvas').removeClass('show');
        $('.cart-ovelay').fadeOut();
    });

    $(document).on('click', '.btn-mins', function() {
        var input = $(this).parent().find('.form-control'),
            oldVal = Number(input.val());

        if (input.val() > 1) {
            input.val(oldVal - 1)
        }
        console.log(input.val())
    });

    $(document).on('click', '.btn-plus', function() {
        var input = $(this).parent().find('.form-control'),
            oldVal = Number(input.val());

        input.val(oldVal + 1)

        console.log(input.val())
    });

    $(document).on('click', '.calc-shipping-btn', function(e) {
        $('.calculate-shipping').toggle();
        e.preventDefault();
    });

    /*=============================
        [05. Helper]
    ===============================*/

    $(document).on('click', '.lc-btn-toggle', function(e) {
        // e.preventDefault();
        var toggleDiv = $(this).data('lc-toggle');

        $(toggleDiv).slideToggle();
    });

    $(document).on('click', '.lc-btn-accordion', function(e) {
        // e.preventDefault();
        var toggleDiv = $(this).data('accordion-content')
        parent = $(this).data('lc-accordion-parent');

        $(parent).find('.lc-accordion-content').slideUp();
        $(toggleDiv).slideDown();
    });

    setInterval(function() {
            $(".recent-purchase").toggleClass('show');
        },
        10000
    );

    $(document).on('click', '.purchase-close', function() {
        $(".recent-purchase").removeClass('show');
    });

    $(document).on('click', '.custom-order', function() {
        var tabID = $(this).data('bs-target');

        $('[data-bs-target]').removeClass('active');
        $("[data-bs-target='" + tabID + "']").addClass('active');

        $('.tab-pane').removeClass('show active');
        $(tabID).addClass('active show');
    });

    $(document).on('change', '.password-checkbox', function() {
        $('.change-password').toggleClass('hidden');
    });

    $(document).on('click', '.mobile-menu .nav-link', function(e) {
        e.preventDefault();
        var btn = $(this);

        btn.find('.arrow').toggleClass('rotate-90');
        btn.next('ul').slideToggle();
    });

    $(document).on('click', '.open-side-menu', function(e) {
        e.preventDefault();
        $('.side-menu').addClass('active');
    });

    $(document).on('click', '.close-side-menu', function(e) {
        e.preventDefault();
        $('.side-menu').removeClass('active');
    });

    /*=============================
        [06. Plugins]
    ===============================*/

    $(".nicscroll").niceScroll();

});

window.onload = function() {
    //hide the preloader
    var perloader = $(".perloader-wrapper");
    if (perloader.length > 0) {

        document.querySelector(".perloader-wrapper").style.display = "none";
    }
}