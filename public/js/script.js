//Header Change


//Slider change avatar
$("#right").click(function(){
    var active_slide = $('.carousel-inner .item.active');
    var after_active = $(active_slide).next();
    if ($(".carousel-inner").find(".item").hasClass("active")) {
        $('.avatar-wrapper .avatar img').attr('src', $(after_active).attr('data-img'));
    }
});
$("#left").click(function(){
    var active_slide = $('.carousel-inner .item.active');
    var after_active = $(active_slide).prev();
    if ($(".carousel-inner").find(".item").hasClass("active")) {
        $('.avatar-wrapper .avatar img').attr('src', $(after_active).attr('data-img'));
    }
});
// Scroll btn
$(".btn-quote").click(function() {
    $('html, body').animate({
        scrollTop: $(".section-seven").offset().top
    }, 2000);
});

// Scroll bottom
$("#btn_learn").click(function() {
    $('html, body').animate({
        scrollTop: $(".section-tow").offset().top
    }, 2000);
});

$("#btn_learn_more").click(function() {
    $('html, body').animate({
        scrollTop: $(".section-tow").offset().top
    }, 2000);
});

//Scroll top
$(".top-scroll").click(function() {
    $('html, body').animate({
        scrollTop: $("html, body").offset().top
    }, 2000);
});

//Mob menu
$(document).ready(function(){
    $(".mob-menu-icon").click(function(){
        $(".nav").slideToggle();
    });
});

//Change collapse icon
$(document).ready(function () {
    $('.collapse').on('shown.bs.collapse', function(){
        $(this).parent().find(".fa-plus-circle").removeClass("fa-plus-circle").addClass("fa-minus-circle");
    }).on('hidden.bs.collapse', function(){
        $(this).parent().find(".fa-minus-circle").removeClass("fa-minus-circle").addClass("fa-plus-circle");
    });
});

$(document).ready(function () {
    // $(document).on("scroll", onScroll);

    //smoothscroll
    $('.nav ul li a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        $('.nav ul li a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            // $(document).on("scroll", onScroll);
        });
    });
});

// function onScroll(event){
//     var scrollPos = $(document).scrollTop();
//     $('.nav ul li a').each(function () {
//         var currLink = $(this);
//         console.log(currLink);
//         var refElement = $(currLink.attr("href"));
//         if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
//             //$('.nav ul li a').removeClass("active");
//             currLink.addClass("active");
//         }
//         else{
//             currLink.removeClass("active");
//         }
//     });
// }
