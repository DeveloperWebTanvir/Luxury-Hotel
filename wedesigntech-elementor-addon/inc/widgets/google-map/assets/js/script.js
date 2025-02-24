(function($) {

    const wdtGoogleMapWidgetHandler = function($scope, $) {

        const $this_item = $scope.find('.wdt-google-map-wrapper');
        const $map_item = $this_item.find('.wdt-google-map');
        const $options = $map_item.data('options');
        const $markers = $map_item.data('markers');
        const $iw_max_width = $map_item.data('iw-max-width');
        let $animation = $map_item.data('marker-animation');

        $options['styles'] = JSON.parse($options['styles']);

        const $map = new google.maps.Map($map_item[0], $options);

        // Markers

        if ($animation == 'drop') {
            $animation = google.maps.Animation.DROP;
        } else if ($animation == 'bounce') {
            $animation = google.maps.Animation.BOUNCE;
        } else if ($animation == 'soft-beat') {
            var $overlayView = new google.maps.OverlayView();
            $overlayView.draw = function() {
                this.getPanes().markerLayer.id = 'wdtMarkerLayerSoftBeat';
            };
            $overlayView.setMap($map);
        }

        $markers.forEach(function($item) {

            let $icon = '';

            if (typeof($item.icon) != 'undefined') {
                $icon = {
                    url: $item.icon,
                    scaledSize: new google.maps.Size($item.icon_size, $item.icon_size),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(0, 0)
                };
            }

            const $marker = new google.maps.Marker({
                position: new google.maps.LatLng($item.latitude, $item.longitude),
                map: $map,
                title: $item.title,
                icon: $icon,
                animation: $animation,
                optimized: false
            });

            if ($item.show_info_window == 'yes') {

                let $content = '';
                if ($item.title.length) {
                    $content += '<div class="wdt-google-map-info-title">' + $item.title + '</div>';
                }

                if ($item.desc.length) {
                    $content += '<div class="wdt-google-map-info-desc">' + $item.desc + '</div>';
                }

                if ($item.window_image.url !== "") {
                    $content += '<div class="wdt-google-map-info-window-image" style="background-image: url(' + $item.window_image.url + ');"></div>';
                }

                if ($content.length) {
                    $content = '<div class="wdt-google-map-info-container">' + $content + '</div>';
                }

                if ($iw_max_width !== '') {
                    var $infowindow = new google.maps.InfoWindow({
                        content: $content,
                        maxWidth: parseInt($iw_max_width)
                    });
                } else {
                    var $infowindow = new google.maps.InfoWindow({
                        content: $content
                    });
                }

                if ($item.load_info_window == 'load') {
                    $infowindow.open($map, $marker);
                }

                $marker.addListener('click', function() {
                    $infowindow.open($map, $marker);
                });

            }
        });

        // Marker selection change

        const $map_item_content = [...$this_item.find('.wdt-google-map-mark-item')];

        $map_item_content[0].classList.add('wdt-active');

        $map_item_content.forEach(($contentItem) => {

            var $id = $contentItem.id;

            $contentItem.addEventListener('click', (event) => {

                let $this = event.target;
                let $toggle_content = $this.querySelector('.wdt-google-map-marker-content-item');

                var $id = $this.id;
                const $selectedMarker = $markers.filter($marker => ($id === $marker['key']))[0];
                $map.setCenter({
                    lat: +$selectedMarker.latitude,
                    lng: +$selectedMarker.longitude
                });

                let $content_main = $this.closest('.wdt-google-map-marker-content-selection');
                let $items_content = [...$content_main.querySelectorAll('.wdt-google-map-marker-content-item')];

                $items_content.forEach((wdt_item) => {
                    wdt_item.style.display = 'none';
                    wdt_item.parentElement.classList.remove('wdt-active');
                });

                $toggle_content.style.display = 'block';
                $toggle_content.parentElement.classList.add('wdt-active');

                event.stopPropagation()

            });

        });


        // $scope.find('.wdt-google-map-marker-content-selection').on('change', function() {

        //   var $id = $(this).val();
        //   const $selectedMarker = $markers.filter($marker => ($id === $marker['key']))[0];
        //   $map.setCenter({ lat: +$selectedMarker.latitude, lng: +$selectedMarker.longitude });

        //   $(this).parents('.wdt-google-map-marker-content-wrapper').find('.wdt-google-map-marker-content-item').hide();
        //   $(this).parents('.wdt-google-map-marker-content-wrapper').find('#wdt-google-map-marker-content-'+$id).show();

        // });

    };

    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/wdt-google-map.default', wdtGoogleMapWidgetHandler);
    });

})(jQuery);