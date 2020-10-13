// ==UserScript==
// @name         ShopeeXu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://shopee.vn/**
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// ==/UserScript==

const mainHost = "https://shopee.vn/";
let xu = "--";
let showSponsor = false;

function removeAll(collection) {
  [...collection].forEach((node) => node.remove());
}

function addDonMua() {
  if ($("#donmua").length) {
    return;
  }

  // thongbao class
  const thongbaoACls = $("a:contains('Thông báo')").attr("class");
  const thongbaoSpanCls = $("span:contains('Thông báo')").attr("class");

  $(".navbar__link--notification").after(
    `<li id='donmua' class="navbar__link">
      <a class="${thongbaoACls}" href='https://shopee.vn/user/purchase/'>
        <span class='${thongbaoSpanCls}'>Đơn mua</span>
      </a>
    </li>
    <li id='info' class="navbar__link">
      <a class="${thongbaoACls}" style="font-weight: bold">
        <span class='${thongbaoSpanCls}' id='xu' style="font-weight: bold; color: green; padding-right: 8px">--</span> xu
      </a>
      <input type="checkbox" id="_sponsor" />
      <label for="_sponsor">Show sponsor</label>
    </li>
    `
  );

  $("#_sponsor").change(function () {
    showSponsor = this.checked;
    // console.log("show sponsor", showSponsor);
  });

  // Hide thongbao
  $(".navbar__link--notification").hide();

  // Hide help
  $(".navbar__help-center-icon").parent().hide();
}

function updateData() {
  // console.log("update data to ", xu);
  $("#xu").html(xu);
}

function cleanUp() {
  // remove popup at homepage
  // document.getElementsByClassName("shopee-popup__close-btn")[0]?.click();

  // Add donmua if not exists
  addDonMua();

  updateData();

  const sponsorItems = $("div[data-sqe=ad]").parent().parent().parent();
  if (showSponsor) {
    sponsorItems.show();
  } else {
    sponsorItems.hide();
  }

  // Remove all products in homepage
  if (window.location.href === mainHost) {
    $("[role=main]").remove();
  }

  // Remove footer
  $("footer").remove();

  // Remove floating icon
  $(".shopee-floating-icons__wrapper").remove();
}

async function checkin() {
  const res1 = await fetch("https://shopee.vn/mkt/coins/api/v2/checkin", {
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
  });
  // .then((response) => response.json())
  // .then((data) => {
  //   console.log("Success:", data);
  // })
  // .catch((error) => {
  //   console.error("Error:", error);
  // });

  const res2 = await fetch("https://shopee.vn/api/v0/coins/api/summary/", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      // "if-none-match": "b1394fbd54410e8684e1fb243aa878d4",
      // "if-none-match-": "55b03-79499b123dba14882162e53c464d0735",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-api-source": "pc",
      "x-requested-with": "XMLHttpRequest",
      "x-shopee-language": "vi",
    },
    referrer: "https://shopee.vn/user/coin/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
  });
  const data = await res2.json();
  xu = data.coins.available_amount;

  // console.log(xu);
}

(function () {
  "use strict";

  checkin();

  // jQuery.noConflict();
  // console.log($(".navbar__link--account"));

  setInterval(cleanUp, 1000);
})();
