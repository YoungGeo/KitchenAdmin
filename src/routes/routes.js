import DashboardLayout from '@/pages/Layout/DashboardLayout.vue'

import Dashboard from '@/pages/Dashboard.vue'

//Products
import Product from '@/pages/Product/Products.vue'
import AddProduct from '@/pages/Product/AddProducts.vue'
import EditProduct from '@/pages/Product/EditProducts.vue'

//Menus
import Menus from '@/pages/Menu/Menus.vue'
import AddMenus from '@/pages/Menu/AddMenus.vue'
import EditMenus from '@/pages/Menu/EditMenus.vue'

//Orders
import Pending from '@/pages/Order/Pending.vue'
import InProgress from '@/pages/Order/InProgress.vue'
import Fulfilled from '@/pages/Order/Fulfilled.vue'

//Invoices
import Invoices from '@/pages/Invoice/Invoices.vue'
import ViewInvoices from '@/pages/Invoice/ViewInvoices.vue'

//Accounts
import Accounts from '@/pages/Account/Accounts.vue'
import AddAccounts from '@/pages/Account/AddAccounts.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path:'/addproduct',
        name: 'Add Product',
        component: AddProduct
      },
      {
        path:'/editproduct',
        name: 'Edit Product',
        component: EditProduct
      },
      {
        path:'/editmenu',
        name: 'Edit Menu',
        component: EditMenus
      },
      {
        path: '/products',
        name: 'Products',
        component: Product
      },
      {
        path: '/menus',
        name: 'Menus',
        component: Menus
      },
      {
        path: '/addmenu',
        name: 'Add Menu',
        component: AddMenus
      },
      {
        path: '/pending',
        name: 'Pending Orders',
        component: Pending
      },
      {
        path: '/inprogress',
        name: 'In Progress Orders',
        component: InProgress
      },
      {
        path: '/fulfilled',
        name: 'Fulfilled Orders',
        component: Fulfilled
      },
      {
        path: '/invoices',
        name: 'Invoices',
        component: Invoices
      },
      {
        path: '/viewinvoices',
        name: 'Invoices',
        component: ViewInvoices
      },
      {
        path: '/accounts',
        name: 'Accounts',
        component: Accounts
      },
      {
        path: '/addaccounts',
        name: 'Add Accounts',
        component: AddAccounts
      }
    ]
  }
]

export default routes
