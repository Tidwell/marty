<template>
  <div class="stats">
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
            label: 'Production',
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
</style>
