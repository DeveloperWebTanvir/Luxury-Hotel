(function($) {

    const wdtImageBoxWidgetHandler = function($scope) {
        const instance = new wdtImageBoxWidgetHandlerInit($scope);
        if ($scope.find('.wdt-image-box-holder').data('settings')) {
            const settings = $scope.find('.wdt-image-box-holder').data('settings');
            if (settings['enable_popup']) {
                instance.init();
            }

            if (settings['enable_hover_class']) {
                instance.hover_active_class();
            }
        }

        let content_item = $scope.find('.wdt-rc-template-image-with-content.wdt-image-active-class > .wdt-content-item');

        $scope.find('.wdt-rc-template-image-with-content.wdt-image-active-class > .wdt-content-item:first-child').addClass('wdt-active');

        content_item.each(function() {

            $(this).mouseover(function() {
                if (!($(this).hasClass('wdt-active'))) {
                    $scope.find('.wdt-rc-template-image-with-content.wdt-image-active-class > .wdt-content-item').removeClass('wdt-active');
                    $(this).addClass('wdt-active');
                }
            });

        });

    };

    const wdtImageBoxWidgetHandlerInit = function($scope) {

        const $self = this;
        $self.init = function() {

            const $image_box_content_repeater = $scope.find('.wdt-content-image-wrapper');
            $image_box_content_repeater.each(function() {

                const $this_image_box = $(this);
                const $image_url = $this_image_box.find('img').attr('src');
                $self.onClickInit($this_image_box, $image_url);

            });

        };

        $self.onClickInit = function($this_image_box, $image_url) {

            $this_image_box.magnificPopup({
                items: {
                    src: $image_url,
                    type: 'image',
                },
                removalDelay: 500,
                showCloseBtn: true,
                enableEscapeKey: true,
                closeOnBgClick: true,
                mainClass: 'wdt-image-box-popup wdt-popup-box-window',
            });

        };

        $self.hover_active_class = function() {

            var $get_scope_name = $scope.find('.wdt-image-box-holder').hasClass('wdt-carousel-holder');

            if ($get_scope_name) {

                var image_box_wdt_swiper = $scope.find('.wdt-image-box-holder .wdt-image-box-container .wdt-image-box-wrapper .swiper-slide');

                $scope.find('.wdt-image-box-holder .wdt-image-box-container .wdt-image-box-wrapper .swiper-slide:first-child').addClass('wdt-active');
                image_box_wdt_swiper.mouseover(function() {
                    if (!($(this).hasClass('wdt-active'))) {
                        $scope.find('.wdt-image-box-holder .wdt-image-box-container .wdt-image-box-wrapper .swiper-slide').removeClass('wdt-active');
                        $(this).addClass('wdt-active');
                    }
                });

            } else {

                var image_box_wdt_column = $scope.find('.wdt-image-box-holder .wdt-column-wrapper .wdt-column');

                $scope.find('.wdt-image-box-holder .wdt-column-wrapper .wdt-column:first-child').addClass('wdt-active');
                image_box_wdt_column.mouseover(function() {
                    if (!($(this).hasClass('wdt-active'))) {
                        $scope.find('.wdt-image-box-holder .wdt-column-wrapper .wdt-column').removeClass('wdt-active');
                        $(this).addClass('wdt-active');
                    }
                });

            }

        };

    };

    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-image-box.default', wdtImageBoxWidgetHandler);
    });

})(jQuery);