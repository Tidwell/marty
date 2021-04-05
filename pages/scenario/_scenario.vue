<template>
  <div class="container">
    <Board :board="gamestate.board" />
    <Hand :cards="gamestate.hand" />
    <div class="stats-panel">
      <modal name="stats-modal" draggable :clickToClose="false" :shiftX="0.01" :shiftY="0.01">
        <Stats :gamestate="gamestate" />
      </modal>
    </div>
    <button class="button end-turn" @click="$store.dispatch('game/endTurn')">
      <font-awesome-icon icon="hourglass-end" /> Next Year
    </button>
    <modal name="win" :clickToClose="false">
      <div class="win">
        Successful Terraform!
        <button class="button" @click="exit">
          Claim Rewards
        </button>
      </div>
    </modal>
    <modal name="lose" :clickToClose="false">
      <div class="lose">
        Terraforming Failed :(
        <button class="button" @click="exit">
          <font-awesome-icon icon="forward" /> Next Gig
        </button>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import scenarios from '~/services/scenarios';

export default {
  validate({ params }) {
    return scenarios[params.scenario];
  },
  computed: {
    ...mapState('game', ['gamestate']),
    ...mapGetters('user', ['lastPlayed'])
  },
  mounted() {
    this.$store.dispatch('game/useScenario', scenarios[this.$route.params.scenario]);
    this.$modal.show('stats-modal');
  },
  watch: {
    ['gamestate.win']() {
      if (this.gamestate.win) {
        this.$modal.show('win');
      }
    },
    ['gamestate.lose']() {
      if (this.gamestate.lose) {
        this.$modal.show('lose');
      }
    }
  },
  methods: {
    exit() {
      this.$modal.hide('win');
      this.$modal.hide('lose');
      this.$router.push(`/game/${this.lastPlayed.id}`)
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
  width: auto;
  height: auto;
  position: fixed;
  font-size: 24px;
  padding: 1em;
  right: 1em;
  bottom: 2em;
  cursor: pointer;
  flex-direction: row;

  svg {
    margin-right: 0.25em;
  }

  &:hover {
    color: $green;
  }
}

.stats-panel {
  /deep/ .vm--container {
    pointer-events: none;

    .vm--overlay {
      background: transparent;
    }

    .vm--modal {
      pointer-events: all;
      background-color: transparent;
      box-shadow: none;
    }
  }
}
.win, .lose {
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  border: 4px solid $green;
  background: black;

  .button {
    width: auto;
    height: auto;
    flex-direction: row;
    svg {
      margin-right: 0.25em;
    }
  }
}
.win {
  color: rgb(70, 70, 165);
}
.lose {
  color: rgb(160, 54, 54);
}
</style>
