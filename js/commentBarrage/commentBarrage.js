var commentBarrageConfig = {
  //同时最多显示弹幕数
  maxBarrage: 1,
  //弹幕显示间隔时间ms
  barrageTime: 4000,
  //twikoo部署地址腾讯云的为环境ID
  twikooUrl: "https://myDreamTwikoo.zeabur.app",
  //token获取见上方
  accessToken: "44fd7d73d90e48ce9e893475f70aa232",
  pageUrl: window.location.pathname,
  barrageTimer: [],
  barrageList: [],
  barrageIndex: 0,
  dom: document.querySelector(".comment-barrage"),
};

var commentInterval = null;
var hoverOnCommentBarrage = false;

$(".comment-barrage").hover(
  function () {
    hoverOnCommentBarrage = true;
    console.log("热评悬浮");
  },
  function () {
    hoverOnCommentBarrage = false;
    console.log("停止悬浮");
  }
);

function initCommentBarrage() {
  if (!commentBarrageConfig.dom) return;
  // console.log("开始创建热评")

  var data = JSON.stringify({
    event: "COMMENT_GET",
    "commentBarrageConfig.accessToken": commentBarrageConfig.accessToken,
    url: commentBarrageConfig.pageUrl,
  });
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      commentBarrageConfig.barrageList = commentLinkFilter(JSON.parse(this.responseText).data);
      commentBarrageConfig.dom.innerHTML = "";
    }
  });
  xhr.open("POST", commentBarrageConfig.twikooUrl);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);

  clearInterval(commentInterval);
  commentInterval = null;

  commentInterval = setInterval(() => {
    if (commentBarrageConfig.barrageList.length && !hoverOnCommentBarrage) {
      popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
      commentBarrageConfig.barrageIndex += 1;
      commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
    }
    if (
      commentBarrageConfig.barrageTimer.length >
        (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage
          ? commentBarrageConfig.maxBarrage
          : commentBarrageConfig.barrageList.length) &&
      !hoverOnCommentBarrage
    ) {
      removeCommentBarrage(commentBarrageConfig.barrageTimer.shift());
    }
  }, commentBarrageConfig.barrageTime);
}
function commentLinkFilter(data) {
  data.sort((a, b) => {
    return a.created - b.created;
  });
  let newData = [];
  data.forEach(item => {
    newData.push(...getCommentReplies(item));
  });
  return newData;
}
function getCommentReplies(item) {
  if (item.replies) {
    let replies = [item];
    item.replies.forEach(item => {
      replies.push(...getCommentReplies(item));
    });
    return replies;
  } else {
    return [];
  }
}
function popCommentBarrage(data) {
  let barrage = document.createElement("div");
  // let width = commentBarrageConfig.dom.clientWidth;
  // let height = commentBarrageConfig.dom.clientHeight;
  barrage.className = "comment-barrage-item";
  barrage.innerHTML = `
      <div class="barrageHead">
        <a class="barrageTitle ${
          data.mailMd5 === "d338f432ad0bf2f61e5fe4ad1642725d" ? "barrageBloggerTitle" : ""
        }" href="javascript:anzhiyu.scrollTo('#post-comment')"">
          ${data.mailMd5 === "d338f432ad0bf2f61e5fe4ad1642725d" ? "博主" : "热评"}
        </a>
        <div class="barrageNick">${data.nick}</div>
        <img class="barrageAvatar" src="https://cravatar.cn/avatar/${data.mailMd5}"/>
        <a class="comment-barrage-close" href="javascript:anzhiyu.switchCommentBarrage()"><i class="fa-solid fa-xmark"></i></a>
      </div>
      <a class="barrageContent" href="#${data.id}">${data.comment}</a>
    `;
  commentBarrageConfig.barrageTimer.push(barrage);
  commentBarrageConfig.dom.append(barrage);
}
function removeCommentBarrage(barrage) {
  barrage.className = "comment-barrage-item out";

  setTimeout(() => {
    if (commentBarrageConfig.dom && commentBarrageConfig.dom.contains(barrage)) {
      commentBarrageConfig.dom.removeChild(barrage);
    }
  }, 1000);
}

// 自动隐藏
document.addEventListener(
  "scroll",
  btf.throttle(function () {
    var a = (window.scrollY, document.querySelector(".comment-barrage")),
      t = document.getElementById("post-comment");
    t && a && 768 < document.body.clientWidth && (a.style.bottom = !isInViewPortOfOne(t) ? "0" : "-200px");
  }, 200),
  { passive: true }
),
  initCommentBarrage();

if (localStorage.getItem("commentBarrageSwitch") !== "false") {
  $(".comment-barrage").show();
  $(".menu-commentBarrage-text").text("关闭热评");
} else {
  $(".comment-barrage").hide();
  $(".menu-commentBarrage-text").text("显示热评");
}

document.addEventListener("pjax:send", function () {
  clearInterval(commentInterval);
});
