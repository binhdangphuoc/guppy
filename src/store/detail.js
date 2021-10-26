// import axios from 'axios'
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
        SET_GUPPY_DETAIL(state, guppy) {
            state.guppy_detail = guppy
        }

    },
    actions: {
        // async getDetail({commit}, id) {
        //     try {
        //         console.log("payload:",id)
        //         let resp = await axios.get('/detail/'+id)
        //         commit("SET_DETAIL", resp.data.detail)
        //     } catch (err) {
        //         console.log("error get detail: ",err.resp)
        //     }
        // },
        getGuppyDetail({commit}, guppy) {
            commit("SET_GUPPY_DETAIL", guppy)
        }
    }
}