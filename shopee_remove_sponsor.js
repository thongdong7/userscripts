// ==UserScript==
// @name         Remove Shopee Sponsor
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://shopee.vn/search*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    setInterval(() => {
        [...document.getElementsByTagName("div")].filter(item => item.innerText.trim().startsWith('Tài Trợ')).map(item => item.parentNode.parentNode.parentNode.parentNode.parentNode).forEach(item => item.parentNode.removeChild(item))
    }, 1000);
})();
