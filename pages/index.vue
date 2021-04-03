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
import tempOxygenTutorial from '~/services/scenarios/temp-oxygen-tutorial';

export default {
  computed: {
    ...mapState('game', ['gamestate'])
  },
  mounted() {
    this.$store.dispatch('game/useScenario', tempOxygenTutorial);
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
.end-turn {
  position: fixed;
  font-size: 24px;
  padding: 1em;
  right: 1em;
  bottom: 2em;
}
</style>
