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
            <button @click="editProduct(product)" class="btn btn-primary">Edit</button>
            ||
            <button @click="deleteProduct(product)" class="btn btn-danger">Delete</button>
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
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-4">
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
              <div class="col-md-8">
                <vue-editor v-model="product.description"></vue-editor>Product Image
                <input @change="uploadFile" type="file" class="form-control" />
                <div class="form-group d-flex">
                  <div class="p-1" v-for="image in product.images">
                    <img :src="image" width="90px" height="80px" />
                    <span class="delete-img" @click="deleteFile(image,index)">X</span>
                  </div>
                </div>
              </div>
            </div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="addProduct()" class="btn btn-primary mt-4" v-if="modal == 'new'">Add</button>
            <button
              @click="updateProduct()"
              class="btn btn-primary mt-4"
              v-if="modal == 'edit'"
            >Update</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { fb, db } from "../../firebaseConfig";

export default {
  name: "product",
  components: { VueEditor },
  data() {
    return {
      products: [],
      product: {
        name: null,
        price: null,
        tag: null,
        description: null,
        images: []
      },
      activeItem: null,
      modal: null
    };
  },
  firestore() {
    return {
      products: db.collection("products")
    };
  },
  methods: {
    deleteFile(img, index) {
      let image = fb.storage().refFromURL(img);
      this.product.images.splice(index, 1);
      image
        .delete()
        .then(() => {
          console.log("image deleted");
        })
        .catch(err => {
          console.log("error");
        });
    },
    uploadFile(e) {
      // let file = e.target.files[0];
      // var storageRef = fb.storage().ref("products/" + file.name);

      // storageRef.put(file);

      // console.log(e.target.files[0]);
      if (e.target.files[0]) {
        let file = e.target.files[0];

        var storageRef = fb.storage().ref("products/" + Math.random());

        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...

            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.product.images.push(downloadURL);
            });
          }
        );
      }
    },
    addNew() {
      this.modal = "new";
      $("#product").modal("show");
    },

    addProduct() {
      this.modal = "new";
      this.$firestore.products.add(this.product).then(() => {
        $("#product").modal("hide");
      });
    },

    deleteProduct(product) {
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
          this.$firestore.products.doc(product.id).delete();

          Toast.fire({
            type: "success",
            title: "Deleted Successfully"
          });
        }
      });
    },
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      Toast.fire({
        type: "success",
        title: "Updated  successfully"
      });
      $("#product").modal("hide");
    },
    editProduct(product) {
      this.modal = "edit";
      this.product = product;
      $("#product").modal("show");
    }
  }
};
</script>


<style scoped lang="scss">
.img-wrapp {
  position: relative;
}
.img-wrapp span.delete-img {
  position: absolute;
  top: -14px;
  left: -2px;
}
.img-wrapp span.delete-img:hover {
  cursor: pointer;
}
</style>
