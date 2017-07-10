import * as types from '../mutation-types'
import * as http from '../../http'
import api from '../../api'
import Cookies from 'js-cookie'

export default {
    state: {
        user: null,
        email: null,
        token: ''
    },
    getters: {
        userName: state => {
            return state.user ? state.user.name : ''
        },
        userMail: state => {
            return state.user ? state.user.email : ''
        },
        userRole: state => {
            return state.user ? state.user.role : ''
        }
    },
    mutations: {
        [types.LoadUSER](state, user) {
            state.user = user
        },

        [types.LoadToken](state, token) {
            state.token = token
        }
    },
    actions: {
        setUserToken(context, token) {
            context.commit(types.LoadToken, token)
            if (token) {
                // 用户登陆
                http.post(api.getUserByToken, {
                    accesstoken: token
                }).then(res => {
                    let user = res.data.data
                    if (user) {
                        context.commit(types.LoadUSER, user)
                        Cookies.set('token', token)
                    } else {
                        context.dispatch('setUserToken', '')
                    }
                })
            } else {
                // 用户退出
                Cookies.remove('token')
                context.commit(types.LoadUSER, null)
                location.href = process.env.AUTH_SERVER_HOST + '/logout?appid=' + process.env.APP_ID + '&callback=' + encodeURI(process.env.LOCAL_HOST + '/%23')
            }
        }
    }
}
