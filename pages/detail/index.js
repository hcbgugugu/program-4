
const app = getApp();
Page({
    data: {
        scrollTop: 0,
        item:{
        },
    },
    //点击认领显示拾到者信息
    tocontact(e){
        const name=e.currentTarget.dataset.name
        const tel=e.currentTarget.dataset.tel
        this.$showDialog({
            title:'请您用以下信息联系拾到者',
            content: '姓名：'+name+' 电话：'+ tel,
            showCancel:false,
            confirmText: '好的',
            success: res => {
                console.log(res);
            }
        });
    },
    onLoad(options){
        console.log('----detail----')
        var item=JSON.parse(options.item)
        var index=JSON.parse(options.index)
        console.log(item[index])
        this.setData({
            item:item[index],
        })
    },
})
