// pages/republic/republic.js
const app = getApp();
const util = require('../../../utils/util.js')
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        scrollTop: 0, radio: 1, check: false
    },
    tosubmit(e){
        let name=e.detail.value.name
        let tel=e.detail.value.tel
        let title=e.detail.value.title
        let detail=e.detail.value.detail
        let where=e.detail.value.where
        var date = util.formatTime(new Date())
        this.setData({
            name:name,
            tel:tel,
            title:title,
            detail:detail,
            where:where,
            time:date
        })
        app.globalData.item=this.data.item
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log("fffff")
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    onLoad() {

    },
    radioChange(e) {
        this.setData({
            radio: e.detail
        })
    },
    checkChange(e) {
        this.setData({
            check: e.detail
        })
    },
    // 监听用户滑动页面事件。
    onPageScroll(e) {
        // 注意：请只在需要的时候才在 page 中定义此方法，不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。
        // 注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时。
        // https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPageScroll-Object-object
        this.setData({
            scrollTop: e.scrollTop
        })
    }
})