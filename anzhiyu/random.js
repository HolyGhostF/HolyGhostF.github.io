var posts=["2023/03/27/hello-world/","2021/03/31/hexo改动2/","2021/03/31/hexo改动1/","2023/03/28/开心和忙碌的一天/","2021/03/31/文章1/","2023/03/28/记录一次去中山的旅行/","2023/03/28/记录一次去珠海的旅行/"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};