//框架核心配置
import ColorUI from '../mp-cu/main'
export const colorUI = new ColorUI({
    config: {
        theme: 'auto',
        main: 'blue',
        text: 1,
        footer: true,
        share: true,
        shareTitle: '失物招领平台',
        homePath: '/pages/home/home',
        tabBar: [{
            title: '失物列表',
            icon: '/static/tab_icon/document.png',
            curIcon: '/static/tab_icon/document_cur.png',
            url: '/pages/home/home',
            type:'tab'
            
        },
        {
            title: '发布招领',
            icon: '/static/tab_icon/custom.png',
            curIcon: '/static/tab_icon/custom_cur.png',
            url: '/pages/republic/republic',
            type: 'tab'
        }]
    }
})