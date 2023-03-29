function catalogActive() {
  let $list = document.getElementById("catalog-list");
  if ($list) {
    // 鼠标滚轮滚动
    $list.addEventListener(
      "mousewheel",
      function (e) {
        // 计算鼠标滚轮滚动的距离
        $list.scrollLeft -= e.wheelDelta / 2;
        // 阻止浏览器默认方法
        e.preventDefault();
      },
      false
    );

    // 高亮当前页面对应的分类或标签
    let $catalog = document.getElementById(decodeURIComponent(window.location.pathname));
    if ($catalog) {
      $catalog.classList.add("selected");
      // 滚动当前页面对应的分类或标签到中部
      $list.scrollLeft = $catalog.offsetLeft - $list.offsetLeft - ($list.offsetWidth - $catalog.offsetWidth) / 2;
    }
  }
}
function tagsPageActive() {
  let $list = document.getElementById("tag-page-tags");
  if ($list) {
    // 鼠标滚轮滚动
    $list.addEventListener(
      "mousewheel",
      function (e) {
        // 计算鼠标滚轮滚动的距离
        $list.scrollLeft -= e.wheelDelta / 2;
        // 阻止浏览器默认方法
        e.preventDefault();
      },
      false
    );

    // 高亮当前页面对应的分类或标签
    let $tagPageTags = document.getElementById(decodeURIComponent(window.location.pathname));
    if ($tagPageTags) {
      $tagPageTags.classList.add("selected");
      // 滚动当前页面对应的分类或标签到中部
      $list.scrollLeft =
        $tagPageTags.offsetLeft - $list.offsetLeft - ($list.offsetWidth - $tagPageTags.offsetWidth) / 2;
    }
  }
}
catalogActive();
tagsPageActive();
