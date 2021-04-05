<template>
<div class="index">
  <h1>M.A.R.T.Y</h1>
  <h2>Mobile Automatic Robot Terraforming Yacht</h2>
  <ul>
    <li class="button lastsave" v-if="lastSaveFile">
      <nuxt-link :to="`/game/${lastSaveFile}`">Resume Last Played</nuxt-link>
      <div class="centered">
        <img :src="require(`~/assets/images/ships/${lastPlayed.shipAsset}`)" />
        <span>{{ lastPlayed.name }}</span>
      </div>
    </li>
    <h1>All Saves</h1>
    <li class="button" v-for="file in savefiles" :key="file.id">
      <nuxt-link :to="`/game/${file.id}`">
        <img :src="require(`~/assets/images/ships/${file.shipAsset}`)" />
        {{ file.name }}
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
  export default {
    computed: {
      ...mapState('user', ['savefiles', 'lastSaveFile']),
      ...mapGetters('user', ['lastPlayed'])
    },
    methods: {
      async create() {
        const newFile = await this.$store.dispatch('user/createSaveFile', {});
        this.$router.push(`/game/${newFile.id}`);
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
  background: gray;
  min-height: 100vh;
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
.lastsave img {
  max-height: 8vh;
}
</style>
