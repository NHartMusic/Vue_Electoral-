import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddCombo from '@/components/AddCombo'
import EditCombo from '@/components/EditCombo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-combo',
      name: 'AddCombo',
      component: AddCombo
    },
    {
      path: '/edit-combo/:combo_slug',
      name: 'EditCombo',
      component: EditCombo
    }
  ]
})
