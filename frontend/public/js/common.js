$(function() {
    var b = 20;
    $(window).scroll(function() {
        var c = a();
        if (c >= b) {
            $(".i-header").addClass("sticky-header")
        } else {
            $(".i-header").removeClass("sticky-header")
        }
    });

    function a() {
        return window.pageYOffset || document.documentElement.scrollTop
    }
});

$(".i-return-to-top").click(function() {
    $("body,html").animate({
        scrollTop: 0
    }, 500)
});

$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {
        $(".i-return-to-top").fadeIn(200)
    } else {
        $(".i-return-to-top").fadeOut(200)
    }
});


jQuery(document).ready(function() {
    jQuery("#loader2").fadeOut(1000);
});

//initialise tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})