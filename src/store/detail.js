import axios from 'axios'
export default {
    state: {
        guppy_detail: null,
        // guppy_id: 0,
    },
    mutations: {
        // SET_DETAIL(state, detail) {
        //     state.guppy_detail = detail
        //     console.log("mutations detail: ", state.guppy_detail)
        // },
        SET_GUPPY_DETAIL(state, guppyDetail) {
            state.guppy_detail = guppyDetail
            console.log("guppy_detail = ", state.guppy_detail)
        }

    },
    actions: {
        async getGuppyDetail({commit}, id) {
            try {
                console.log("payload get detail id = ",id)
                let resp = await axios.get('/guppy/'+id)
                console.log("resp = ", resp.data)
                commit("SET_GUPPY_DETAIL", resp.data)
            } catch (err) {
                console.log("error get detail: ",err.resp)
            }
        },

    }
}