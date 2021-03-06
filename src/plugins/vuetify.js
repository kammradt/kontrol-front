
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#01579B',
        secondary: '#039BE5',
        support: '#93B5C6',
        open: '#5BB55F',
        progress: '#FFCB6B',
        closed: '#D5756C'
      },
    },
  },
})