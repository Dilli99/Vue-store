<template>
  <div>
    <div class="container-fluid px-1 py-5 mx-auto">
      <div class="row justify-content-center">
        <div class="col-md-10 col-sm-9">
          <div class="card">
            <div class="row">
              <div class="col-md-6 col-lg-4" v-for="product in products">
                <div class="card card-1">
                  <div class="pr-3 row justify-content-end">
                    <div class="fa fa-heart like like-checked"></div>
                  </div>
                  <div
                    class="product-pic"
                    v-for="(image, index) in product.images"
                  >
                    <img class="pic1" :src="image" />
                  </div>
                  <h5 class="product-name">{{ product.name }}</h5>
                  <div class="row px-3 justify-content-between">
                    <p class="price">{{ product.price }}</p>
                    <add-to-cart
                      :p-id="product.id"
                      :name="product.name"
                      :price="product.price"
                    />
                    <!-- <div class="stars">
                      <span class="fa fa-star star-active"></span>
                      <span class="fa fa-star star-active"></span>
                      <span class="fa fa-star star-active"></span>
                      <span class="fa fa-star"></span>
                      <span class="fa fa-star"></span>
                    </div>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../firebaseConfig";
import AddToCart from "../AddToCart";

export default {
  name: "product-list",
  components: { AddToCart },
  data() {
    return {
      products: []
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },

  methods: {
    getImage(images) {
      return images[0];
    }
  }
};
</script>

<style scoped>
body {
  background-color: #6200ea;
  color: #000;
  overflow-x: hidden;
}

.card {
  margin: auto;
  padding: 20px;
  border-radius: 15px;
  margin-top: 50px;
  margin-bottom: 50px;
}

.like {
  color: #cfd8dc;
}

.like-checked {
  color: #e53935;
}

.like:hover {
  color: #e53935;
  cursor: pointer;
}

.pic1 {
  width: 90%;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.pic2 {
  width: 70%;
  height: 180px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.pic3 {
  width: 70%;
  height: 180px;
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.product-pic {
  padding-left: auto;
  padding-right: auto;
  width: 100%;
  height: 180px;
}

.card-1 {
  padding: 0px 30px 0px 30px !important;
  border: none;
}

.category {
  padding-top: 25px;
  color: grey;
}

.product-name {
  padding-bottom: 15px;
}

.price {
  font-size: 18px;
}

.star-active {
  color: #ffca28 !important;
}

.fa-star {
  color: #cfd8dc;
  cursor: pointer;
}</style
>>
