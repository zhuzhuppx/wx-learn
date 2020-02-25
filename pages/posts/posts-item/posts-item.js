// pages/posts/posts-item/posts-item.js
var postsData = require("../../../data/posts-data.js");

//音乐播放问题 
//页面退出再进来，音乐在后台继续播放，但是图片没有换成音乐背景图片
//一个页面播放了歌曲，但是全局得g_isPlayingMusic是true,影响了其他页面得g_isPlayingMusic

var app = getApp();
Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function(options) {
    wx.clearStorage()
    var postId = options.id;
    var postItemData = postsData.postList[postId];
    this.setData({
      postItemData,
      currentPostId: postId
    });
    var postsCollected = wx.getStorageSync("posts_collected");
    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync("posts_collected", postsCollected)
    }
    this.setMusicMonitor();
    
  },


  setMusicMonitor:function(){
    var _that=this;
    //监听音乐播放
    wx.onBackgroundAudioPlay(function () {
      if (_that.data.isPlayingMusic = true) {
        _that.setData({
          isPlayingMusic: false
        })
      }

    });
    wx.onBackgroundAudioPause(function () {
      if (_that.data.isPlayingMusic = false) {
        _that.setData({
          isPlayingMusic: true
        })
      }
    })
  },


  //收藏
  onCollectionTap: function(event) {
    var postsCollected = wx.getStorageSync("posts_collected");
    var postCollected = postsCollected[this.data.currentPostId];
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;
    // this.onShowToast(postsCollected, postCollected);
    this.onShowModal(postsCollected, postCollected)
  },

  onShowModal: function(postsCollected, postCollected) {
    var _that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? "收藏该文章?" : "取消收藏该文章?",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#333",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function(res) {
        if (res.confirm) {
          wx.setStorageSync("posts_collected", postsCollected);
          _that.setData({
            collected: postCollected
          });
        }
      }
    })
  },
  onShareTap: function(event) {
    var itemList = [
      "分享到朋友圈",
      "分享到微信",
      "分享到微博",
      "分享到QQ"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        wx.showModal({
          title: "用户 " + itemList[res.tapIndex],
          content: "用户是否取消？" + res.cancel + "现在无法实现分享功能，什么时候能支持呢"
        })
      }
    })
  },

  //音乐背景播放逻辑
  onMusicTap: function(event) {
    var MusicDes = postsData.postList[this.data.currentPostId].music;
    this.setData({
      isPlayingMusic: !this.data.isPlayingMusic
    })
    if (this.data.isPlayingMusic) {
      wx.playBackgroundAudio({
        dataUrl: MusicDes.url,
        title: MusicDes.title,
        coverImgUrl: MusicDes.coverImg
      })
    } else {
      wx.pauseBackgroundAudio()
    }
  }

  // onShowToast: function (postsCollected, postCollected){
  //   wx.setStorageSync("posts_collected", postsCollected);
  //   this.setData({ collected: postCollected });
  //   wx.showToast({
  //     title: postCollected ? "收藏成功" : "取消成功"
  //   })
  // }
})