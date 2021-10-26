import axios from 'axios'
export default {
    state: {
        list_blogs: [],

    },
    mutations: {
        SET_LIST_BLOGS(state, listBlogs) {
            state.list_blogs = listBlogs
            console.log("mutations list_guppy: ", state.list_blogs)
        },

    },
    actions: {
        async getListBlogs({commit}, page) {
            try {
                console.log("payload:",page)
                let resp = await axios.get('/blogs/page'+ page)
                commit("SET_LIST_BLOGS", resp.data.list_blogs)
            } catch (err) {
                console.log("error get blogs: ",err.resp)
            }
        },
    }
}