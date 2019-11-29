<template>
  <!--Modal: Login / Register Form-->
  <div>
    <div
      class="modal fade"
      id="login"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog cascading-modal" role="document">
        <!--Content-->
        <div class="modal-content">
          <!--Modal cascading tabs-->
          <div class="modal-c-tabs">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs md-tabs tabs-2 light-blue darken-3" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#panel7" role="tab">
                  <i class="fas fa-user mr-1"></i> Login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#panel8" role="tab">
                  <i class="fas fa-user-plus mr-1"></i> Register
                </a>
              </li>
            </ul>

            <!-- Tab panels -->
            <div class="tab-content">
              <!--Panel 7-->
              <div class="tab-pane fade in show active" id="panel7" role="tabpanel">
                <!--Body-->
                <div class="modal-body mb-1">
                  <div class="md-form form-sm mb-5">
                    <i class="fas fa-envelope prefix"></i>
                    <input
                      v-model="email"
                      type="email"
                      id="modalLRInput10"
                      class="form-control form-control-sm validate"
                    />
                    <label data-error="wrong" data-success="right" for="modalLRInput10">Your email</label>
                  </div>

                  <div class="md-form form-sm mb-4">
                    <i class="fas fa-lock prefix"></i>
                    <input
                      v-model="password"
                      type="password"
                      id="modalLRInput11"
                      class="form-control form-control-sm validate"
                    />
                    <label
                      data-error="wrong"
                      data-success="right"
                      for="modalLRInput11"
                    >Your password</label>
                  </div>
                  <div class="text-center mt-2">
                    <button class="btn btn-info" @click="login">
                      Log in
                      <i class="fas fa-sign-in ml-1"></i>
                    </button>
                  </div>
                </div>
                <!--Footer-->
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-outline-info waves-effect ml-auto"
                    data-dismiss="modal"
                  >Close</button>
                </div>
              </div>
              <!--/.Panel 7-->

              <!--Panel 8-->
              <div class="tab-pane fade" id="panel8" role="tabpanel">
                <!--Body-->
                <div class="modal-body">
                  <div class="md-form form-sm mb-5">
                    <i class="fas fa-envelope prefix"></i>
                    <input
                      type="email"
                      v-model="email"
                      id="modalLRInput12"
                      class="form-control form-control-sm validate"
                    />
                    <label data-error="wrong" data-success="right" for="modalLRInput12">Your email</label>
                  </div>

                  <div class="md-form form-sm mb-5">
                    <i class="fas fa-lock prefix"></i>
                    <input
                      v-model="name"
                      type="text"
                      id="modalLRInput13"
                      class="form-control form-control-sm validate"
                    />
                    <label data-error="wrong" data-success="right" for="modalLRInput13">Your Name</label>
                  </div>

                  <div class="md-form form-sm mb-4">
                    <i class="fas fa-lock prefix"></i>
                    <input
                      v-model="password"
                      type="password"
                      id="modalLRInput14"
                      class="form-control form-control-sm validate"
                    />
                    <label
                      data-error="wrong"
                      data-success="right"
                      for="modalLRInput14"
                    >Your password</label>
                  </div>

                  <div class="text-center form-sm mt-2">
                    <button class="btn btn-info" @click="register">
                      Sign up
                      <i class="fas fa-sign-in ml-1"></i>
                    </button>
                  </div>
                </div>
                <!--Footer-->
                <div class="modal-footer">
                  <div class="options text-right">
                    <p class="pt-1">
                      Already have an account?
                      <a href="#" class="blue-text">Log In</a>
                    </p>
                  </div>
                  <button
                    type="button"
                    class="btn btn-outline-info waves-effect ml-auto"
                    data-dismiss="modal"
                  >Close</button>
                </div>
              </div>
              <!--/.Panel 8-->
            </div>
          </div>
        </div>
        <!--/.Content-->
      </div>
    </div>
    <!--Modal: Login / Register Form-->
  </div>
</template>

<script>
import { fb } from "../firebaseConfig.js";

export default {
  name: "login",
  data() {
    return {
      name: null,
      email: null,
      password: null
    };
  },
  methods: {
    login() {
      fb.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          $("#login").modal("hide");
          this.$router.replace("admin");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    register() {
      fb.auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          $("#login").modal("hide"), this.$router.replace("admin");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }
  }
};
</script>
