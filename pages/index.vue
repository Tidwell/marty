<template>
<div class="index">
  <h1>M.A.R.T.Y</h1>
  <h2>Mobile Automatic Robot Terraforming Yacht</h2>
  <ul>
    <li class="button lastsave" v-if="lastSaveFile" @click="playSound">
      <nuxt-link :to="`/game/${lastSaveFile}`">
        <span>Resume Last Played</span>
        <div class="centered resume-btm">
          <ship-btn :savefile="lastPlayed" />
        </div>
      </nuxt-link>
    </li>
    <h1>All Saves</h1>
    <li class="button ship-btn" v-for="file in savefiles" :key="file.id" @click="playSound">
      <nuxt-link :to="`/game/${file.id}`">
        <ship-btn :savefile="file" />
      </nuxt-link>
    </li>
    <li class="button" @click="create">
      Create New Save File
    </li>
    <li class="button" @click="clearAll">
      Clear All Saves
    </li>
  </ul>
  <v-dialog />
</div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex';
  import useSound from 'vue-use-sound'
  import buttonSfx from '~/assets/sounds/click.wav'

  export default {
    computed: {
      ...mapState('user', ['savefiles', 'lastSaveFile']),
      ...mapGetters('user', ['lastPlayed'])
    },
    setup() {
      const [play] = useSound(buttonSfx, { volume: 0.025 });

      return {
        playSound: play
      }
    },
    methods: {
      async create() {
        const newFile = await this.$store.dispatch('user/createSaveFile', {});
        this.$router.push(`/game/${newFile.id}`);
        this.playSound();
      },
      clearAll() {
        this.$modal.show('dialog', {
          title: 'Delete Everything?',
          text: 'Are you sure? This Can\'t Be Undone.',
          buttons: [
            {
              title: 'Cancel',
              handler: () => {
                this.$modal.hide('dialog')
              }
            },
            {
              title: 'Delete',
              handler: () => {
                this.$store.dispatch('user/deleteAll');
                this.$modal.hide('dialog')
              }
            }
          ]
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
h1, h2 {
  width: 100%;
  text-align: center;
  padding: 1em 0 0;
}
h2 {
  font-size: 20px;
  padding: 0;
}
.index {
  background-image: url('~/assets/images/starfield.jpg');
  background-attachment: fixed;
  background-size: cover;
  min-height: 100vh;
  color: white;
}
ul {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  a {
    color: $green;
  }

  img {
    max-height: 12vh;
  }
}
.lastsave a {
  flex-direction: column;
  color: white;
  span {
    padding-bottom: 0.5em;
  }
}
.ship-btn {
  padding: 0 1em;
}
.resume-btm {
  max-height: 10vh;
  width: 100%;
  border-top: 1px dashed $green;
}
</style>
