<template>
  <div class="admin">
    <div class="page-wrapper chiller-theme toggled">
      <a id="show-sidebar" class="btn btn-sm btn-dark" href="#" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </a>
      <nav id="sidebar" class="sidebar-wrapper">
        <div class="sidebar-content">
          <div class="sidebar-brand">
            <a href="#">Vue Admin</a>
            <div id="close-sidebar" @click="toggleMenu">
              <i class="fas fa-times"></i>
            </div>
          </div>
          <div class="sidebar-header">
            <div class="user-pic">
              <img
                class="img-responsive img-rounded"
                src="https://raw.githubusercontent.com/azouaoui-med/pro-sidebar-template/gh-pages/src/img/user.jpg"
                alt="User picture"
              />
            </div>
            <div class="user-info">
              <span class="user-name">
                Jhon
                <strong>Smith</strong>
              </span>
              <span class="user-role">{{email}}</span>
              <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>Online</span>
              </span>
            </div>
          </div>
          <!-- sidebar-header  -->
          <div class="sidebar-search">
            <div>
              <div class="input-group">
                <input type="text" class="form-control search-menu" placeholder="Search..." />
                <div class="input-group-append">
                  <span class="input-group-text">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- sidebar-search  -->
          <div class="sidebar-menu">
            <ul>
              <li class="header-menu">
                <span>General</span>
              </li>
              <li class="sidebar-dropdown">
                <router-link to="/admin/overview">
                  <i class="fa fa-tachometer"></i>
                  <span>Overview</span>
                </router-link>
              </li>
              <li class="sidebar-dropdown">
                <a href="#">
                  <i class="fa fa-shopping-cart"></i>
                  <span>E-commerce</span>
                </a>
                <div class="sidebar-submenu">
                  <ul>
                    <li>
                      <a href="#">Products</a>
                    </li>
                    <li>
                      <a href="#">Orders</a>
                    </li>
                    <li>
                      <a href="#">Credit cart</a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="sidebar-dropdown">
                <router-link to="/admin/product">
                  <i class="far fa-gem"></i>
                  <span>Products</span>
                </router-link>
              </li>
              <li class="sidebar-dropdown">
                <router-link to="/admin/profile">
                  <i class="far fa-gem"></i>
                  <span>Profile</span>
                </router-link>
              </li>
              <li class="sidebar-dropdown">
                <a href="#">
                  <i class="fa fa-chart-line"></i>
                  <span>Charts</span>
                </a>
                <!-- <div class="sidebar-submenu">
                  <ul>
                    <li>
                      <a href="#">Pie chart</a>
                    </li>
                    <li>
                      <a href="#">Line chart</a>
                    </li>
                    <li>
                      <a href="#">Bar chart</a>
                    </li>
                    <li>
                      <a href="#">Histogram</a>
                    </li>
                  </ul>
                </div>-->
              </li>
              <li class="sidebar-dropdown">
                <a href="#" @click="logout">
                  <i class="fa fa-globe"></i>
                  <span>Logout</span>
                </a>
                <!-- <div class="sidebar-submenu">
                  <ul>
                    <li>
                      <a href="#">Google maps</a>
                    </li>
                    <li>
                      <a href="#">Open street map</a>
                    </li>
                  </ul>
                </div>-->
              </li>
            </ul>
          </div>
          <!-- sidebar-menu  -->
        </div>
        <!-- sidebar-content  -->
      </nav>
      <!-- sidebar-wrapper  -->
      <main class="page-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import { fb } from "../../firebaseConfig.js";

export default {
  name: "admin",
  data() {
    return {
      name: null,
      email: null
    };
  },
  methods: {
    toggleMenu() {
      $(".page-wrapper").toggleClass("toggled");
    },
    logout() {
      fb.auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    var user = fb.auth().currentUser;
    this.email = user.email;
  }
};
</script>

<style></style>
