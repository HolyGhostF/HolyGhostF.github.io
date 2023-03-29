(function () {
  const images = document.querySelectorAll(".blqbanner>div>img");
  document.querySelector(".blqbanner").addEventListener("mousemove", e => {
    let percentage = e.clientX / window.outerWidth;
    //    设置鼠标移动百分比
    let offset = 10 * percentage;
    //    定义offset，定义分层图片位置的距离
    let blur = 20;
    for (let [index, image] of images.entries()) {
      offset *= 1.3;
      //    越后面的图片，位移的越多
      //    鼠标在中间，第三章和第四张图的模糊度最低，趋近于0；第2张和第5张模糊度较高，第1张和第6张模糊度最高；
      //    鼠标在右边，第六张图模糊度趋近于0，越往左的图片，模糊度越高；使用公式：y = x**2*20
      let blurValue = Math.pow(index / images.length - percentage, 2) * blur;
      image.style.setProperty("--offset", `${offset}px`);
      image.style.setProperty("--blur", `${blurValue}px`);
    }
  });
})();
