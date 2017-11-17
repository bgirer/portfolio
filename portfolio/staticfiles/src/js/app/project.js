$(function () {
    var controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({triggerElement: "#project-scope", reverse: true})
        .on('enter', function () {
            var windowWidth = $(window).width();
            if (windowWidth > 991) {
                $('#project-navigation').show('slide', {direction: 'left'}, 300);
                $('.project-details').addClass('pushed', 300, 'swing', function () {
                    $('.solution-images-carousel').slick('setPosition');
                });
            }
        })
        .on('leave', function () {
            var windowWidth = $(window).width();
            if (windowWidth > 991) {
                $('#project-navigation').hide('slide', {direction: 'left'}, 300);
                $('.project-details').removeClass('pushed', 300, 'swing', function () {
                    $('.solution-images-carousel').slick('setPosition');
                });

            }
        })
        // .addIndicators() // add indicators (requires plugin)
        .addTo(controller);

    // Handle active/inactive intrapage navigation links
    var $projectLinks = $('.project-navigation__links a');
    $projectLinks.each(function () {
        var $this = $(this);
        var targetElementId = $(this).data('target');
        $this.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: $(targetElementId).offset().top - 100}, 'fast');
            $this.blur();
        });
        new ScrollMagic.Scene({
            triggerElement: targetElementId,
            reverse: true,
            duration: $(targetElementId).height() + 59
        })
            .on('enter', function () {
                $this.addClass('active');
            })
            .on('leave', function () {
                $this.removeClass('active')
            })
            .addTo(controller);
    });

    // Handle lightbox elements
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox({
            alwaysShowClose: true,
        });
    });
    // Initiate slick sliders where necessary
    var $solutionSliders = $('.solution-images-carousel');
    if ($solutionSliders.length) {
        $solutionSliders.each(function () {
            $(this).slick({
                dots: true,
                slidesToScroll: 1,
                slidesToShow: 1,
                arrows: false,
                centerMode: true,
                centerPadding: '0px'
            });
        })
    }
});