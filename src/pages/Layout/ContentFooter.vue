<template>
  <footer class="footer">
    <div class="container">
        <nav>
            <ul>
              <li>
                <router-link :to="{path:'/dashboard'}">Home</router-link>
              </li>
                <li>
                    <a href="#">
                        Company
                    </a>
                </li>
            </ul>
        </nav>
        <div class="copyright text-center">
          &copy; {{ new Date().getFullYear() }} Martin Grove
        </div>
    </div>
  </footer>

</template>
<script>
export default {}

</script>
<style>

</style>
