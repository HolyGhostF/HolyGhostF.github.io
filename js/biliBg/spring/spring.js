(function () {
  let banner = document.querySelector(".bili-banner");
  let layers = document.getElementsByClassName("layer");

  let overX = 0; //鼠标移入时x坐标
  let leaveX = 0; //鼠标移出时x坐标

  //鼠标移入
  banner.addEventListener("mouseenter", event => {
    event.preventDefault();
    overX = event.clientX;
  });

  //鼠标移出
  banner.addEventListener("mouseleave", event => {
    event.preventDefault();
    leaveX = event.clientX;
    removeEventListener("mousemove", move);
    //图片复位
    imgRest();
  });

  //鼠标移动
  banner.addEventListener("mousemove", move);

  //鼠标移动距离
  function move(e) {
    e.preventDefault();
    let startX = overX;
    let endX = e.clientX;
    let moveX = startX - endX;
    //图片移动
    imgMove(moveX);
  }

  //0
  let img0 = layers[0].children[0];
  let img0StartX = GetTranslate(img0, "x");
  //1
  let img1 = layers[1].children[0];
  let img1StartX = GetTranslate(img1, "x");
  //2
  let img2 = layers[2].children[0];
  let img2StartX = GetTranslate(img2, "x");
  //3
  let img3 = layers[3].children[0];
  let img3StartX = GetTranslate(img3, "x");
  //4
  let img4 = layers[4].children[0];
  let img4StartX = GetTranslate(img4, "x");
  //5 主角船
  let img5 = layers[5].children[0];
  let img5StartX = GetTranslate(img5, "x");
  //6
  let img6 = layers[6].children[0];
  let img6StartX = GetTranslate(img6, "x");
  //7
  let img7 = layers[7].children[0];
  let img7StartX = GetTranslate(img7, "x");
  //8 主角风筝1
  let img8 = layers[8].children[0];
  let img8StartX = GetTranslate(img8, "x");
  //9 主角风筝2
  let img9 = layers[9].children[0];
  let img9StartX = GetTranslate(img9, "x");
  //10
  let img10 = layers[10].children[0];
  let img10StartX = GetTranslate(img10, "x");
  //11
  let img11 = layers[11].children[0];
  let img11StartX = GetTranslate(img11, "x");
  //12
  let img12 = layers[12].children[0];
  let img12StartX = GetTranslate(img12, "x");
  //13
  let img13 = layers[13].children[0];
  let img13StartX = GetTranslate(img13, "x");
  //14
  let img14 = layers[14].children[0];
  let img14StartX = GetTranslate(img14, "x");

  //图片移动
  function imgMove(moveX) {
    //背景
    img0.style.transform = "scale(1) translate(" + (img0StartX + moveX * 0.1) + "px, -15px) rotate(0deg)";
    //左山
    img1.style.transform = "scale(1) translate(" + (img1StartX + moveX * 0.1) + "px, 0px) rotate(0deg)";
    //右山
    img2.style.transform = "scale(1) translate(" + (img2StartX + moveX * 0.03) + "px, 0px) rotate(0deg)";
    //左桥
    img3.style.transform = "scale(1) translate(" + (img3StartX + moveX * 0.11) + "px, 0px) rotate(0deg)";
    //右船
    img4.style.transform = "scale(1) translate(" + (img4StartX + moveX * 0.1) + "px, 45px) rotate(0deg)";
    //中草坪+树
    img6.style.transform = "scale(1) translate(" + (img6StartX + moveX * 0.5) + "px, 25px) rotate(0deg)";
    //中草坪+风筝
    img7.style.transform = "scale(1) translate(" + (img7StartX + moveX * 0.5) + "px, 49px) rotate(0deg)";
    //中树
    img10.style.transform = "scale(1) translate(" + (img10StartX + moveX * 1) + "px, 13.5px) rotate(0deg)";
    //中草坪+树
    img11.style.transform = "scale(1) translate(" + (img11StartX + moveX * 1) + "px, 0px) rotate(0deg)";
    //中人物
    img12.style.transform = "scale(1) translate(" + (img12StartX + moveX * 1) + "px, 13.5px) rotate(0deg)";
    //右树
    img13.style.transform = "scale(1) translate(" + (img13StartX + moveX * 1.5) + "px, 0px) rotate(0deg)";
    //左树
    img14.style.transform = "scale(1) translate(" + (img14StartX + moveX * 1.5) + "px, 0px) rotate(0deg)";
    //人物的显示
    if (moveX < 200) {
      img5.style.transform = "scale(1) translate(" + (img5StartX - moveX * 0.25) + "px, 36.4px) rotate(0deg)";
      img5.style.opacity = 1;
      img8.style.opacity = 0;
      img9.style.opacity = 0;
    } else {
      img8.style.transform = "scale(1) translate(" + (img8StartX + moveX * 0.2) + "px, 16px) rotate(0deg)";
      img9.style.transform = "scale(1) translate(" + (img9StartX + moveX * 0.4) + "px, 32px) rotate(0deg)";
      img5.style.opacity = 0;
      img8.style.opacity = 1;
      img9.style.opacity = 1;
    }
  }

  //图片复位
  function imgRest() {
    img0.style.transform = "scale(1) translate(" + img0StartX + "px, -15px) rotate(0deg)";
    img1.style.transform = "scale(1) translate(" + img1StartX + "px, 0px) rotate(0deg)";
    img2.style.transform = "scale(1) translate(" + img2StartX + "px, 0px) rotate(0deg)";
    img3.style.transform = "scale(1) translate(" + img3StartX + "px, 0px) rotate(0deg)";
    img4.style.transform = "scale(1) translate(" + img4StartX + "px, 45px) rotate(0deg)";
    img5.style.transform = "scale(1) translate(" + img5StartX + "px, 36.4px) rotate(0deg)";
    img6.style.transform = "scale(1) translate(" + img6StartX + "px, 25px) rotate(0deg)";
    img7.style.transform = "scale(1) translate(" + img7StartX + "px, 49px) rotate(0deg)";
    img8.style.transform = "scale(1) translate(" + img8StartX + "px, 16px) rotate(0deg)";
    img9.style.transform = "scale(1) translate(" + img9StartX + "px, 32px) rotate(0deg)";
    img10.style.transform = "scale(1) translate(" + img10StartX + "px, 13.5px) rotate(0deg)";
    img11.style.transform = "scale(1) translate(" + img11StartX + "px, 0px) rotate(0deg)";
    img12.style.transform = "scale(1) translate(" + img12StartX + "px, 13.5px) rotate(0deg)";
    img13.style.transform = "scale(1) translate(" + img13StartX + "px, 0px) rotate(0deg)";
    img14.style.transform = "scale(1) translate(" + img14StartX + "px, 0px) rotate(0deg)";
    //人物隐藏
    img5.style.opacity = 0;
    img8.style.opacity = 0;
    img9.style.opacity = 0;
  }

  //js获取x偏移
  function GetTranslate(node, sty) {
    var translates = document.defaultView.getComputedStyle(node, null).transform.substring(7);
    var result = translates.match(/\(([^)]*)\)/); // 正则()内容
    var matrix = result ? result[1].split(",") : translates.split(",");
    if (sty == "x" || sty == undefined) {
      return matrix.length > 6 ? parseFloat(matrix[12]) : parseFloat(matrix[4]);
    } else if (sty == "y") {
      return matrix.length > 6 ? parseFloat(matrix[13]) : parseFloat(matrix[5]);
    } else if (sty == "z") {
      return matrix.length > 6 ? parseFloat(matrix[14]) : 0;
    } else if (sty == "rotate") {
      return matrix.length > 6
        ? getRotate([parseFloat(matrix[0]), parseFloat(matrix[1]), parseFloat(matrix[4]), parseFloat(matrix[5])])
        : getRotate(matrix);
    }
  }

  // 花瓣的js
  let canvas = document.querySelector("#springCanvas");
  let ctx = canvas.getContext("2d");
  let sw = canvas.width;
  let sh = canvas.height;
  let imgs = {
    f1: "https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/f1.png",
    f2: "https://npm.elemecdn.com/anzhiyu-blog@2.1.7/img/banner/spring/f2.png",
  };
  //图片加载
  function loading() {
    //全部资源数量
    let AllAmount = Object.keys(imgs).length;
    //加载完毕的资源数量
    let count = 0;

    for (k in imgs) {
      //图片地址
      let src = imgs[k];
      //创建图片
      imgs[k] = new Image();
      //赋值图片地址
      imgs[k].src = src;
      imgs[k].onload = function () {
        count++;
        if (count == AllAmount) {
          start();
        }
      };
    }
  }

  //定义花瓣类
  class Flower {
    constructor(img, x, y, w, h) {
      this.img = img;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.del = false;
    }
    //渲染
    draw() {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
    //飘落
    updata() {
      if (this.x > sw || this.y > sh) {
        this.del = true;
      } else {
        this.del = false;
      }
      this.x += Math.random() * 3 + 1;
      this.y += Math.random() * 3 + 1;
    }
  }

  let fs = [];
  //创建花瓣
  function createFlower() {
    let wh = rand(0, 15);
    let flower = null;
    if (fs.length < 35) {
      if (rand(0, 10) > 5) {
        flower = new Flower(imgs["f1"], rand(20, sw - 20), rand(0, 10), wh, wh);
      } else {
        flower = new Flower(imgs["f2"], rand(20, sw - 20), rand(0, 10), wh, wh);
      }
      fs.push(flower);
    }
  }
  //渲染
  function allDraw() {
    for (i = 0; i < fs.length; i++) {
      let flower = fs[i];
      if (flower.del) {
        fs.splice(i, 1);
        i--;
        continue;
      }
      flower.draw();
      flower.updata();
    }
  }

  //随机数
  function rand(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }
  let timer = null;
  window.onload = () => {
    loading();
  };
  function start() {
    timer = setInterval(begin, 1000 / 60);
  }
  function begin() {
    ctx.clearRect(0, 0, sw, sh);
    createFlower();
    allDraw();
  }
})();
