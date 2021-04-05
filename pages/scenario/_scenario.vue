<template>
  <div class="container">
    <Board :board="gamestate.board" />
    <Hand :cards="gamestate.hand" />
    <Stats :gamestate="gamestate" />
    <button class="end-turn" @click="$store.dispatch('game/endTurn')">
      Next Year
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import scenarios from '~/services/scenarios';

export default {
  validate({ params }) {
    return scenarios[params.scenario];
  },
  computed: {
    ...mapState('game', ['gamestate'])
  },
  mounted() {
    this.$store.dispatch('game/useScenario', scenarios[this.$route.params.scenario]);
  },
  watch: {
    ['gamestate.win']() {
      if (this.gamestate.win) {
        alert('You win!');
      }
    },
    ['gamestate.lose']() {
      if (this.gamestate.lose) {
        alert('You Lose :(');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: gray;
}
.end-turn {
  position: fixed;
  font-size: 24px;
  padding: 1em;
  right: 1em;
  bottom: 2em;
  cursor: pointer;
}
</style>
