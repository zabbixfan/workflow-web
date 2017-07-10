import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Cookies from 'js-cookie'

Vue.use(VueRouter)

function load(component) {
    return () => System.import(`../views/${component}.vue`)
}

const router = new VueRouter({
    /*
     * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
     * it is only to be used only for websites.
     *
     * If you decide to go with "history" mode, please also open /config/index.js
     * and set "build.publicPath" to something other than an empty string.
     * Example: '/' instead of current ''
     *
     * If switching back to default "hash" mode, don't forget to set the
     * build publicPath back to '' so Cordova builds work again.
     */

    routes: [{
        path: '/',
        component: load('Index-layout'),
        navName: '首页',
        navIcon: 'fa-home',
        hasSub: false,
        children: [{
            path: '',
            component: load('index')
        }]
    }, {
        path: '/',
        component: load('Index-layout'),
        navName: '工单管理',
        navIcon: 'fa-home',
        hasSub: true,
        children: [{
            path: 'apply/',
            navName: '工单申请',
            component: load('ticket/apply'),
            meta: {show: true},
            children: [{
                path: 'projectapply',
                component: load('ticket/apply/projectinfo'),
                meta: {show: false}
            }, {
                path: 'codehub',
                component: load('ticket/apply/codehub'),
                meta: {show: false}
            }]
        }, {
            path: 'ticketlist',
            navName: '工单列表',
            component: load('ticket/ticketlist'),
            hasSub: false

        }]
    }, {
        path: '/',
        component: load('Index-layout'),
        children: [{
                path: 'ticketlist/project/:id',
                component: load('ticket/apply/projectinfo')
            }]
    }, {
        path: '*',
        component: load('error/404')
    }]
})

router.beforeEach((to, from, next) => {
    if (store.state.account.token) {
        next()
    } else {
        if (to.query.accesstoken) {
            store.dispatch('setUserToken', to.query.accesstoken)
            next()
        } else if (Cookies.get('token')) {
            store.dispatch('setUserToken', Cookies.get('token'))
            next()
        } else {
            let s = `${process.env.AUTH_SERVER_HOST}/login?appid=${process.env.APP_ID}&callback=${encodeURI(process.env.LOCAL_HOST + '/%23' + to.fullPath)}`
            location.href = s
        }
    }
})

export default router
