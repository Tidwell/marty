import Vue from 'vue';

import TYPES from '~/services/types';

export function state() {
  return {
    gamestate: {
      win: false,
      lose: false,
      turnLimit: 12,
      turn: 1,
      conditions: {
        [TYPES.CONDITION_TEMPERATURE]: 0,
        [TYPES.CONDITION_OXYGEN]: 0
      },
      winConditions: {
        [TYPES.CONDITION_TEMPERATURE]: 0,
        [TYPES.CONDITION_OXYGEN]: 0
      },
      yearlyActions: [],
      production: {
        [TYPES.RESOURCE_MEGACREDIT]: 0,
        [TYPES.RESOURCE_STEEL]: 0,
        [TYPES.RESOURCE_TITANIUM]: 0,
        [TYPES.RESOURCE_PLANTS]: 0,
        [TYPES.RESOURCE_ENERGY]: 0
      },
      resources: {
        [TYPES.RESOURCE_MEGACREDIT]: 0,
        [TYPES.RESOURCE_STEEL]: 0,
        [TYPES.RESOURCE_TITANIUM]: 0,
        [TYPES.RESOURCE_PLANTS]: 0,
        [TYPES.RESOURCE_ENERGY]: 0
      },
      discard: [],
      hand: [],
      board: []
    }
  }
}

export const mutations = {
  win(state) {
    state.gamestate.win = true;
  },
  lose(state) {
    state.gamestate.lose = true;
  },
  revertGamestate(state, gamestateCopy) {
    Vue.set(state, 'gamestate', gamestateCopy);
  },
  advanceTurnCounter(state) {
    state.gamestate.turn += 1;
  },
  useScenario(state, scenario) {
    state.gamestate.win = false;
    state.gamestate.lose = false;
    state.gamestate.turn = 1;
    state.gamestate.yearlyActions = [];
    state.gamestate.discard = [];
    state.gamestate.hand = [];
    state.gamestate.board = [];
    const gamestate = scenario();
    Object.keys(gamestate).forEach(stateProp => {
      state.gamestate[stateProp] = gamestate[stateProp];
    });
  },
  emptyEnergy(state) {
    state.gamestate.resources[TYPES.RESOURCE_ENERGY] = 0;
  },
  [TYPES.PRODUCE](state, { resource = 'all' } = {}) {
    if (resource === 'all') {
      Object.keys(state.gamestate.production).forEach(resource => {
        this.commit(`game/${TYPES.GAIN}`, {
          amount: state.gamestate.production[resource],
          resource
        });
      });
    }
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
  [TYPES.INCREASE_CONDITION](state, { amount = 0, condition }) {
    state.gamestate.conditions[condition] += amount;
  },
  [TYPES.PLACE_IN_DISCARD](state, { card }) {
    state.gamestate.hand = state.gamestate.hand.filter(c => c.id !== card.id);
    state.gamestate.discard.push(card);
  },
  [TYPES.PLACE_IN_HAND](state, { card }) {
    state.gamestate.discard = state.gamestate.discard.filter(c => c.id !== card.id);
    state.gamestate.hand.push(card);
  },
  [TYPES.FLAG_SELF_PLACED](state, { location }) {
    state.gamestate.board.filter(l => l.id === location.id)[0].placed = true;
  },
  [TYPES.ADD_YEARLY_ACTIONS](state, { actions }) {
    state.gamestate.yearlyActions = state.gamestate.yearlyActions.concat(actions);
  }
}

export const actions = {
  useScenario({ commit }, scenario) {
    commit('useScenario', scenario);
  },
  runCardMutationOnGamestate({ commit, dispatch, state }, card) {
    const gamestateCopy = JSON.parse(JSON.stringify(state.gamestate));
    card.actions.forEach(action => {
      try {
        commit(action.type, {...action, card});
      } catch(e) {
        commit('revertGamestate', gamestateCopy);
        throw e;
      }
    });
    dispatch('checkWinCondition');
  },
  endTurn({ commit, dispatch, state }) {
    state.gamestate.discard.forEach(card => {
      commit(TYPES.PLACE_IN_HAND, { card });
    });
    dispatch('checkWinCondition');
    if (state.gamestate.win) {
      //game over
      return;
    }
    dispatch('checkLoseCondition');
    if (state.gamestate.lose) {
      //game over
      return;
    }
    commit('emptyEnergy');
    commit(TYPES.PRODUCE);
    dispatch('runYearlyActions');
    commit('advanceTurnCounter');
  },
  checkWinCondition({ commit, state }) {
    let winning = true;
    Object.keys(state.gamestate.winConditions).forEach((type) => {
      if (state.gamestate.conditions[type] < state.gamestate.winConditions[type]) {
        winning = false;
      }
    });
    if (winning) {
      commit('win');
    }
  },
  checkLoseCondition({ commit, state }) {
    if (state.gamestate.turn >= state.gamestate.turnLimit) {
      commit('lose');
    }
  },
  performBoardAction({ commit, dispatch, state }, location) {
    const gamestateCopy = JSON.parse(JSON.stringify(state.gamestate));
    location.actions.forEach(action => {
      try {
        commit(action.type, {...action, location});
      } catch(e) {
        commit('revertGamestate', gamestateCopy);
        throw e;
      }
    });
    dispatch('checkWinCondition');
  },
  runYearlyActions({ commit, dispatch, state }) {
    const gamestateCopy = JSON.parse(JSON.stringify(state.gamestate));
    state.gamestate.yearlyActions.forEach(action => {
      try {
        commit(action.type, {...action});
      } catch(e) {
        commit('revertGamestate', gamestateCopy);
        throw e;
      }
    });
    dispatch('checkWinCondition');
  }
}

function isCardPlayable(state, card) {
  const stateCopy = JSON.parse(JSON.stringify(state));
  let isPlayable = false;
  try {
    actions.runCardMutationOnGamestate({
      commit(type, action, card) { // test running the actions
        mutations[type](stateCopy, action, card);
      },
      dispatch() {}, // dont worry about checking win/loss or other dispatches
      state: stateCopy
    }, card);
    isPlayable = true;
  } catch (e) {
    //drop
  }
  return isPlayable;
}

function isLocationBuildable(state, location) {
  if (!location.buildable) { return false; }
  const stateCopy = JSON.parse(JSON.stringify(state));
  let isPlayable = false;
  try {
    actions.performBoardAction({
      commit(type, action, location) {
        mutations[type](stateCopy, action, location);
      },
      dispatch() {}, // dont worry about checking win/loss or other dispatches
      state: stateCopy
    }, location);
    isPlayable = true;
  } catch (e) {
    //drop
  }
  return isPlayable;
}

export const getters = {
  isCardPlayable: (state) => {
    return (card) =>  isCardPlayable(state, card)
  },
  isLocationBuildable: (state) => {
    return (location) => isLocationBuildable(state, location);
  }
}


/**
 
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
},


*/
