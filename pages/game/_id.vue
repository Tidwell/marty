<template>
  <div class="overworld">
    <div class="button main-menu">
      <nuxt-link to="/"> <font-awesome-icon icon="angle-left" /> Main Menu</nuxt-link>
    </div>
    <div class="ship-container">
      <img class="ship" :src="require(`~/assets/images/ships/${savefile.shipAsset}`)" />
      <input v-model="savename" />
    </div>
    <ul>
      <li class="button">
        <nuxt-link to="/scenario/temp-oxygen-tutorial">
          Tutorial
        </nuxt-link>
      </li>
      <li class="button">
        <nuxt-link to="/scenario/superheat-moon">
          Superheat Moon
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    validate({ params, store }) {
      return store.state.user.savefiles.find(file => file.id === params.id);
    },
    mounted() {
      this.$store.dispatch('user/setLastSavefile', this.$route.params.id);
    },
    computed: {
      savefile() {
        return this.$store.state.user.savefiles.find(file => file.id === this.$route.params.id);
      },
      savename: {
        get () {
          return this.savefile.name
        },
        set (value) {
          this.$store.commit('user/updateActiveName', value)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.overworld {
  background: black;
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;

  h1 {
    padding: 1em;
    max-width: 300px;
    font-size: 2em;
  }
  input {
    min-width: 20vw;
    margin-left: 1em;
  }
}
.ship-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ship {
  max-width: 20vw;
}
.main-menu {
  position: fixed;
  top: 1em;
  left: 1em;
  width: auto;
  height: auto;
  svg {
    margin-right: 0.25em;
  }
}
</style>
