$(document).ready(function() {
    initNavbar();
})
function initNavbar () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 20) {
            $('nav').removeClass('navbar-trans', 300)
            $('nav').removeClass('navbar-trans-dark', 300)
        } else {
            $('nav:not(.mobile-nav)').addClass('navbar-trans', 300)
            $('nav').removeClass('navbar-small', 300)
            if($('nav').hasClass('trans-helper')) {
                $('nav:not(.mobile-nav)').addClass('navbar-trans-dark', 300)
            }
        }
        $('nav:not(.navbar-fixed-top)').removeClass('navbar-trans navbar-small navbar-trans-dark')
    })
}
