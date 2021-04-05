<template>
  <div class="stats">
    <div class="top-stats">
      <strong>
        Year:
        <span>{{ pad(gamestate.turn,2) }} / {{ pad(gamestate.turnLimit,2) }}</span>
      </strong>
      <hr />
      <strong>
        Temperature:
        <span>{{ pad(gamestate.conditions.temperature,2) }} / {{ pad(gamestate.winConditions.temperature,2) }}</span>  
      </strong>
      <strong>
        Oxygen:
        <span>{{ pad(gamestate.conditions.oxygen,2) }} / {{ pad(gamestate.winConditions.oxygen,2) }}</span>
      </strong>
    </div>

    <div class="resource-bar">
      <div class="resource-bar-item" v-for="resource in resources" :key="resource">
        <img :src="require(`~/assets/images/${resource}.png`)" />
        <span class="amnt" v-number-transition="{ target: gamestate.resources[resource], iteration: 10, speed: 500 }"></span>
        <span class="production" v-number-transition="{ target: gamestate.production[resource], iteration: 10, speed: 500 }"></span>
      </div>
    </div>
  </div>
</template>

<script>
import NumberTransition from 'vue-number-transition';

  export default {
    directives: {
      NumberTransition
    },
    props: {
      gamestate: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    methods: {
      pad(num, padlen, padchar) {
        const padChar = typeof padchar !== 'undefined' ? padchar : '0';
        const pad = new Array(1 + padlen).join(padChar);
        return (pad + num).slice(-pad.length);
      }
    },
    computed: {
      resources() {
        return Object.keys(this.gamestate.resources);
      }
    },
    data() {
      return {
        columns: [
          {
            label: 'Type',
            field: 'name',
            type: 'string'
          },
          {
            label: 'Amnt',
            field: 'amount',
            type: 'number',
          },
          {
            label: 'Produced / Year',
            field: 'production',
            type: 'number',
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
$green: rgb(9, 228, 9);
.stats {
  position: fixed;
  top: 1em;
  left: 1em;
  background: white;
  padding: 1em;
  border: 1px solid $green;
  background: black;
  color: $green;
}
strong {
  display: flex;
}

.slide-fade-enter-active {
  transition: all .2s ease;
  font-weight: bold;
}
.slide-fade-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  font-weight: bold;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.top-stats {
  flex-direction: column;
  display: flex;
  align-items: flex-end;
  line-height: 1.5;
  margin-bottom: 1em;

  hr {
    width: 100%;
    border: 1px solid $green;
  }
  strong span {
    width: 3.5em;
    text-align: right ;
  }
}
.resource-bar {
  display: flex;
  background: #000;
}
.resource-bar-item {
  border-right: 2px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: black;

  img {
    max-height: 3em;
    margin: 0.25em 0;
  }

  .amnt, .production {
    width: 100%;
    padding: 0.25em 1em;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
  .amnt {
    font-size: 2rem;
    background: #ccc;
    min-width: 6.25rem;
  }
  .production {
    color: white;
    background: rgb(112, 95, 74);
  }
}
</style>
