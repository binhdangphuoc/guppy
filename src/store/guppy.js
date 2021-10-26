import axios from 'axios'
export default {
    state: {
        list_guppy: [],
        cart: [],

    },
    mutations: {
        SET_LIST_GUPPY(state, listFish) {
            state.list_guppy = listFish
            console.log("mutations list_guppy: ", state.list_guppy)
        },
        REMOVE_LIST_GUPPY(state) {
            state.list_guppy = null
        },
        ADD_TO_CART(state, item) {
            // console.log("cart: ", state.cart)
            for(let i in state.cart) {
                console.log(i)
                if(state.cart[i].guppy.id == item.guppy.id) {
                    state.cart[i].cnt += 1;
                    return;
                }
            }
            state.cart.push(item)
            console.log("cart: ", state.cart)
        },
        REMOVE_TO_CART(state, id) {
            for(let i in state.cart) {
                if(state.cart[i].guppy.id == id) {
                    state.cart.splice(i, 1)
                    console.log("cart: ", state.cart)
                }
            }
            console.log("cart remove: ", state.cart)

        },
    },
    actions: {
        async getListGuppy({commit}, page) {
            try {
                commit("REMOVE_LIST_GUPPY")
                console.log("payload:",page)
                let resp = await axios.get('/guppy/page' +page)
                commit("SET_LIST_GUPPY", resp.data.list_guppy)
            } catch (err) {
                console.log("error get guppy: ",err.resp)
            }
        },
        async getSale({commit}, page) {
            try {
                commit("REMOVE_LIST_GUPPY")
                console.log("payload:",page)
                let resp = await axios.get('/sale/page' + page)
                commit("SET_LIST_GUPPY", resp.data.sale)
            } catch (err) {
                console.log("error get sale: ",err.resp)
            }
        },
        async addToCart({commit}, item) {
            commit("ADD_TO_CART", item)
        },
        async removeToCart({commit}, id) {
            commit("REMOVE_TO_CART", id)
        }
    }

}