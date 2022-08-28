// pages/republic/republic.js
import $ from '../../utils/util'
const app = getApp();
const util = require('../../utils/util.js')
let that=this
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        scrollTop: 0, radio: 1, check: false,
        inputname:'',
        inputtel:'',
        inputtitle:'',
        inputwhere:'',
        inputdetail:'',
    },
    //上传照片
    upload(){
        wx.chooseImage({//异步方法
          count: 9,//最多选择图片数量
          sizeType:['original', 'compressed'],//选择的图片尺寸 原图，压缩图
          sourceType:['album','camera'],//相册选图，相机拍照
          success(res){
            //const tempFilePaths = res.tempFilePaths
            that.setData({
              img: res.tempFilePaths
             });
             console.log("选择成功",res)
          }
        })
      },
    uploadImage(index){
        let that=this
          wx.cloud.uploadFile({//上传至微信云存储
            cloudPath:'file/' + new Date().getTime() + "_" +  Math.floor(Math.random()*1000) + ".jpg",//使用时间戳加随机数给图片命名
            filePath:that.data.images[index],// 本地文件路径
            success: res => {
              // 返回文件 ID
              console.log("上传成功",res.fileID)
              that.data.images_success[index] = res.fileID;
              that.data.images_success_size = that.data.images_success_size+1;
     
              if(that.data.images_success_size == that.data.images.length){
                console.log("上传成功：", that.data.images_success)
              } else {
                that.uploadImage(index+1)
              }
            },
            fail: err =>{
              that.setData({
                images_success:[],
                images_success_size:0
              })
              wx.showToast({
                icon:'none',
                title: '上传失败，请重新上传',
              })
            }
          })
     
      },
    tosubmit(e){
        let name=e.currentTarget.name
        let tel=e.currentTarget.tel
        let title=e.currentTarget.title
        let detail=e.currentTarget.detail
        let where=e.currentTarget.where
        let date = util.formatTime(new Date())
        let id=Date.now()
        app.globalData.item.name=name
        app.globalData.item.tel=tel
        app.globalData.item.title=title
        app.globalData.item.detail=detail
        app.globalData.item.where=where
        app.globalData.item.time=date
        app.globalData.item.id=id
        this.setData({[`item[${that.data.item.length}]`]:{
            id:id,
            name:name,
            tel:tel,
            title:title,
            detail:detail,
            where:where,
            time:date,
        }, 
        inputname: '',
        inputtel:'',
        inputtitle:'',
        inputdetail:'',
        inputwhere:'',//清空输入框
    },() => {
            app.globalData.item = that.data.item
          })
          console.log('submit+1')
          const db=wx.cloud.database()
          db.collection('item').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
              id:id,
              title:title,
              name:name,
              tel:tel,
              detail: detail,
              time: date,
              where: where,
            },
            success: function(res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log(res)
            }
          })
          if(that.data.images.length > 0){//1、判断是否有图片
            that.setData({
              //3、给上传图片初始化一个长度，上传成功的数组和已有的数组一致
              images_success:that.data.images
            })
            that.uploadImage(0)//2、有图片时先上传第一张
            }
            wx.navigateBack({
              delta: 1,
            })//返回页面
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        console.log('----republic----')
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