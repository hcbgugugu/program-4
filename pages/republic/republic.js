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
        item:{
            img:{}
        },
        images_success:[],
        images_success_size:0,
    },
    //提交表单
    tosubmit(e){
        var that = this
        let item=this.data.item
        let name=e.detail.value.name
        let tel=e.detail.value.tel
        let title=e.detail.value.title
        let detail=e.detail.value.detail
        let where=e.detail.value.where
        let date = util.formatTime(new Date())
        let id=Date.now()
        item.name=name
        item.tel=tel
        item.title=title
        item.detail=detail
        item.where=where
        item.time=date
        item.id=id
        item.img=this.data.item.img
        this.setData({
            item
          })
        if(this.data.item.img.length > 0){//1、判断是否有图片
            that.setData({
              //3、给上传图片初始化一个长度，上传成功的数组和已有的数组一致 
              images_success:that.data.item.img
            })
            that.uploadImage(0)//2、有图片时先上传第一张
        } else {
            app.globalData.item.push(this.data.item)//将表单数据加入全局数据
              const db=wx.cloud.database()
              db.collection('item').add({
                // data 字段表示需新增的 JSON 数据
                data: {
                  // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                  id:this.data.item.id,
                  title:this.data.item.title,
                  name:this.data.item.name,
                  tel:this.data.item.tel,
                  detail: this.data.item.detail,
                  time: this.data.item.date,
                  where: this.data.item.where,
                  img:[],
                },
                success: (res)=> {
                  // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                  console.log('to cloud:',res)
                  this.setData({
                    item:{},
                    images_success:[],
                    inputname: '',
                    inputtel:'',
                    inputtitle:'',
                    inputdetail:'',
                    inputwhere:'',//清空输入框
                    images_success_size:0,
                })//清空
                wx.navigateBack({
                  delta: 1,
                })//返回页面
                }
              })//上传到云
        }
    },
//选择照片
upload(){
    wx.chooseImage({//异步方法
      count: 2,//最多选择图片数量
      sizeType:['original', 'compressed'],//选择的图片尺寸 原图，压缩图
      sourceType:['album','camera'],//相册选图，相机拍照
      success:(res)=>{
          this.setData({
              'item.img':res.tempFilePaths
          })
        console.log("选择成功",res)
      }
    })
  },
  //上传选定的照片
uploadImage(index){
    let that=this
    let length=app.globalData.item.length
    let l=this.data.item.img.length
    if(index==l)
    return
    wx.cloud.uploadFile({//上传至微信云存储
        cloudPath:'file'+length+'/' + new Date().getTime() + "_" +  Math.floor(Math.random()*1000) + ".jpg",//使用时间戳加随机数给图片命名
        filePath:that.data.item.img[index],// 本地文件路径
        success: res => {
            // 返回文件 ID
            console.log("上传成功",res.fileID)
            that.data.item.img[index]=res.fileID
            that.data.images_success[index] = res.fileID
              if(index == l-1) {
                app.globalData.item.push(this.data.item)//将表单数据加入全局数据
                const db=wx.cloud.database()
                db.collection('item').add({
                    // data 字段表示需新增的 JSON 数据
                    data: {
                      // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
                      id:this.data.item.id,
                      title:this.data.item.title,
                      name:this.data.item.name,
                      tel:this.data.item.tel,
                      detail: this.data.item.detail,
                      time: this.data.item.time,
                      where: this.data.item.where,
                      img:this.data.item.img,
                    },
                    success: (res)=> {
                      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                      console.log('to cloud:',res)
                      this.setData({
                        item:{},
                        images_success:[],
                        inputname: '',
                        inputtel:'',
                        inputtitle:'',
                        inputdetail:'',
                        inputwhere:'',//清空输入框
                        images_success_size:0,
                    })//清空
                    wx.navigateBack({
                      delta: 1,
                    })//返回页面
                    }
                  })//上传到云
                }
              that.uploadImage(index+1)
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
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
        console.log('----republic----')
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
    
})