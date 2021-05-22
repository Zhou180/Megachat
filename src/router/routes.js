
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageUsers.vue') },
      { path: '/chat/:otherUserID', component: () => import('pages/PageChat.vue') },
      { path: '/auth', component: () => import('pages/PageAuth.vue') },
      { path:'/addfile/:otherUserID',component: () => import('pages/Pageaddfile.vue')},
      { path:'/album/:otherUserID',component: () => import('pages/PageAlbum.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
