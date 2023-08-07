import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { Notebook, Setting, Link, Tools } from "@element-plus/icons-vue";

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
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
            component: () => import('../views/home/book/index.vue'),
            meta:{
              title: "书籍信息",
              icon: Notebook
          }
        },
        {
          path: '/config',
          name: 'config',
          meta:{
            title: "配置信息",
            icon: Setting
          },
          children: [
            {
              path: '/system',
              name: 'system',
              component: () => import('../views/home/config/index.vue'),
              meta:{
                title: "参数配置",
                icon: Tools
            }
          },
            {
                path: '/third-party',
                name: 'third-party',
                component: () => import('../views/home/config/ThirdParty.vue'),
                meta:{
                  title: "第三方",
                  icon: Link
              }
            }
          ]
        }
      ]
    },
    
  ]
})
export default router
