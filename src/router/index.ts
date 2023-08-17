import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { Notebook, Setting, Link, Tools, Comment, PriceTag, Mic, Picture, Document, SetUp } from "@element-plus/icons-vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/home/index.vue'),
      children: [
        {
          path: '/book',
          name: 'book',
          meta: {
            title: "书籍管理",
            icon: Notebook
          },
          children: [
            {
              path: '/book',
              name: 'book',
              component: () => import('../views/home/book/index.vue'),
              meta: {
                title: "书籍信息",
                icon: Document
              }
            },
            {
              path: '/book-section',
              name: 'book-section',
              component: () => import('../views/home/book/section.vue'),
              meta: {
                title: "提示词",
                icon: Comment
              }
            },
            {
              path: '/book-tags',
              name: 'book-tags',
              component: () => import('../views/home/book/tags.vue'),
              meta: {
                title: "人物标签",
                icon: PriceTag
              }
            },
            {
              path: '/voice',
              name: 'voice',
              component: () => import('../views/home/book/voice.vue'),
              meta: {
                title: "音频文件",
                icon: Mic
              }
            },
            {
              path: '/pictures',
              name: 'pictures',
              component: () => import('../views/home/book/pictures.vue'),
              meta: {
                title: "图片文件",
                icon: Picture
              }
            },
          ]
        },
        {
          path: '/config',
          name: 'config',
          meta: {
            title: "配置信息",
            icon: Setting
          },
          children: [
            {
              path: '/system',
              name: 'system',
              component: () => import('../views/home/config/index.vue'),
              meta: {
                title: "参数配置",
                icon: Tools
              }
            },
            {
              path: '/stable-diffusion',
              name: 'stable-diffusion',
              component: () => import('../views/home/config/StableDiffusionConfig.vue'),
              meta: {
                title: "SD配置",
                icon: SetUp
              }
            },
            {
              path: '/third-party',
              name: 'third-party',
              component: () => import('../views/home/config/ThirdParty.vue'),
              meta: {
                title: "第三方",
                icon: Link
              }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/home/user/login.vue'),
    },

  ]
})
export default router
