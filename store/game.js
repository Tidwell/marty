import Vue from 'vue';

const TYPES = {
  RESOURCE_MEGACREDIT: 'megacredit',
  RESOURCE_STEEL: 'steel',
  RESOURCE_TITANIUM: 'titanium',
  RESOURCE_PLANTS: 'plants',
  RESOURCE_ENERGY: 'energy',
  RESOURCE_HEAT: 'heat',

  GAIN: 'gain',
  SPEND: 'spend',
  GAIN_PRODUCTION: 'gainproduction',
  SPEND_PRODUCTION: 'spendproduction',
  PLACE_IN_DISCARD: 'placeindiscard'
};

export function state() {
  return {
    gamestate: {
      production: {
        [TYPES.RESOURCE_MEGACREDIT]: 0,
        [TYPES.RESOURCE_STEEL]: 0,
        [TYPES.RESOURCE_TITANIUM]: 0,
        [TYPES.RESOURCE_PLANTS]: 0,
        [TYPES.RESOURCE_ENERGY]: 0,
        [TYPES.RESOURCE_HEAT]: 0
      },
      resources: {
        [TYPES.RESOURCE_MEGACREDIT]: 0,
        [TYPES.RESOURCE_STEEL]: 0,
        [TYPES.RESOURCE_TITANIUM]: 0,
        [TYPES.RESOURCE_PLANTS]: 0,
        [TYPES.RESOURCE_ENERGY]: 0,
        [TYPES.RESOURCE_HEAT]: 0
      },
      discard: [],
      hand: [
        {
          id: 1,
          name: 'Gain 5 $',
          cost: 3,
          actions: [
            {
              type: TYPES.SPEND,
              amount: 3,
              resource: TYPES.RESOURCE_MEGACREDIT
            },
            {
              type: TYPES.GAIN,
              amount: 5,
              resource: TYPES.RESOURCE_MEGACREDIT
            },
            {
              type: TYPES.PLACE_IN_DISCARD
            }
          ]
        },
        {
          id: 2,
          name: 'Gain 1 $',
          cost: 0,
          actions: [
            {
              type: TYPES.GAIN,
              amount: 1,
              resource: TYPES.RESOURCE_MEGACREDIT
            },
            {
              type: TYPES.PLACE_IN_DISCARD
            }
          ]
        },
        {
          id: 3,
          name: 'Gain 5 steel',
          cost: 5,
          actions: [
            {
              type: TYPES.SPEND,
              amount: 5,
              resource: TYPES.RESOURCE_MEGACREDIT
            },
            {
              type: TYPES.GAIN,
              amount: 5,
              resource: TYPES.RESOURCE_STEEL
            },
            {
              type: TYPES.PLACE_IN_DISCARD
            }
          ]
        },
        {
          id: 4,
          name: 'Gain titanium production',
          cost: 3,
          actions: [
            {
              type: TYPES.SPEND,
              amount: 3,
              resource: TYPES.RESOURCE_MEGACREDIT
            },
            {
              type: TYPES.GAIN_PRODUCTION,
              amount: 1,
              resource: TYPES.RESOURCE_TITANIUM
            },
            {
              type: TYPES.PLACE_IN_DISCARD
            }
          ]
        }
      ]
    }
  }
}

export const mutations = {
  revertGamestate(state, gamestateCopy) {
    Vue.set(state, 'gamestate', gamestateCopy);
  },
  [TYPES.GAIN](state, { amount = 0, resource }) {
    state.gamestate.resources[resource] += amount;
  },
  [TYPES.SPEND](state, { amount = 0, resource }) {
    if (state.gamestate.resources[resource] - amount < 0) {
      throw new Error(`Not enough ${resource}`);
    }
    state.gamestate.resources[resource] -= amount;
  },
  [TYPES.GAIN_PRODUCTION](state, { amount = 0, resource }) {
    state.gamestate.production[resource] += amount;
  },
  [TYPES.SPEND_PRODUCTION](state, { amount = 0, resource }) {
    if (state.gamestate.production[resource] - amount < 0) {
      throw new Error(`Not enough ${resource} production`);
    }
    state.gamestate.production[resource] -= amount;
  },
  [TYPES.PLACE_IN_DISCARD](state, { card }) {
    state.gamestate.hand = state.gamestate.hand.filter(c => c.id !== card.id);
    state.gamestate.discard.push(card);
  }
}

export const actions = {
  runCardMutationOnGamestate({ commit, state }, card) {
    const gamestateCopy = JSON.parse(JSON.stringify(state.gamestate));
    card.actions.forEach(action => {
      try {
        commit(action.type, {...action, card});
      } catch(e) {
        commit('revertGamestate', gamestateCopy);
        throw e;
      }
    });
  }
}

function isCardPlayable(state, card) {
  const stateCopy = JSON.parse(JSON.stringify(state));
  let isPlayable = false;
  try {
    actions.runCardMutationOnGamestate({
      commit(type, action, card) {
        mutations[type](stateCopy, action, card);
      },
      state: stateCopy
    }, card);
    isPlayable = true;
  } catch (e) {
    //drop
  }
  return isPlayable;
}

export const getters = {
  isCardPlayable: (state) => {
    return (card) =>  isCardPlayable(state, card)
  }
}
