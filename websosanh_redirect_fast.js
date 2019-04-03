// ==UserScript==
// @name         Websosanh
// @copyright    Internet
// @license      MIT
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://websosanh.vn/*/*/*/direct.htm
// @grant        none
// ==/UserScript==

// ==OpenUserJS==
// @author       You
// ==/OpenUserJS==
(function() {
    'use strict';

    // Your code here...
    const form = document.getElementsByTagName("form")[0];
    form.submit();
})();
