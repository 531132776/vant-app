import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '121',
        userId: '',
        clubInfo: {},
        teamClassList: {},
        recruitScrollY: 0,
        trainingList: {}
    },
    getters: {
        recruitScrollY: state => state.recruitScrollY
    },
    mutations: {
        getUserId(state, i) {
            // sessionStorage.setItem('userId', JSON.stringify(i));
            sessionStorage.setItem('userId', i);
            state.userId = i;
        },
        clubInfo(state, n) {
            sessionStorage.setItem('clubInfo', JSON.stringify(n));
            state.clubInfo = n
        },
        teamClassList(state, n) {
            sessionStorage.setItem('teamClassList', JSON.stringify(n));
            state.teamClassList = n
        },
        trainingList(state, n) {
            sessionStorage.setItem('trainingList', JSON.stringify(n));
            state.trainingList = n
        },
        changeRecruitScrollY(state, recruitScrollY) {
            state.recruitScrollY = recruitScrollY
        }
    },
    actions: {

    }
})