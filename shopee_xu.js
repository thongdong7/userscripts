// ==UserScript==
// @name         ShopeeXu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://shopee.vn/*
// @grant        none
// ==/UserScript==

function cleanUp() {
    // remove popup at homepage
    const ads = document.getElementsByClassName("shopee-popup shopee-modal__transition-enter-done")[0];
    ads && ads.remove();

    // Remove notification
    const thongbao = document.getElementsByClassName("stardust-popover")[0];
    if (thongbao.innerText === "Thông Báo") {
        thongbao.remove();
    }
}

(function () {
  "use strict";

  fetch("https://shopee.vn/mkt/coins/api/v2/checkin", {
    headers: {
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-api-source": "pc",
      "x-requested-with": "XMLHttpRequest",
      "x-shopee-language": "vi",
    },
    referrer: "https://shopee.vn/shopee-coins",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "POST",
    mode: "cors",
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

    setInterval(cleanUp, 1000);
})();
