require('./front-end.config.js');
require('./food.config.js');
require('./plant.config.js');
module.exports = {
    base: '/',

    title: 'our blog',

    description: '记录生活',

    serviceWorker: true,

    head: [
        ['link', { rel: 'icon', href: '/icon/dou.png' }],
        // ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['script', { rel: 'text/javascript', src: '/util/index.js' }]
    ],

    markdown: {
        lineNumbers: false // 代码块显示行号
    },

    evergreen: true,
    
    themeConfig: {
        type: 'blog',
        search: true,
        logo: '/icon/together5.png',
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
            { text: '花卉', link: '/plant/' },
            { text: '会计', link: '/accounting/' }
        ],
        sidebar: {
            '/front-end/': frontEndConfig,
            '/food/': foodConfig,
            '/plant/': plantConfig,
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