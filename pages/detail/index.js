
const app = getApp();
Page({
    data: {
        scrollTop: 0,
        swiperList: [
            { img: "/static/img/45fc.png" },
            { img: "/static/img/d0f2.png" }
        ],
        item:{
            tel:"1222",
            name:"xxx"
        }
    },
    //点击认领显示拾到者信息
    tocontact(e){
        this.$showDialog({
            title:'请您用以下信息联系拾到者',
            content: '姓名：'+this.data.item.name+'电话：'+ this.data.item.tel,
            showCancel:false,
            confirmText: '好的',
            success: res => {
                console.log(res);
            }
        });
    },
    onLoad(options){
        console.log(options)
        JSON.parse(options.item)
    },
    // 监听用户滑动页面事件。
    onPageScroll(e) {
        // 注意：请只在需要的时候才在 page 中定义此方法，不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。
        // 注意：请避免在 onPageScroll 中过于频繁的执行 setData 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据，会影响通信耗时。
        // https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onPageScroll-Object-object
        this.setData({scrollTop: e.scrollTop})
    },
})