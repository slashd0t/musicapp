(function () {

    "use strict";

    var toggle = true;

    function setTemplate(templateId) {

        var deferred = new $.Deferred();

        $("#notifications-container").load('/static/templates/' + templateId + '.html', function (data) {
                var element = $("#notifications-container");
                element.fadeOut(function () {
                    element.html(data);
                    deferred.resolve();
                });
            },
            function () {
                deferred.reject();
            }
        );

        return deferred.promise();
    }

    function isDateBetween(date, startDate, endDate) {
        if (startDate.diff(date) > 0) {
            return false;
        }

        if (endDate.diff(date) < 0) {
            return false;
        }

        return true;
    }

    var _currentDisplayedItem = null;


    function shouldDisplayItem(item) {

        var now = moment();
        var validTo = moment(item.scheduling.validTo);
        var validFrom = moment(item.scheduling.validFrom);

        if (!isDateBetween(now, validFrom, validTo)) {
            return false;
        }

        if (item.scheduling.days.all) {

            var start = now.startOf('day').add(moment.duration(item.scheduling.days.all.start));
            var end = now.startOf('day').add(moment.duration(item.scheduling.days.all.end));

            if (!isDateBetween(now, start, end)) {
                return false;
            }

        }

        var day = now.day().toString();

        if (item.scheduling.days[day]) {

            var start = now.startOf('day').add(moment.duration(item.scheduling.days[day].start));
            var end = now.startOf('day').add(moment.duration(item.scheduling.days[day].end));

            if (!isDateBetween(now, start, end)) {
                return false;
            }

        }

        return true;
    }

    function showItem(item) {

        console.log('showing', item.name);
        _currentDisplayedItem = item;

        setTemplate(item.template)
            .then(function () {

                var content = $("#content");

                for (var i in item.content) {
                    var contentMessage = item.content[i];

                    var p = $('<p />');
                    p.html(contentMessage);

                    content.append(p);
                }

                var images = $("#images");

                var counter = new Date().getMilliseconds();

                for (var i in item.images) {
                    var image = item.images[i];

                    var img = $('<img />');
                    img.attr('src', image + '?' + counter++);

                    images.append(img);
                }

                $("#notifications-container").fadeIn();

            });
    }

    function hideItem(item) {
        console.log('hiding', item.name);
        _currentDisplayedItem = null;
        $("#notifications-container").fadeOut();
    }

    function processItem(item) {
        var deferred = new $.Deferred();

        var shouldDisplay = shouldDisplayItem(item);
        if (shouldDisplay) {
            showItem(item);

            setTimeout(function () {

                console.log('timeout', item.duration * 1000)

                hideItem(item);
                deferred.resolve();
            }, item.duration * 1000);

        } else {
            deferred.resolve();
        }

        return deferred.promise();
    }

    function processItems(items) {

        var i = -1;

        var getNextItem = function () {
            if (!items.length) {
                return;
            }

            i = (i + 1) % (items.length);

            return items[i];
        };

        var itemChain = function () {
            var item = getNextItem();
            if (item) {
                processItem(item).then(itemChain);
            }
        };

        itemChain();
    }

    $(function () {

        function gup(name, url) {
            if (!url) url = location.href;
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(url);
            return results == null ? null : results[1];
        }

        var screen_id = gup("screen", location.href);

        $.ajax({
            url: 'getMessagesOfScreen',
            type: 'get',
            data: {
                screen: screen_id
            },
            dataType: 'json',
            success: function (response) {
                processItems(response);
            },
            error: function (err) {
                console.log(err);
            }
        });


    });

})();