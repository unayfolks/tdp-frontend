import { createRouter, createWebHistory } from 'vue-router'
import HomeViewMerchant from '../views/HomeViewMerchant.vue'
import HomeViewCustomer from '../views/HomeViewCustomer.vue'
import HomeView from '../views/HomeView.vue'

import Login from '../views/Login.vue'
import RegisterMerchant from '../views/RegisterMerchant.vue'
import RegisterCustomer from '../views/RegisterCustomer.vue'

import DashboardCustomer from '../components/DashboardCustomer.vue'
import DashboardMerchant from '../components/DashboardMerchant.vue'
import Dashboard from '../components/Dashboard.vue'

import Trans from '../views/TransaksiView.vue'
import ProfilMerchant from '../views/ProfilMerchant.vue'
import MenuMerchant from '../views/MenuMerchant.vue'
import OrderMerchant from '../views/OrderMerchant.vue'

import ProfilCustomer from '../views/ProfilCustomer.vue'
import PesanKatering from '../views/PesanKatering.vue'
import OrderCustomer from '../views/OrderCustomer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'dashboard_merchant',
          name: 'home_merchant',
          component: DashboardMerchant,
          meta: { requiresRole: 'Merchant' }
        },
        {
          path: 'profil_merchant',
          name: 'profil_merchant',
          component: ProfilMerchant,
          meta: { requiresRole: 'Merchant' }
        },
        {
          path: 'menu_merchant',
          name: 'menu_merchant',
          component: MenuMerchant,
          meta: { requiresRole: 'Merchant' }
        },
        {
          path: 'order_merchant',
          name: 'order_merchant',
          component: OrderMerchant,
          meta: { requiresRole: 'Merchant' }
        },
        {
          path: 'dashboard_customer',
          name: 'home_customer',
          component: DashboardCustomer,
          meta: { requiresRole: 'Customer' }
        },
        {
          path: 'profil_customer',
          name: 'profil_customer',
          component: ProfilCustomer,
          meta: { requiresRole: 'Customer' }
        },
        {
          path: 'pesan_katering',
          name: 'pesan_katering',
          component: PesanKatering,
          meta: { requiresRole: 'Customer' }
        },
        {
          path: 'order_customer',
          name: 'order_customer',
          component: OrderCustomer,
          meta: { requiresRole: 'Customer' }
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register/merchant',
      name: 'register_merchant',
      component: RegisterMerchant
    },
    {
      path: '/register/customer',
      name: 'register_customer',
      component: RegisterCustomer
    },
  ]
})
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  const userRole = JSON.parse(localStorage.getItem('user'))?.user_role;

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else if (to.matched.some(record => record.meta.requiresRole)) {
    if (userRole === to.meta.requiresRole) {
      next();
    } else {
      next({ name: 'login' }); 
    }
  } else {
    next();
  }
});

export default router
