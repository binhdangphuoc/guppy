import axios from 'axios'


export default {
    state: {
        add_images: null,
        add_videos: null,
        add_guppy: null,
        error_sending: null,

        list_guppy_info: [],
        list_guppy_info_root: [],
    },
    mutations: {
        SET_ADD_IMAGES(state, resp) {
            state.add_images = resp;
        },
        SET_ADD_VIDEOS(state, resp) {
            state.add_videos = resp;
        },
        SET_ADD_GUPPY(state, resp) {
            state.add_guppy = resp;
            console.log("result: ", state.add_guppy)
        },
        RESET_STATE(state) {
            state.add_guppy = null;
            state.add_images = null;
            state.add_videos = null;
            state.error_sending = null;
            console.log("reset: ",state.add_guppy,state.add_images,state.add_videos)
        },
        SET_ERROR(state, err) {
            state.error_sending = err;
        },

        SET_LIST_GUPPY_INFO(state, resp) {
            state.list_guppy_info = resp;
            state.list_guppy_info_root = resp;
            state.list_test = resp;
            console.log(state.list_guppy_info_root)
        }
    },
    actions: {
        async addImages({commit}, payload) {
            try {
                let resp = await axios.post('/admin/images', payload)
                console.log(resp)
                if(resp.data == 0) commit("SET_ERROR", "sending has error")
                else commit("SET_ADD_IMAGES", resp.data)
            } catch (err) {
                console.log("error add images: ",err.resp)
                commit("SET_ERROR", "can not send!")
            }
        },
        async addVideos({commit}, payload) {
            try {
                let resp = await axios.post('/admin/videos', payload)
                console.log(resp)
                if(resp.data == 0) commit("SET_ERROR", "sending has error")
                else commit("SET_ADD_VIDEOS", resp.data)
            } catch (err) {
                console.log("error add images: ",err.resp)
                commit("SET_ERROR", "can not send!")
            }
        },
        async addGuppy({commit}, payload) {
            try {
                console.log("list guppy: ", payload)

                let resp = await axios.post('/admin/guppy-info', payload)
                console.log(resp)
                if(resp.data == 0) commit("SET_ERROR", "sending has error")
                else commit("SET_ADD_GUPPY", resp.data)
            } catch (err) {
                console.log("error add images: ",err.resp)
                commit("SET_ERROR", "can not send!")
            }
        },
        resetState({commit}) {
            commit("RESET_STATE");
        },

        async getListGuppyInfo({commit}, payload) {
            try {
                if(payload == undefined || payload == null || payload == "") payload = "..."
                let a = JSON.stringify({"filter" : payload})
                console.log("name filter: ", a);
                let resp = await axios.post('/admin/guppy-info', a)
                console.log("resp: ",resp)
                commit("SET_LIST_GUPPY_INFO", resp.data)
            } catch (err) {
                console.log("error add images: ",err.resp)
                commit("SET_ERROR", "can'n get guppy info!")
            }
        }

    }

}