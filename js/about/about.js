(() => {
  fetch("https://v6-widget.51.la/v6/Jp8wwGQpp21utaFQ/quote.js")
    .then(res => res.text())
    .then(data => {
      let title = ["最近活跃", "今日人数", "今日访问", "昨日人数", "昨日访问", "本月访问", "总访问量"];
      let num = data.match(/(<\/span><span>).*?(\/span><\/p>)/g);

      num = num.map(el => {
        let val = el.replace(/(<\/span><span>)/g, "");
        let str = val.replace(/(<\/span><\/p>)/g, "");
        return str;
      });

      let statisticEl = document.getElementById("statistic");

      // 自定义不显示哪个或者显示哪个，如下为不显示 最近活跃访客 和 总访问量
      let statistic = [];
      for (let i = 0; i < num.length; i++) {
        if (!statisticEl) return;
        if (i == 0) continue;
        statisticEl.innerHTML +=
          "<div><span>" + title[i] + "</span><span id=" + title[i] + ">" + num[i] + "</span></div>";
        queueMicrotask(() => {
          statistic.push(
            new CountUp(title[i], 0, num[i], 0, 2, {
              useEasing: true,
              useGrouping: true,
              separator: ",",
              decimal: ".",
              prefix: "",
              suffix: "",
            })
          );
        });
      }

      let statisticElment = document.querySelector(".about-statistic.author-content-item");
      function statisticUP() {
        if (isInViewPortOfOne(statisticElment)) {
          for (let i = 0; i < num.length; i++) {
            if (i == 0) continue;
            queueMicrotask(() => {
              statistic[i - 1].start();
            });
          }
          document.removeEventListener("scroll", throttleStatisticUP);
        }
      }

      const selfInfoContentYear = new CountUp("selfInfo-content-year", 0, 2002, 0, 2, {
        useEasing: true,
        useGrouping: false,
        separator: ",",
        decimal: ".",
        prefix: "",
        suffix: "",
      });

      let selfInfoContentYearElment = document.querySelector(".author-content-item.selfInfo.single");
      function scrollSelfInfoContentYear() {
        if (selfInfoContentYearElment && isInViewPortOfOne(selfInfoContentYearElment)) {
          selfInfoContentYear.start();
          document.removeEventListener("scroll", throttleScrollSelfInfoContentYear);
        }
      }
      const throttleStatisticUP = btf.throttle(statisticUP, 200);
      document.addEventListener("scroll", throttleStatisticUP, { passive: true });
      statisticUP();
      const throttleScrollSelfInfoContentYear = btf.throttle(scrollSelfInfoContentYear, 200);
      document.addEventListener("scroll", throttleScrollSelfInfoContentYear, { passive: true });
      scrollSelfInfoContentYear();
    });

  var pursuitInterval = null;
  pursuitInterval = setInterval(function () {
    const show = document.querySelector("span[data-show]");
    const next = show.nextElementSibling || document.querySelector(".first-tips");
    const up = document.querySelector("span[data-up]");

    if (up) {
      up.removeAttribute("data-up");
    }

    show.removeAttribute("data-show");
    show.setAttribute("data-up", "");

    next.setAttribute("data-show", "");
  }, 2000);

  document.addEventListener("pjax:send", function () {
    clearInterval(pursuitInterval);
  });

  var helloAboutEl = document.querySelector(".hello-about");
  helloAboutEl.addEventListener("mousemove", evt => {
    const mouseX = evt.offsetX;
    const mouseY = evt.offsetY;
    gsap.set(".cursor", {
      x: mouseX,
      y: mouseY,
    });

    gsap.to(".shape", {
      x: mouseX,
      y: mouseY,
      stagger: -0.1,
    });
  });
})();
