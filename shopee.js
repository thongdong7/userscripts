// ==UserScript==
// @name         Shopee
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Hide / show shopee sponsor products, auto collection shopee coin, show current shopee coin, add shortcut links
// @author       thongdong7
// @match        https://shopee.vn/**
// @grant        none
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @downloadURL    https://raw.githubusercontent.com/thongdong7/userscripts/master/shopee.js
// @updateURL    https://raw.githubusercontent.com/thongdong7/userscripts/master/shopee.js
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
      <a style="color: white" href='https://shopee.vn/user/purchase/'>
        <span class='${thongbaoSpanCls}'>Đơn mua</span>
      </a>
    </li>
    <li id='info' class="navbar__link">
      <a href="https://shopee.vn/user/coin/">
        <span id='xu' style="font-weight: bold; color: green; padding-right: 8px">--</span> xu
      </a>
      <input type="checkbox" id="_sponsor" style="margin-left: 16px; margin-right: 8px" />
      <label for="_sponsor" style="cursor: pointer">Show sponsor</label>
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

function changeSearchParam(params) {
  let href = new URL(window.location.href);
  for (const field in params) {
    const value = params[field];
    if (value === null || value === undefined) {
      href.searchParams.delete(field);
    } else {
      href.searchParams.set(field, value);
    }
  }

  window.location.href = href;
}

function addSearchButtons() {
  if ($("#search_buttons").length) {
    return;
  }

  $(".select-with-status").parent().after(
    `
    <style>
    #search_buttons {
      margin-top: auto;
      margin-bottom: auto;
    }

    #search_buttons span {
      color: blue;
      cursor: pointer;
      padding-left: 8px;
      text-decoration: underline;
    }
    #search_buttons span:hover {
      text-decoration: none;
    }

    </style>
    <div id="search_buttons">
      <span id="thap_cao">Thấp trước</span> <span id="thap_cao_hcm">Thấp HCM</span> 
    </div>
    `
  );

  $("#thap_cao").click(() => {
    changeSearchParam({
      noCorrection: "true",
      order: "asc",
      page: "0",
      sortBy: "price",
      locations: null,
    });
  });

  $("#thap_cao_hcm").click(() => {
    changeSearchParam({
      noCorrection: "true",
      order: "asc",
      page: "0",
      sortBy: "price",
      locations: "TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh",
    });
  });
}

const refreshMessage =
  "It's us, not you. Please try to refresh the page to solve the problem";

function cleanUp() {
  // auto refresh
  if ($(`div:contains(${refreshMessage})`).length > 0) {
    window.location.reload();
    return;
  }

  // remove popup at homepage
  if ($(".shopee-popup__close-btn").length) {
    $(".shopee-popup__close-btn").click();
  }

  // Add donmua if not exists
  addDonMua();

  // Add addSearchButtons
  addSearchButtons();

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

  const res2 = await fetch("https://shopee.vn/api/v0/coins/api/summary/", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
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

  setInterval(cleanUp, 1000);
})();
