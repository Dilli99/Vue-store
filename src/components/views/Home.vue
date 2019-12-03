<template>
  <div class="home">
    <Navbar />
    <button data-toggle="modal" data-target="#login">Open</button>
    <div class="container"></div>
    <ProductList />
    <MiniCart />
    <Login />
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Login from "../Login";
import ProductList from "../sections/ProductList";
import MiniCart from "../MiniCart.vue";

export default {
  name: "home",
  components: { Navbar, Login, ProductList, MiniCart },
  methods: {}
};
</script>

<style scoped>
.container {
  padding: 2rem 0rem;
}

.table-image {
  thead {
    td,
    th {
      border: 0;
      color: #666;
      font-size: 0.8rem;
    }
  }

  td,
  th {
    vertical-align: middle;
    text-align: center;

    &.qty {
      max-width: 2rem;
    }
  }
}

.price {
  margin-left: 1rem;
}

.modal-footer {
  padding-top: 0rem;
}
</style>
