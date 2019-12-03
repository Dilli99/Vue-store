<template>
  <div>
    <button class="btn btn-primary" @click="addToCart">Add to cart</button>
  </div>
</template>

<script>
export default {
  name: "add-to-cart",
  props: {
    name: String,
    price: String,
    pId: String
  },
  data() {
    return {
      item: {
        productName: this.name,
        productPrice: this.price,
        product_id: this.pId,
        productQTY: 1
      }
    };
  },
  methods: {
    addToCart() {
      $("#cartModal").modal("show");
      this.$store.commit("addToCart", this.item);
    }
  }
};
</script>

<style></style>
