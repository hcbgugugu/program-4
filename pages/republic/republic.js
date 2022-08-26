// pages/republic/republic.js
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
    /*上传照片*/
    async uploadImag(e){
        let filePathObj = null
        let filePathList = []
        filePathObj = await this.chooseImg(5)
        if (!filePathObj) return
        filePathList = filePathObj.tempFilePaths
        console.log("选择文件信息 ====>", filePathObj)
        let cloudPathList = []
        for (let i = 0; i < filePathList.length; i++) {
        const cloudPathObj = await this.upLoadFile(filePathList[i], 'file')
        if (!cloudPathObj) {
            continue
        }
        console.log(filePathList[i], "文件上传成功=====>", cloudPathObj)
        cloudPathList.push(cloudPathObj.fileID)
        this.setData({[`item[${that.data.item.length}]`]:{
            [`img[i]`]:filePathList[i],
        }, 
        })
    }
        console.log("最终返回云文件ID列表 =====>", cloudPathList)
        
    },
    chooseImg(count, sizeType, sourceType) {
        if (!count) count = 1
        if (!sizeType) sizeType = ['original', 'compressed']
        if (!sourceType) sourceType = ['album', 'camera']
        return new Promise((resolve, reject) => {
          wx.chooseImage({
            count: count,
            sizeType: sizeType,
            sourceType: sourceType,
            success(res) {
              resolve(res)
            },
            fail(err) {
              resolve(false)
              console.error("===== 选取照片失败 =====", err)
            }
          })
        })
      },
    
      /** 
       * 上传文件封装函数, 文件名随机性处理，由17位随机字符+13位时间戳组成
       * @param {string} filePath 要上传图片的临时路径
       * @param {string} cloudPathPrefix 云数据库存储文件路径前缀
       */
      upLoadFile(filePath, cloudPathPrefix) {
        // 取随机名
        let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomStr = '';
        for (let i = 17; i > 0; --i) {
          randomStr += str[Math.floor(Math.random() * str.length)];
        }
        randomStr += new Date().getTime()
        return new Promise((resolve, reject) => {
          let suffix = /\.\w+$/.exec(filePath)[0] //正则表达式返回文件的扩展名
          let cloudPath = cloudPathPrefix + '/' + randomStr + suffix
          wx.cloud.uploadFile({
            cloudPath: cloudPath,
            filePath: filePath,
            success(res) {
              resolve(res)
            },
            fail(err) {
              resolve(false)
              console.error("===== 上传文件失败 =====", err)
            },
          })
        })
      },
    tosubmit(e){
        let {detail: {value: {title}}} = e
        let {detail:{value: {detail}}} = e
        console.log(detail)
        title = title.trim()
        if (title === '') {
            return
        }
        let name=e.detail.value.name
        let tel=e.detail.value.tel
        title=e.detail.value.title
        detail=e.detail.value.detail
        let where=e.detail.value.where
        let date = util.formatTime(new Date())
        let id=Date.now()
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