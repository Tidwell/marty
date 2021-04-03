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
    <vue-good-table
      :columns="columns"
      :rows="statGamestate">
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field === 'amount'">
          <transition name="slide-fade" mode="out-in">
            <div :key="`${props.row.amount}`">
              {{ props.row.amount }}
            </div>
          </transition>
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
  export default {
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
      statGamestate() {
        const state = [];
        Object.keys(this.gamestate.resources).forEach(key => {
          state.push({
            name: key,
            amount: this.gamestate.resources[key],
            production: this.gamestate.production[key]
          });
        });
        return state;
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
.stats {
  position: fixed;
  top: 1em;
  left: 1em;
  width: 30vw;
  background: white;
  padding: 1em;
  border: 1px solid black;
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
  }
  strong span {
    width: 3.5em;
    text-align: right ;
  }
}
</style>
