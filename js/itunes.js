function getTopApps() {
    var settings = {
        "async": true,
        "url": "apps.json",
        "method": "GET",
    }
    $.ajax(settings).done(function (response) {
        console.log(response);

        var apps = response.feed.results;

        layOutScreen(apps);
    });
}

function getAppWithId(appID) {
    var url = "/app/" + appID
    var settings = {
        "async": true,
        "url": url,
        "method": "GET",
    }
    $.ajax(settings).done(function (response) {
        console.log(response);

        var apps = response.feed.results;

        saveApps([apps[0]]);
    });
}

function saveApps(array) {
    var old = localStorage.getItem("apps");
    if(old === null) old = [];
    var newData = old.concat(array);
    localStorage.setItem("apps", newData);
}

function getApps() {
    var localapps = localStorage.getItem("apps");
    if (localapps.length > 0) {
        layOutScreen(apps);
    }
    return localStorage.getItem("apps");
}