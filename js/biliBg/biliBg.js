var biliBannerIndex = Math.floor(Math.random() * 3);
var $biliBannerParentsEl = document.getElementById("page-header");
//- 创建脚本节点
var biliBannerScript = document.createElement("script");
biliBannerScript.type = "text/javascript";
if (biliBannerIndex === 0) {
  //- autumn
  $biliBannerParentsEl.insertAdjacentHTML(
    "beforeend",
    `
      <div class="blqbanner mobile-hidden">
        <div><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/autumn/bilibili-autumn-1.webp"/></div>
        <div><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/autumn/bilibili-autumn-2.png"/></div>
        <div><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/autumn/bilibili-autumn-3.png"/></div>
        <div><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/autumn/bilibili-autumn-4.png"/></div>
        <div><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/autumn/bilibili-autumn-5.png"/></div>
        <div><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/autumn/bilibili-autumn-6.png"/></div>
      </div>
      <link rel="stylesheet", href="/css/biliBg/autumn/autumn.css" />
    `
  );

  //- 插入js节点
  biliBannerScript.src = "https://npm.elemecdn.com/anzhiyu-blog@2.1.7/js/biliBg/autumn/autumn.js";
  $biliBannerParentsEl.appendChild(biliBannerScript);
} else if (biliBannerIndex === 1) {
  //- spring
  $biliBannerParentsEl.insertAdjacentHTML(
    "beforeend",
    `
      <div class="bili-banner">
        <div class="animated-banner">
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/bg1.png" data-height="360" data-width="9666" height="180" width="4833" style="transform: scale(1) translate(0px, -15px) rotate(0deg); opacity: 1;"/></div>
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/bg2.png" data-height="360" data-width="9666" height="180" width="4833" style="transform: scale(1) translate(1100px, 0px) rotate(0deg); opacity: 1;"/></div>
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/bg3.png" data-height="360" data-width="3523" height="162" width="1585" style="transform: scale(1) translate(675px, 0px) rotate(0deg); opacity: 1;"/></div>
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/bg4.png" data-height="360" data-width="2938" height="176" width="1439" style="transform: scale(1) translate(-637px, 0px) rotate(0deg); opacity: 1;"/></div>
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/bg5.png" data-height="139" data-width="556" height="62" width="250" style="transform: scale(1) translate(607.5px, 45px) rotate(0deg); opacity: 1;"/></div>
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/p4.png" data-height="302" data-width="734" height="84" width="205" style="transform: scale(1) translate(252px, 36.4px) rotate(0deg); opacity: 0;"/></div>
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/bg6.png" data-height="180" data-width="1757" height="125" width="1229" style="transform: scale(1) translate(112px, 25px) rotate(0deg); opacity: 1;"/></div>
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/bg7.png" data-height="116" data-width="1757" height="81" width="1229" style="transform: scale(1) translate(-350px, 49px) rotate(0deg); opacity: 1;"/></div>
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/p2.png" data-height="346" data-width="497" height="138" width="198" style="transform: scale(1) translate(-240px, 16px) rotate(0deg); opacity: 0;"/></div>
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/p1.png" data-height="256" data-width="146" height="102" width="58" style="transform: scale(1) translate(-340px, 32px) rotate(0deg); opacity: 0;"/></div>
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/t1.png" data-height="254" data-width="602" height="114" width="270" style="transform: scale(1) translate(-90px, 13.5px) rotate(0deg); opacity: 1;"/></div>
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/bg8.png" data-height="360" data-width="4277" height="180" width="2138" style="transform: scale(1) translate(100px, 0px) rotate(0deg); opacity: 1;"/></div>
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/p3.png" data-height="327" data-width="933" height="147" width="419" style="transform: scale(1) translate(216px, 13.5px) rotate(0deg); opacity: 1;"/></div>
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/t3.png" data-height="353" data-width="740" height="211" width="444" style="transform: scale(1) translate(2100px, 0px) rotate(0deg); filter: blur(2px); opacity: 1;"/></div>
            <div class="layer"><img src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/t2.png" data-height="360" data-width="1916" height="180" width="958" style="transform: scale(1) translate(-1000px, 0px) rotate(0deg); filter: blur(1px); opacity: 1;"/></div>
            <canvas id="springCanvas" width="1519" height="155" style="position: absolute; top: 0px; left: 0px;width: 100%;"></canvas>
        </div>
      </div>
      <link rel="stylesheet", href="/css/biliBg/spring/spring.css" />
    `
  );

  //- 插入js节点
  biliBannerScript.src = "https://npm.elemecdn.com/anzhiyu-blog@2.1.9/js/biliBg/spring/spring.js";
  $biliBannerParentsEl.appendChild(biliBannerScript);
} else if (biliBannerIndex === 2) {
  //- winter
  $biliBannerParentsEl.insertAdjacentHTML(
    "beforeend",
    `
      <div class="bldbanner">
        <div class="bldview"><img class="morning" src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/winter/bilibili-winter-view-1.webp"/><img class="afternoon" src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/winter/bilibili-winter-view-2.webp"/><img class="ball" src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/winter/bilibili-winter-ball.png"/>
          <video class="evening" autoplay="autoplay" loop="loop" muted="muted">
            <source src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/winter/bilibili-winter-view-3.webm" type="video/webm"/>
          </video><img class="window-cover" src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/winter/bilibili-winter-view-3-snow.png"/>
        </div>
        <div class="tree"><img class="morning" src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/winter/bilibili-winter-tree-1.png"/><img class="afternoon" src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/winter/bilibili-winter-tree-2.png"/><img class="evening" src="https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/winter/bilibili-winter-tree-3.png"/></div>
      </div>
      <link rel="stylesheet", href="/css/biliBg/winter/winter.css" />
    `
  );

  //- 插入js节点
  biliBannerScript.src = "https://npm.elemecdn.com/anzhiyu-blog@2.1.7/js/biliBg/winter/winter.js";
  $biliBannerParentsEl.appendChild(biliBannerScript);
}
