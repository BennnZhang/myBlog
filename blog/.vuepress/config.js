module.exports = {
    title: 'Ben\'s blog',
    description: '我的个人网站',
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['link', { rel: 'icon', href: '/icon/logo.png' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }]
    ],
    theme: 'reco',
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: false // 代码块显示行号
    },
    themeConfig: {
        nav:[
            {text: '前端基础', link: '/accumulate/' },
            {text: 'food', link: '/food/'},
            {text: '微博', link: 'https://baidu.com'}      
        ],
        sidebar: 'auto', // 侧边栏配置
        sidebarDepth: 2, // 侧边栏显示2级
    }
  };