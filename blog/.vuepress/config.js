module.exports = {
    base: '/',

    title: 'our blog',

    description: '记录生活',

    serviceWorker: true,

    head: [
        ['link', { rel: 'icon', href: '/icon/logo.png' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['script', { rel: 'text/javascript', src: '/util/index.js' }]
    ],

    markdown: {
        lineNumbers: false // 代码块显示行号
    },

    evergreen: true,

    theme: 'reco',
    
    themeConfig: {
        type: 'blog',
        search: true,
        nav: [
            { text: 'Home', link: '/' },
            { text: '前端', link: '/front-end/' },
            { 
                text: '美食',
                items: [
                    {
                        text: '凉拌一夏',
                        link: '/food/cold-dishes/'
                    },
                    {
                        text: '家常小炒',
                        link: '/food/stir-fry/'
                    },
                    {
                        text: '美味佳肴',
                        link: '/food/delicacies/'
                    }
                ]
            },
            { text: '会计', link: '/accounting/' }
        ],
        sidebar: {
            '/front-end/': [

                {
                    title: '前端技术博客',
                    collapsable: false
                },
                {
                    title: 'css',
                    children: [
                        'css/css兼容性问题',
                        'css/font缩写'
                    ]
                },
                {
                    title: 'js',
                    children: [
                        'js/js兼容性问题',
                    ]
                },
                {
                    title: 'VUE'
                },
                {
                    title: 'TypeScript',
                    children: [
                        'typescript/基础类型'
                    ]

                }
            ],
            '/food/': [
                {
                    title: '凉拌一夏',
                    collapsable: false,
                    children: [
                        'cold-dishes/糖拌西红柿',
                    ]
                },
                {
                    title: '家常小炒',
                    collapsable: false,
                    children: [
                        'stir-fry/菜花胡萝卜西红柿',
                        'stir-fry/洋葱茄子'
                    ]
                },
                {
                    title: '美味佳肴',
                    collapsable: false,
                    children: [
                        'delicacies/罗宋汤'
                    ]
                }
            ],
            '/accounting/': [
                'easy',
                {
                    title: '税法',
                    collapsable: false,
                    children: [
                        'tax-law/one',
                        'tax-law/two',
                    ]
                },
                {
                    title: '审计',
                    collapsable: false,
                    children: [
                        // 'audit/one'
                    ]
                },
            ]
        }
    }
  };