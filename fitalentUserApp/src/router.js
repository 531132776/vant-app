import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    // scrollBehavior(to, from, savedPosition) {
    //     return { x: 0, y: 0 }
    // },
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/home',
            name: 'home',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/home/home.vue'),
            meta: {
                // keepAlive: true
            }
        },
        //门店详情
        {
            path: '/storeDetails',
            name: 'storeDetails',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Store_details/storeDetails.vue'),
            meta: {
                title: '门店详情',
                // keepAlive: true
            }
        },
        {
            path: '/leagueDetails',
            name: 'leagueDetails',
            meta: {
                title: '团课详情'
            },
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/League_class/detail.vue')
        },
        //私教详情
        {
            path: '/Privatedetails',
            name: 'Privatedetails',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Private_Education/Privatedetails.vue'),
            meta: {
                title: '私教',
                // keepAlive: true
            }
        },
        //教练证书
        {
            path: '/certificate',
            name: 'certificate',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Private_Education/certificate.vue'),
            meta: {
                title: '教练证书'
            }
        },
        // 私教体验课详情
        {
            path: '/CourseDetails',
            name: 'CourseDetails',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Private_Education/CourseDetails.vue'),
            meta: {
                title: '私教',
                // keepAlive: true,
            }
        },
        // 私教包月详情
        {
            path: '/privatemonthly',
            name: 'privatemonthly',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Private_Education/privatemonthly.vue'),
            meta: {
                title: '私教'
            }
        },
        // 购买订单详情
        {
            path: '/purchaseOrderDetails',
            name: 'purchaseOrderDetails',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Private_Education/purchaseOrderDetails.vue'),
            meta: {
                title: '订单详情'
            }
        },
        //私教课程状态（进行中，已完成）
        {
            path: '/PrivateTeachingStatus',
            name: 'PrivateTeachingStatus',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Private_Education/PrivateTeachingStatus.vue'),
            meta: {
                title: '课程详情',
                // keepAlive: true
            }
        },
        {
            path: '/trainingCamp',
            name: 'trainingCamp',
            meta: {
                title: '训练营详情',
            },
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Training_camp/detail.vue')
        },
        {
            path: '/orderDetails',
            name: 'orderDetails',
            meta: {
                title: '订单详情'
            },
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/League_class/orderDetails.vue')
        },
        {
            path: '/payMoney',
            name: 'payMoney',
            meta: {
                title: '支付详情'
            },
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Training_camp/payMoney.vue')
        },
        {
            path: '/report',
            name: 'report',
            meta: {
                title: '体检报告'
            },
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/report/report.vue')
        },
        {
            path: '/meTrainingCamp',
            name: 'meTrainingCamp',
            meta: {
                title: '训练营详情'
            },
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Training_camp/meTrainingCamp.vue')
        },
        {
            path: '/lifeImg',
            name: 'lifeImg',
            meta: {
                title: '生活照'
            },
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Private_Education/lifeImg.vue')
        },
        {
            path: '/meLeagueClass',
            name: 'meLeagueClass',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/League_class/meLeagueClass.vue'),
            meta: {
                title: '团课详情'
            }
        },
        {
            path: '/trainingCampAgreement',
            name: 'trainingCampAgreement',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Training_camp/trainingCampAgreement.vue'),
            meta: {
                title: '健康传奇训练营协议'
            }
        },
        {
            path: '/privateEducationAgreement',
            name: 'privateEducationAgreement',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Private_Education/privateEducationAgreement.vue'),
            meta: {
                title: '健康传奇私教协议'
            }
        },
        {
            path: '/leagueClassAgreement',
            name: 'leagueClassAgreement',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/League_class/leagueClassAgreement.vue'),
            meta: {
                title: '健康传奇团课协议'
            }
        },
        {
            path: '/fitnessHome',
            name: 'fitnessHome',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Fitness_data/fitnessHome.vue'),
            meta: {
                title: '健身数据'
            }
        },
        {
            path: '/echartsInfo',
            name: 'echartsInfo',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Fitness_data/echartsInfo.vue'),
            meta: {
                title: '健身数据'
            }
        },
        {
            path: '/vip',
            name: 'vip',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/vip/detail.vue'),
            meta: {
                title: 'VIP会员'
            }
        },
        {
            path: '/purchaseVip',
            name: 'purchaseVip',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/vip/orderDetails.vue'),
            meta: {
                title: '购买会员'
            }
        },
        {
            path: '/vipAgreement',
            name: 'vipAgreement',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/vip/vipAgreement.vue'),
            meta: {
                title: '会员协议'
            }
        },
        {
            path: '/couponDetails',
            name: 'couponDetails',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/vip/couponDetails.vue'),
            meta: {
                title: '优惠券说明'
            }
        },
        {
            path: '/privilegeDetails',
            name: 'privilegeDetails',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/vip/privilegeDetails.vue'),
            meta: {
                title: '特权说明'
            }
        },
        {
            path: '/couponGiftBag',
            name: 'couponGiftBag',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Private_Education/couponGiftBag.vue'),
            meta: {
                title: '新人大礼包'
            }
        },
        {
            path: '/yearDetail',
            name: 'yearDetail',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Group_purchase/yearDetail.vue'),
            meta: {
                title: '年会员拼团'
            }
        },
        {
            path: '/groupDetail',
            name: 'groupDetail',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Group_purchase/groupDetail.vue'),
            meta: {
                title: '年会员拼团'
            }
        },
        {
            path: '/groupList',
            name: 'groupList',
            component: () =>
                import ( /* webpackChunkName: "about" */ './views/Group_purchase/groupList.vue'),
            meta: {
                title: '拼团狂欢'
            }
        },
    ]
})