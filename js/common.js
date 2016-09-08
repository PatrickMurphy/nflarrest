function setupFacebook() {
    console.log('FB Setup');
    window.fbAsyncInit = function () {
        FB.init({
            appId: '563956043742586',
            xfbml: true,
            version: 'v2.4'
        });
        FB.Event.subscribe('edge.create', function (targetUrl) {
            ga('send', 'social', 'facebook', 'like', targetUrl);
        });

        FB.Event.subscribe('edge.remove', function (targetUrl) {
            ga('send', 'social', 'facebook', 'unlike', targetUrl);
        });

        FB.Event.subscribe('message.send', function (targetUrl) {
            ga('send', 'social', 'facebook', 'send', targetUrl);
        });
    };

    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
}

function setupTwitter() {
    console.log('twitter setup');
    window.twttr = (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
            t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function (f) {
            t._e.push(f);
        };

        return t;
    }(document, "script", "twitter-wjs"));


    twttr.ready(function (twttr) {
        twttr.events.bind('tweet', function (intent_event) {
            if (intent_event) {
                var opt_pagePath = window.location.href;
                if (intent_event.target && intent_event.target.nodeName == 'IFRAME') {
                    opt_pagePath = extractParamFromUri(intent_event.target.src, 'url');
                }
                ga('send', 'social', 'twitter', 'tweet', opt_pagePath);
                console.log('thanks for sharing', opt_pagePath);
            }
        });
    });
}

function update_hash() {
    pageID = window.location.hash || '#!ID Not Set';
    pageID = pageID.replace('#!', '');
    pageID = pageID.replace('#', '');
    $('#pageTitle').append(pageID);
}

function extractParamFromUri(uri, paramName) {
    if (!uri) {
        return;
    }
    var regex = new RegExp('[\\?&#]' + paramName + '=([^&#]*)');
    var params = regex.exec(uri);
    if (params != null) {
        return unescape(params[1]);
    }
    return;
}
