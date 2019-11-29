<template>
  <div class="home">
    <Navbar />
    <button data-toggle="modal" data-target="#login">Open</button>
    <Login />
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Login from "../Login";

export default {
  name: "home",
  components: { Navbar, Login },
  methods: {}
};
</script>

<style></style>
