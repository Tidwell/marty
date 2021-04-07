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
          this.$notify({
            title: 'Success!',
            text: `${location.name} acquired`,
            type: 'success'
          });
        } catch(e) {
          this.$notify({
            title: 'Cannot be acquired',
            text: e.message,
            type: 'warn'
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .board {
    padding: 2em;
    border: 10px solid rgb(45, 44, 44);
    width: 90vw;
    height: 80vh;
    position: fixed;
    top: 10vh;
    left: 5vw;
    display: flex;
    justify-content: flex-end;
    background: $black;
    background-image: url('~/assets/images/planets/redplanet.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 15vw;
  }
  .actual-board {
    width: 50vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 0.75em;
    grid-row-gap: 0.75em;
  }
  .location {
    background: rgba(0,0,0,0.5);
    padding: 1em;
    border: 1px dashed white;
    cursor: not-allowed;
    transition: transform 0.2s linear;
    color: white;

    &:hover:not(.unplayable) {
      transform: scale(1.125);
    }

    &.playable:not(.placed) {
      border: 1px dashed green;
      cursor: pointer;
    }
    &.placed {
      border: 1px solid green;
      background: rgba(0,255,0,0.5);
      cursor: default;
    }
  }
  p {
    padding: 1em;
  }
</style>
