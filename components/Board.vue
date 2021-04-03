<template>
<div class="board">
  <div class="actual-board">
    <div
      v-for="location in board" :key="location.id"
      class="location"
      :class="{
        placed: location.placed,
        playable: isLocationBuildable(location),
        unplayable: !location.buildable
      }"
      @click="location.buildable ? performBoardAction(location) : false">

      <strong>{{ location.name }}</strong>
      <hr />
      <p>{{ location.placed ? location.afterBuildText : location.text }}</p>
      <span v-if="!location.buildable">empty region</span>
    </div>
  </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    props: {
      board: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {
      ...mapGetters('game', ['isLocationBuildable'])
    },
    methods: {
      performBoardAction(location) {
        try {
          this.$store.dispatch('game/performBoardAction', location);
        } catch(e) {
          alert(e.message);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .board {
    padding: 2em;
    border: 1px solid;
    width: 90vw;
    height: 80vh;
    position: fixed;
    top: 10vh;
    left: 5vw;
    display: flex;
    justify-content: flex-end;
  }
  .actual-board {
    width: 50vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .location {
    background: white;
    padding: 1em;
    border: 1px solid black;
    cursor: not-allowed;
    transition: transform 0.2s linear;

    &:hover:not(.unplayable) {
      transform: scale(1.125);
    }

    &.playable:not(.placed) {
      border: 1px solid green;
      cursor: pointer;
    }
    &.placed {
      background: rgba(0,255,0,0.5);
      cursor: default;
    }
  }
  p {
    padding: 1em;
  }
</style>
