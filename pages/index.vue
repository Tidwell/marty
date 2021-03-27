<template>
  <div class="container">
    <Board />
    <Hand :cards="gamestate.hand" />
    <Stats :gamestate="gamestate" />  
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState('game', ['hand', 'gamestate'])
  }
}
</script>

<style>
</style>
