var posts=["2023/03/30/Hexo部署到腾讯云或阿里云/","2023/03/30/Github搭建我的图床/","2023/03/30/Vue部署的一些示例/","2023/03/27/hello-world/","2023/03/30/npm图床搭建/","2021/03/31/hexo改动1/","2023/03/28/开心和忙碌的一天/","2021/03/31/文章1/","2023/03/28/记录一次去中山的旅行/","2023/03/28/记录一次去珠海的旅行/"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};