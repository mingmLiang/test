import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';
import addNurse from '@/components/nurse/addNurse/addNurse';
import hasNurse from '@/components/nurse/hasNurse/hasNurse';
import home from '@/components/home/home';
import drugStorage from '@/components/drugStorage/putInStorage/putInStorage';
import checkDrugStorage from '@/components/drugStorage/checkDrugStorage/checkDrugStorage';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(Router);
Vue.use(VueResource);
Vue.use(ElementUI);
export default new Router({
  routes: [
    { path: '/home', name: 'home', component: home },
    { path: '/addNurse', name: 'addNurse', component: addNurse },
    { path: '/hasNurse', name: 'hasNurse', component: hasNurse },
    { path: '/drugStorage', name: 'drugStorage', component: drugStorage },
    { path: '/checkDrugStorage', name: 'checkDrugStorage', component: checkDrugStorage },
    {path: '*', redirect: '/home'}

  ]
});
