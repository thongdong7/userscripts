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

    function remove() {
        const items = [...document.getElementsByTagName("div")]
            .filter(item => item.innerText.trim().startsWith('Tài Trợ'));

        //    .map(item => item)
        //for (let i=0;
        //const item = items[items.length - 1];
        for (const item of items){
            const node = item.parentNode.parentNode;
            if (node ==null || node.tagName.toLowerCase() !== 'div') {
                continue;
            }

            if (!node.getAttribute('class')?.startsWith('_')) {
                continue;
            }
            console.log(node);
            node.parentNode.removeChild(node);
            //            .forEach(item => item.parentNode.parentNode.removeChild(item.parentNode))
        }
    }
    // Your code here...
    setInterval(() => {
        remove();
    }, 1000);
})();
