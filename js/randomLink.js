const anqila = {
      // 友链注入预设评论
  addFriendLink() {
    var input = document.getElementsByClassName("el-textarea__inner")[0];
    if (!input) return;
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("input", true, true);
    input.value =
      "昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：\n描述：\n站点截图（可选）：\n";
    input.dispatchEvent(evt);
    input.focus();
    input.setSelectionRange(-1, -1);
  },
  //友链随机传送
  travelling() {
    var fetchUrl = "https://friends.anzhiy.cn/randomfriend";
    fetch(fetchUrl)
      .then(res => res.json())
      .then(json => {
        var name = json.name;
        var link = json.link;
        Snackbar.show({
          text:
            "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
          duration: 8000,
          pos: "top-center",
          actionText: "前往",
          onActionClick: function (element) {
            //Set opacity of element to 0 to close Snackbar
            $(element).css("opacity", 0);
            window.open(link, "_blank");
          },
        });
      });
  },
}