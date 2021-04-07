<template>
<div class="card" :class="{ playable: isCardPlayable(card) }">
  <h1>{{ card.name }}</h1>
  <div class="cost">
    ${{ card.cost }}
  </div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    props: {
      card: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {
      ...mapGetters('game', ['isCardPlayable'])
    }
  }
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 10vw;
  height: 15vh;
  border: 1px solid $black;
  border-radius: 0.25em;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  transition: transform 0.2s;
  cursor: not-allowed;
  color: $black;

  &:hover {
    z-index: 1;
    transform: scale(1.25) translateY(-8%);
  }

  background: #ccc; //unplayable
}
.playable {
  border: 2px solid green;
  background: white;
  cursor: pointer;
}
h1 {
  font-size: 16px;
  width: 100%;
  text-align: center;
  font-weight: bold;
}
.cost {
  position: absolute;
  top: -0.45em;
  left: -0.45em;
  background: white;
  font-weight: bold;
  border: 1px solid;
  border-radius: 100%;
  width: 2em;
  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(236, 198, 10);
}
</style>
