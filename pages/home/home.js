const app = getApp();

Page({
    data: {
        scrollTop: 0, list: [
            {
                img: 'https://oss.colorui.org/cos/img/qtrr8.png',
                title: '钥匙一串',
                desc: '普普通通',
                time: '2022年6月10日',
                where: '奈雪奶茶店'
            }
        ]
    },
    //根据id跳转到详情页
    toProductDetail(e) {
        var item=JSON.stringify(this.data.item)
        wx.navigateTo({
            url: `/pages/detail/index?id=${e.currentTarget.dataset.id}`+item,
        })
    },
      /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },


    // 监听用户滑动页面事件。
    onPageScroll(e) {
        // 注意：请只在需要的时候才在 page 中定义此方法，不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。
        // 注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时。
        // https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPageScroll-Object-object
        this.setData({
            scrollTop: e.scrollTop
        })
    },
})
