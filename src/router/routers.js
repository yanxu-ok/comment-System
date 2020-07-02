import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: 'home',
    redirect: '/comment-audit/local-audit',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true,
      icon: ''
    }
  },
  {
    path: '/comment-audit',
    name: 'comment-audit',
    meta: {
      icon: 'logo-buffer',
      title: '评论审核'
    },
    component: Main,
    children: [{
        path: 'local-audit',
        name: 'local-audit',
        meta: {
          title: '本站评论审核'
        },
        component: () => import('@/view/comment/local-audit/local-audit.vue')
      },
      {
        path: 'report-audit',
        name: 'report-audit',
        meta: {
          title: '举报评论审核',
          icon: ''
        },
        component: () => import('@/view/comment/report-audit/report-audit.vue')
      },
      {
        path: 'blacklist',
        name: 'blacklist',
        meta: {
          title: '黑名单',
          icon: ''
        },
        component: () => import('@/view/comment/blacklist/blacklist.vue')
      }, {
        path: 'keywords',
        name: 'keywords',
        meta: {
          title: '关键词过滤',
          icon: ''
        },
        component: () => import('@/view/comment/keywords/keywords.vue')
      },
      {
        path: 'list-comment',
        name: 'list-comment',
        meta: {
          title: '文章内评论审核',
          icon: '',
          hideInMenu: true
        },
        component: () => import('@/view/comment/list-comment/list-comment.vue')
      }
    ]
  },
  {
    path: '/comment-management',
    name: 'comment-management',
    meta: {
      icon: 'logo-buffer',
      title: '评论管理'
    },
    component: Main,
    children: [{
        path: 'switch-management',
        name: 'switch-management',
        meta: {
          title: '评论开关管理'
        },
        component: () => import('@/view/comment-management/switch-management/switch-management.vue')
      },
      {
        path: 'list-cate',
        name: 'list-cate',
        meta: {
          title: '栏目列表',
          hideInMenu: true,
        },
        component: () => import('@/view/comment-management/list-cate/list-cate.vue')
      },
      {
        path: 'list-government',
        name: 'list-government',
        meta: {
          title: '政务号栏目',
          hideInMenu: true,
        },
        component: () => import('@/view/comment-management/list-government/list-government.vue')
      },
      {
        path: 'list-article',
        name: 'list-article',
        meta: {
          title: '稿件列表',
          hideInMenu: true,
        },
        component: () => import('@/view/comment-management/list-article/list-article.vue')
      }
    ]
  },
  {
    path: '/data-statistics',
    name: 'data-statistics',
    meta: {
      icon: 'logo-buffer',
      title: '数据统计'
    },
    component: Main,
    children: [{
        path: 'comment-statistics',
        name: 'comment-statistics',
        meta: {
          title: '评论统计'
        },
        component: () => import('@/view/data-statistics/comment-statistics/comment-statistics.vue')
      },
      {
        path: 'hot-article',
        name: 'hot-article',
        meta: {
          title: '热门文章'
        },
        component: () => import('@/view/data-statistics/hot-article/hot-article.vue')
      },
      {
        path: 'like-build',
        name: 'like-build',
        meta: {
          title: '点赞盖楼'
        },
        component: () => import('@/view/data-statistics/like-build/like-build.vue')
      }
    ]
  },
  {
    path: '/setup',
    name: 'setup',
    meta: {
      icon: 'setup',
      title: '系统设置',
      access: ['super']
    },
    component: Main,
    children: [{
      path: 'platform-bind',
      name: 'platform-bind',
      meta: {
        title: '平台绑定'
      },
      component: () => import('@/view/setup/platform-bind/platform-bind.vue')
    }]
  },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [{
      path: 'i18n_page',
      name: 'i18n_page',
      meta: {
        icon: 'md-planet',
        title: 'i18n - {{ i18n_page }}'
      },
      component: () => import('@/view/i18n/i18n-page.vue')
    }]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true,
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [{
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
