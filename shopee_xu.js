// ==UserScript==
// @name         ShopeeXu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://shopee.vn/**
// @grant        none
// ==/UserScript==

function removeAll(collection) {
    [...collection].forEach(node => node.remove());
}

function cleanUp() {
    // remove popup at homepage
    document.getElementsByClassName("shopee-popup__close-btn")[0]?.click()

    // remove game
    removeAll(document.getElementsByClassName("shopee-floating-icons__wrapper"));

    // Remove notification
    const thongbao = document.getElementsByClassName("stardust-popover")[0];
    if (thongbao.innerText === "Thông Báo") {
        thongbao.remove();
    }

    // Create link
    if (!document.getElementById("donmua")) {
        const donMua = document.createElement("li");
        donMua.setAttribute("id", "donmua");
        donMua.innerHTML = `<a href="https://shopee.vn/user/purchase/">Đơn mua</a>`;

        document.getElementsByClassName("navbar__links")[0]?.appendChild(donMua);
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
