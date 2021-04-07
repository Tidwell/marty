<template>
  <div class="overworld">
    <div class="button main-menu" @click="playSound">
      <nuxt-link to="/"> <font-awesome-icon icon="angle-left" /> Main Menu</nuxt-link>
    </div>
    <div class="centered column info-pane">
      <div class="ship-container">
        <img class="ship" :src="require(`~/assets/images/ships/${savefile.shipAsset}`)" />
        <input v-model="savename" />
      </div>
      <div class="config-container" v-if="lastPlayed">
        <h1>Blueprints & Starting Hand</h1>
        <div class="cardlist">
          <div v-for="card in lastPlayed.unlockedCards" :key="card.id" class="card-container">
            <card :card="card" />
          </div>
        </div>
      </div>
    </div>
    <ul>
      <li class="button" @click="playSound">
        <nuxt-link to="/scenario/temp-oxygen-tutorial">
          Tutorial
        </nuxt-link>
      </li>
      <li class="button" @click="playSound">
        <nuxt-link to="/scenario/superheat-moon">
          Superheat Moon
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import useSound from 'vue-use-sound';
  import buttonSfx from '~/assets/sounds/click.wav';
  import { mapGetters } from 'vuex';


  export default {
    setup() {
      const [play] = useSound(buttonSfx, { volume: 0.025 });

      return {
        playSound: play
      }
    },
    validate({ params, store }) {
      return store.state.user.savefiles.find(file => file.id === params.id);
    },
    mounted() {
      this.$store.dispatch('user/setLastSavefile', this.$route.params.id);
    },
    computed: {
      ...mapGetters('user', ['lastPlayed']),
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
  background-image: url('~/assets/images/starfield.jpg');
  background-size: cover;
  
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;

  input {
    min-width: 20vw;
    margin-left: 1em;
  }
}
.ship-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px dashed $green;
  padding-bottom: 1em;
  margin-bottom: 1em;
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
  padding: 0;
  a {
    padding: 1em;
  }
  svg {
    margin-right: 0.25em;
  }
}
.config-container {
  width: 100%;
  flex: 1;
}
.info-pane {
  background: rgba($black, 0.6);
  border: 2px solid $green;
  border-radius: 0.5em;
  padding: 2em;
  height: 80vh;
}
.cardlist {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 0.25em;
  grid-row-gap: 0.25em;
}
</style>
