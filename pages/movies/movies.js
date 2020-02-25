var app=getApp();
Page({
  onLoad:function(event){
    var inTheatersUrl = app.golbalData.doubanBase+"/v2/movie/in_theaters"+"?start=0&count=3";
    var comingSonnUrl = app.golbalData.doubanBase + "/v2/movie/coming_soon" + "?start=0&count=3";
    var top250Url = app.golbalData.doubanBase + "/v2/movie/top250" + "?start=0&count=3";
    this.getMoviesData(inTheatersUrl);
    this.getMoviesData(comingSonnUrl);
    this.getMoviesData(top250Url);
  },
  getMoviesData:function(url){
    var _that=this;
    wx.request({
      url: url,
      header:{
        "content-type":"json"
      },
      success:function(res){
        _that.processDouban(res.data);
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  processDouban:function(movieDoubanData){
    console.log(movieDoubanData)

    //用来存储要渲染得数据
  }

})