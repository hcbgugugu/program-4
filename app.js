import { colorUI } from './config/ColorUI'
import { colorUISdk } from './config/mp-sdk'

App({
    colorUI,//挂载到app上
    colorUISdk,
    globalData:{
        item:{}
    },
    onLaunch() {
        if (!wx.cloud) {
            console.error('请使用 2.2.3 或以上的基础库以使用云能力');
          } else {
            wx.cloud.init({
              // env 参数说明：
              //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
              //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
              //   如不填则使用默认环境（第一个创建的环境）
              // env: 'my-env-id',
              traceUser: true,
            });
            const db=wx.cloud.database()
            const MAX_LIMIT = 100
              
              exports.main = async (event, context) => {
  // 先取出集合记录总数
  //!!!!这个函数没法运行
              const countResult = await db.collection('item').count()
            const total = countResult.total
  // 计算需分几次取
            const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
            const tasks = []
            
            for (let i = 0; i < batchTimes; i++) {
            const promise = db.collection('item').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
            tasks.push(promise)
            }
            
  // 等待所有
            return (await Promise.all(tasks)).reduce((acc, cur) => {
            return {
                data: acc.data.concat(cur.data),
                errMsg: acc.errMsg,
            }
        }
    )
    }
}
},
    onShow() {
        
    }
})
