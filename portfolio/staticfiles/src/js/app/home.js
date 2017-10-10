$(function () {
    // Handle the background animation
    $(window).scroll(function () {
        var hT = $('#home__work-bg-scroll-target').offset().top,
            hH = $('#home__work-bg-scroll-target').outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
        if (wS > (hT + hH - wH)) { //scroll position > #foo's offset + #foo's height - window height
            $('.work-container__inner').parent().attr('id', 'home__work-container');
        } else {
            $('.work-container__inner').parent().attr('id', '');
        }
    });


    // Magic scroll for the work projects
    var controller = new ScrollMagic.Controller();
    $(function () {
        // wait for document ready
        // build scene
        var scene1 = new ScrollMagic.Scene({
            triggerElement: ".work-container",
            triggerHook: "onLeave",
            duration: $(".work-container__inner").offsetHeight - $(".work-container .list").offsetHeight - 48,
            loglevel: 0
        })
            .setPin(".work-container .list")
            .addTo(controller);

        var scene2 = new ScrollMagic.Scene({
            triggerElement: ".work-container",
            triggerHook: "onLeave",
            duration: $(".work-container__inner").offsetHeight - $(".work-container .list").offsetHeight - 48,
            loglevel: 0
        })
            .setPin(".work-container__box")
            .addTo(controller);

    });

// Handle active/inactive intrapage project links
    var $projectLinks = $('#project-nav-links').find('a');
    $projectLinks.each(function () {
        var $navLink = $(this);
        var targetElementId = $(this).data('target');
        $navLink.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: $(targetElementId).offset().top - 100}, 'fast');
            $navLink.blur();
        });
        new ScrollMagic.Scene({
            triggerElement: targetElementId,
            reverse: true,
            duration: $(targetElementId).height() + 39
        })
            .on('enter', function () {
                $navLink.addClass('active');
            })
            .on('leave', function () {
                $navLink.removeClass('active')
            })
            .addTo(controller);
    });

// Slick slider for mobile project previews
    $('#work-container__mobile-slides').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false
    });
});
