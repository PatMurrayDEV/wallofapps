var freeApps;
var paidApps;

function getTopApps() {
    // var settings = {
    //     "async": true,
    //     "url": "apps.json",
    //     "method": "GET",
    // }
    // $.ajax(settings).done(function (response) {
    //     console.log(response);

    //     var apps = response.feed.results;

    //     layOutScreen(apps);
    // });

    $.getJSON("https://rss.itunes.apple.com/api/v1/us/ios-apps/top-free/all/50/explicit.json", function(response){
        //response data are now in the result variable

        freeApps = response.feed.results;
        saveApps([apps[0]]);
    });

    $.getJSON("https://rss.itunes.apple.com/api/v1/us/ios-apps/top-paid/all/50/explicit.json", function(response){
        //response data are now in the result variable

        paidApps = response.feed.results;
        saveApps([apps[0]]);
    });
}

function setAppStore() {
    if (freeApps && paidApps) {
        var arrayCombined = $.map(freeApps, function(v, i) {
            return [v, paidApps[i]];
        });
        layOutScreen(arrayCombined);
    }
}

function getAppWithId(appID) {
    $.getJSON("https://itunes.apple.com/lookup?callback=?&id=" + appID, function(response){
        //response data are now in the result variable

        var apps = response.results;
        saveApps([apps[0]]);
    });
}

function callback(content){
    console.log(content);
}

function saveApps(array) {
    var old = JSON.parse(localStorage.getItem("apps"));
    if(old === null) old = [];
    var newData = old.concat(array);
    localStorage.setItem("apps", JSON.stringify(newData));
    getApps();
}

function getApps() {
    var localapps = JSON.parse(localStorage.getItem("apps"));
    if (localapps && localapps.length > 0) {
        layOutScreen(localapps);
    } else {
        getTopApps()
    }
}