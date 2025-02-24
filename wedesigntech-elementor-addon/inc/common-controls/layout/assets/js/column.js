(function($) {

    const wdtColumnWidgetHandler = function($scope, $) {

        const $scopeColumn = $scope.find('.wdt-column-wrapper');
        const $deviceMode = elementorFrontend.getCurrentDeviceMode();

        if ($scopeColumn.data('column-settings')) {
            const $customDevices = $scopeColumn.data('column-settings');
            const $get_user_devices = ($customDevices['columnDevices'] !== undefined) ? ($customDevices['columnDevices']) : '';

            if ($get_user_devices != undefined) {
                if ($get_user_devices.indexOf($deviceMode) > -1) {
                    $scopeColumn.addClass('wdt-snap-scroll');
                    // $('.wdt-column-pagination.wdt-snap-scroll-pagination').css({ 'display': 'block' });
                } else {
                    $scopeColumn.removeClass('wdt-snap-scroll');
                    // $('.wdt-column-pagination.wdt-snap-scroll-pagination').css({ 'display': 'none' });
                }
            }
        }

        $(document).ready(function() {
            doLayout();
        });

        function doLayout() {
            var $column_width = $scope.find('.wdt-column-wrapper .wdt-column').width();

            var $widget_module_id = $scopeColumn.attr('id');
            // script for pagination button
            $('.wdt-snap-scroll-pagination .wdt-pagination-prev.' + $widget_module_id + '').click(function() {
                document.getElementById($widget_module_id).scrollBy({
                    left: -$column_width,
                    behavior: 'smooth'
                });
            });

            $('.wdt-snap-scroll-pagination .wdt-pagination-next.' + $widget_module_id + '').click(function() {
                document.getElementById($widget_module_id).scrollBy({
                    left: $column_width,
                    behavior: 'smooth'
                });
            });
        }

    };

    $(window).on('elementor/frontend/init', function() {

        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-image-box.default', wdtColumnWidgetHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-icon-box.default', wdtColumnWidgetHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-advanced-carousel.default', wdtColumnWidgetHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-counter.default', wdtColumnWidgetHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-instagram.default', wdtColumnWidgetHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-team.default', wdtColumnWidgetHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-testimonial.default', wdtColumnWidgetHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-events.default', wdtColumnWidgetHandler);
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-donations.default', wdtColumnWidgetHandler);

    });

})(jQuery);