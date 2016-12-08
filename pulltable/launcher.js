/**
 * Created by bruce on 2016-11-06.
 */

browser.tabs.executeScript({
    file: '/pulltable/js/jquery.js'
}).then(
    function (result) {
        console.log(result);
    },

    function (error) {
        console.log(error);
    }
);

browser.tabs.executeScript(null, {
    file: '/pulltable/js/html2canvas.js'
}).then(
    function (result) {
        console.log(result);
    },

    function (error) {
        console.log(error);
    }
);

browser.tabs.executeScript(null, {
    file: '/pulltable/js/highestzindex.js'
}).then(
    function (result) {
        console.log(result);
    },

    function (error) {
        console.log(error);
    }
);

browser.tabs.executeScript(null, {
    file: '/pulltable/js/cropinterface.js'
}).then(
    function (result) {
        console.log(result);
    },

    function (error) {
        console.log(error);
    }
);

browser.tabs.executeScript(null, {
    file: '/pulltable/js/main.js'
}).then(
    function (result) {
        console.log(result);
    },

    function (error) {
        console.log(error);
    }
);