// ==UserScript==
// @name         Websosanh
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://websosanh.vn/*/*/*/direct.htm
// @match        https://websosanh.vn/*/*/*/direct.htm
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.pageOptions={}
    const form = document.getElementsByTagName("form")[0];
    console.log(form);

    const action = form.getAttribute("action");
    //url=https%3A%2F%2Ftiki.vn%2Fvoi-hoa-sen-tam-dung-cao-cap-ye15-p6093963.html%3F
    //form.parentNode.removeChild(form);

    var regex = /url=(.*)(%3F)?/;
    console.log('action', action);
    var found = action.match(regex);
    console.log('found', found);
    let url;
    if (found) {
        url = found[1];
    }
    console.log('url', url);
    if (url != null && url != '') {
        url = unescape(url);
        console.log('url2', url);
        window.location = url;
    } else {
        console.log('submit');
        form.submit();
    }
})();
