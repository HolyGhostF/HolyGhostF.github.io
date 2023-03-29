(function () {
  var grt = new Date("04/01/2021 00:00:00"); //设置网站上线时间
  var now = new Date();
  var dnum;
  var hnum;
  var mnum;
  var snum;

  // 计算并更新天数、小时数、分钟数和秒数
  function updateTime() {
    now = new Date(); // 更新 now 的值
    var days = (now - grt) / 1000 / 60 / 60 / 24;
    dnum = Math.floor(days);
    var hours = (now - grt) / 1000 / 60 / 60 - 24 * dnum;
    hnum = Math.floor(hours);
    if (String(hnum).length == 1) {
      hnum = "0" + hnum;
    }
    var minutes = (now - grt) / 1000 / 60 - 24 * 60 * dnum - 60 * hnum;
    mnum = Math.floor(minutes);
    if (String(mnum).length == 1) {
      mnum = "0" + mnum;
    }
    var seconds = (now - grt) / 1000 - 24 * 60 * 60 * dnum - 60 * 60 * hnum - 60 * mnum;
    snum = Math.round(seconds);
    if (String(snum).length == 1) {
      snum = "0" + snum;
    }
  }

  // 更新网页中显示的网站运行时间
  function updateHtml() {
    let currentTimeHtml = "";
    if (hnum < 18 && hnum >= 9) {
      // 如果是上班时间，默认就是"安知鱼-上班摸鱼中.svg"图片，不需要更改
      currentTimeHtml = `本站居然运行了 ${dnum} 天<span id='runtime'> ${hnum} 小时 ${mnum} 分 ${snum} 秒 </span><i class='fas fa-heartbeat' style='color:red'></i>`;
    } else {
      // 如果是下班时间，插入"安知鱼-下班啦.svg"图片
      let img = document.querySelector("#workboard .workSituationImg");
      img.src = "https://npm.elemecdn.com/anzhiyu-blog@2.0.4/img/badge/安知鱼-下班啦.svg";
      img.title = "下班了就该开开心心的玩耍，嘿嘿~";
      img.alt = "下班了就该开开心心的玩耍，嘿嘿~";

      currentTimeHtml = `本站居然运行了 ${dnum} 天<span id='runtime'> ${hnum} 小时 ${mnum} 分 ${snum} 秒 </span><i class='fas fa-heartbeat' style='color:red'></i>`;
    }

    if (document.getElementById("runtimeTextTip")) {
      document.getElementById("runtimeTextTip").innerHTML = currentTimeHtml;
    }
  }

  setInterval(() => {
    updateTime();
    updateHtml();
  }, 1000);
})();
