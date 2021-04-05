<template>
  <div class="hand">
    <div v-for="card in cards" :key="card.id" @click="run(card)" class="card-container">
      <card :card="card" />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cards: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      run(card) {
        try {
          this.$store.dispatch('game/runCardMutationOnGamestate', card);
          this.$notify({
            text: `Played ${card.name}`,
            type: 'success'
          });
        } catch(e) {
          this.$notify({
            title: 'Cannot be played',
            text: e.message,
            type: 'warn'
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.hand {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .card-container {
    margin-right: 0.5em;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
