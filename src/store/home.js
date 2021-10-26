import axios from "axios"
export default {
    state: {
        hot_sale: [],
        guppy: [],
        blogs:[],
        names: [],
        colors: [],
        prices: [],
    },
    mutations: {
        SET_HOT_SALE(state, lishFish) {
            state.hot_sale = lishFish
            console.log("mutations hot_sale", state.hot_sale)
        },
        SET_GUPPY(state, lishFish) {
            state.guppy = lishFish
        },
        SET_BLOGS(state, listBlogs) {
            state.blogs = listBlogs
        },
        SET_NAMES(state, names) {
            state.names = names
            console.log(state.names)
        },
        SET_COLORS(state, colors) {
            state.colors = colors
            console.log(state.colors)
        },
        SET_PRICES(state, prices) {
            state.prices = prices
        },
    },
    actions: {
        async getHomePage(context) {
            try {
                let resp = await axios.get("/home")
                console.log(resp.data.hot_sale)
                context.commit("SET_HOT_SALE", resp.data.hot_sale)
                context.commit("SET_GUPPY", resp.data.guppy)
                context.commit("SET_BLOGS", resp.data.blogs)
                context.commit("SET_NAMES", resp.data.names)
                context.commit("SET_COLORS", resp.data.colors)
                context.commit("SET_PRICES", resp.data.prices)
            } catch (err) {
                console.log("get home page err: ", err.resp)
            }
        }
    }
}