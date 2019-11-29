import Vue from "vue";
import App from "./App.vue";
import "bootstrap";
import "./assets/app.scss";
import jQuery from "jquery";
import router from "./router";
import { fb } from "./firebaseConfig";
import VueFirestore from "vue-firestore";
import Swal from "sweetalert2";

window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

window.Toast = Toast;

window.$ = window.jQuery = jQuery;
import "popper.js";

Vue.use(VueFirestore);
Vue.config.productionTip = false;

let app = "";

fb.auth().onAuthStateChanged(function(user) {
  if (!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});
