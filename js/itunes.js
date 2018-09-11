var freeApps;
var paidApps;

function getTopApps() {
    getFreeApps();
    getPaidApps();

    
}

function getPaidApps() {
    var settings = {
        "async": true,
        "url": "/paid-apps",
        "method": "GET",
    }
    $.ajax(settings).done(function (response) {
        console.log(response);

        freeApps = response.feed.results;

        setAppStore();
    });
}

function getFreeApps() {
    var settings = {
        "async": true,
        "url": "/free-apps",
        "method": "GET",
    }
    $.ajax(settings).done(function (response) {
        console.log(response);

        freeApps = response.feed.results;

        setAppStore();
    });
}

function setAppStore() {
    console.log(freeApps);
    console.log(paidApps);
    if (freeApps && paidApps) {
        var arrayCombined = $.map(freeApps, function(v, i) {
            return [v, paidApps[i]];
        });
        console.log(arrayCombined);
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