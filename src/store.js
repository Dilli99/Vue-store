import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    addToCart(state, item) {
      state.cart.push(item);
    }
  }
});
