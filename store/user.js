import { v4 as uuidv4 } from 'uuid';
import shipAssets from '~/services/assetdata/ships';
import allCards from '~/services/assetdata/cards';

export function state() {
  return {
    savefiles: [],
    lastSaveFile: null
  }
}

export const mutations = {
  createSaveFile(state, config) {
    state.savefiles.push(config);
  },
  setLastSavefile(state, id) {
    state.lastSaveFile = id;
  },
  deleteAll(state) {
    state.savefiles = [];
    state.lastSaveFile = null;
  },
  updateActiveName(state, name) {
    const active = state.savefiles.find(file => file.id === state.lastSaveFile);
    active.name = name;
  }
}

export const actions = {
  createSaveFile({ commit }, { name = 'Unnamed Savefile' } = {}) {
    const newfile = {
      id: uuidv4(),
      name,
      shipAsset: shipAssets[Math.floor(Math.random()*shipAssets.length)],
      blueprints: [],
      startingDeck: [],
      unlockedCards: JSON.parse(JSON.stringify(allCards))
    };
    commit('createSaveFile', newfile);
    return newfile;
  },
  setLastSavefile({ commit }, id) {
    commit('setLastSavefile', id);
  },
  deleteAll({ commit }) {
    commit('deleteAll');
  },
  updateActiveName({ commit }, name) {
    commit('updateActiveName', name);
  }
}

export const getters = {
  lastPlayed(state) {
    if (!state.lastSaveFile) { return null; }
    return state.savefiles.find(file => file.id === state.lastSaveFile);
  }
}
