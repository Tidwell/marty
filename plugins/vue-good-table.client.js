import Vue from 'vue'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'

import VModal from 'vue-js-modal/dist/ssr.nocss'
import 'vue-js-modal/dist/styles.css'


Vue.use(VueGoodTablePlugin);
Vue.use(VModal, { dialog: true })

export default function(_, inject) {
  inject('modal', VModal)
}
