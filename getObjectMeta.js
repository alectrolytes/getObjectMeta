javascript:(function () {
    document.body.appendChild(document.createElement('script')).src = 'https://gitcdn.link/repo/abodelot/jquery.json-viewer/master/json-viewer/jquery.json-viewer.js';
    var head = document.getElementsByTagName('head')[0];
    $(document.createElement('link')).attr({
        type: 'text/css',
        href: 'https://gitcdn.link/repo/abodelot/jquery.json-viewer/master/json-viewer/jquery.json-viewer.css',
        rel: 'stylesheet'
    }).appendTo(head);

    var getPopoverelement = function (content) {
        var html = '<div class="popover-content" style="display: none;"> \
        <div class="meta-info lui-popover" style="height: 70%; width: 70%; top: 70px; left: 100px; z-index: 1000001; position: fixed; overflow: auto;"> \
            <div class="lui-popover__header"> \
                <div class="lui-popover__title"> \
                    <button class="lui-button  lui-popover__button_copy">Copy ObjectID</button> \
                </div> \
            </div> \
            <div class="meta-info-body lui-popover__body" style="overflow: scroll">' + content + '</div> \
                <div class="lui-popover__footer"> \
                    <button class="lui-button  lui-popover__button close-popover">Close</button> \
                </div> \
            </div> \
        </div> \
        </div>';
                return html;
    };

    var getMeta = function (obj) {
        var scope = angular.element(obj).scope();
        console.log(scope);
        scope.model.getProperties()
            .then(function (properties) {
                delete properties['qMetaDef'];
                var propertiesJson = JSON.stringify(properties, null, 4);
                $(".meta-info-body").jsonViewer(properties);

                $('.lui-popover__button_copy').on('click', function (e) {
                    window.prompt("Copy ObjectID to clipboard:", properties.qInfo.qId);
                });

                $('.popover-content').show();
            });
        $('.show-meta').remove();
    };

    $('body').append(getPopoverelement());
    $('.close-popover').on('click', function (e) {
        $('.popover-content').remove();
    });

    var objects = $(".qv-object");
    objects.each(function (i, e) {
        var button = $('<button style="z-index: 1000000; position: fixed; color: white; background-color: red;" class="lui-button show-meta">Show Meta</button>');
        button.css($(e).offset());
        button.on('click', function () {
            getMeta(e);
        });
        $('body').append(button);
    });

})();
