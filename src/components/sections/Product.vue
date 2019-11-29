<template>
  <div>
    <div class="container"></div>
    <button @click="addNew()" class="btn btn-primary">Add Product</button>
    <table class="table table-condensed">
      <thead>
        <th>Name</th>
        <th>Price</th>
        <th>Modify</th>
      </thead>
      <tbody>
        <tr v-for="product in products">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>
            <button class="btn btn-primary">Edit</button> ||
            <button @click="deleteProduct(product)" class="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div
      class="modal fade"
      id="product"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productLabel">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <input
                  placeholder="Product Name"
                  v-model="product.name"
                  type="text"
                  class="form-control"
                />
                <br />
                <input
                  placeholder="Product Price"
                  v-model="product.price"
                  type="text"
                  class="form-control"
                />
                <br />
                <input
                  placeholder="Product Tag"
                  v-model="product.tag"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="col-md-6">
                <textarea
                  placeholder="Product Description"
                  v-model="product.description"
                  rows="4"
                  class="form-control"
                ></textarea>
                Product Image
                <input type="file" class="form-control" />
              </div>
            </div>
            <button @click="addProduct()" class="btn btn-primary mt-4">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from "../../firebaseConfig";

export default {
  name: "product",
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null,
        tag: null,
        description: null,
        image: null
      },
      activeItem: null
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    addNew() {
      $("#product").modal("show");
    },

    addProduct() {
      this.$firestore.products.add(this.product).then(() => {
        $("#product").modal("hide");
      });
    },
    getProduct() {},
    deleteProduct(doc) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$firestore.products.doc(doc[".key"]).delete();

          Toast.fire({
            type: "success",
            title: "Deleted Successfully"
          });
        }
      });
    },
    editProduct(product) {},
    updateProduct() {}
  },

  created() {
    this.getProduct();
  }
};
</script>

<style></style>
