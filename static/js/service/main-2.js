$(document).ready(function() {
    $(window).on("scroll", function() {
        if ($(this).scrollTop() > 100) {
            $("#header").addClass("not-transparent");
        } else {
            $("#header").removeClass("not-transparent");
        }
    });



    $('.love-service').on('click', function() {
        $(this).toggleClass('active');
    });


    $('.menu-trigger').on('click', function() {
        $(this).toggleClass('make-clz');
        $('.menu').slideToggle(700);
        $('.toggle-banner').toggleClass('white-header');
        $('header').toggleClass('fridge-header');
    });


    $('#service-item-1, #service-item-2, #service-item-3').owlCarousel({
        slideSpeed: 600,
        paginationSpeed: 600,
        rewindSpeed: 1000,
        nav: true,
        loop: true,
        margin: 10,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 1
            }
        }
    });

    $('#owl-carousel-single-page').owlCarousel({
        thumbs: true
    });

    // $('.menu ul li').on('click', function(e){

    // 	e.preventDefault()

    // 	// $('#exampleModal').show()
    // 	// $('#exampleModal').addClass('show')

    // 	$('#exampleModal').modal('show')
    // })


    // Other Code

    $('.single-service-faq dd').hide();
    $('dt').on('click', function() {
        $(this).next().slideToggle().siblings('dd').slideUp();
        $(this).find('.fa-angle-down').toggleClass("rote-me");
        $(this).siblings('dt').find('.fa-angle-down').removeClass("rote-me");
    });
    $(".scroll").click(function(event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000);
    });

    $(window).on('load', function() {
        $('.grid').masonry({
            // options
            itemSelector: '.grid-item',
            columnWidth: 30
        })
    })
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true
    })

})

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}