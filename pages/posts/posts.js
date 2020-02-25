// pages/posts/posts.js
var postsData=require("../../data/posts-data.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ posts_content: postsData.postList})
  },
  itemTab:function(event){
    var postId=event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'posts-item/posts-item?id='+postId
    })
  },
  onSwiperItemTap:function(event){
    var postId=event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: 'posts-item/posts-item?id=' + postId
    })
  }
})