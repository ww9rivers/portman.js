
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
	{ path: '', component: () => import('pages/index') },
	{ path: '/tools', component: () => import('pages/tools') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
