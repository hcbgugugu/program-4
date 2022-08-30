import { colorUI } from './config/ColorUI'
import { colorUISdk } from './config/mp-sdk'
App({
    colorUI,//挂载到app上
    colorUISdk,
    globalData:{
        item:[]
    },
    
    onLaunch() {
        console.log('----app----')
        var that=this
        wx.cloud.init({
            env:'cloud1-4gvijzh9c2293852'
        })/*初始化*/
        const db = wx.cloud.database()/*获取数据库引用*/
        db.collection('item').get({
        success: function(res) {
          // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
          console.log('app//res.data is :',res.data)
          that.globalData.item=res.data
          console.log('app//globaldata is :',that.globalData.item)
        }
      })
},

    onShow() {
        
    }
})
