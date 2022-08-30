
const app = getApp();
Page({
    data: {
        scrollTop: 0, 
        item:{
        }
    },
    
    //根据id跳转到详情页
    toProductDetail(e) {
        var index=e.currentTarget.dataset.index
        var item=JSON.stringify(this.data.item)
        wx.navigateTo({
            url: '/pages/detail/index?item='+item+'&index='+index,
        })
    },
      /**
   * 生命周期函数--监听页面加载
   */
onLoad:function(){

},
onShow:function(){
    console.log('----homeonshow----')
    var item=app.globalData.item
    this.setData({
        item:item
    })
    console.log('home//item :',this.data.item)
},

})
