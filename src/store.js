import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

let cart = window.localStorage.getItem("cart");
export default new Vuex.Store({
  state: {
    cart: cart ? JSON.parse(cart) : []
  },
  mutations: {
    removeFromCart(state, item) {
      let index = state.cart.indexOf(item);

      state.cart.splice(index, 1);
      this.commit("saveData");
    },
    addToCart(state, item) {
      state.cart.push(item);

      this.commit("saveData");
    },
    saveData(state) {
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
    }
  }
});
