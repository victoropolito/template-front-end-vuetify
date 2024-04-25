import { createVuetify } from 'vuetify'

import colors from 'vuetify/util/colors'

export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.white, // #FFFFFF
          secondary: colors.red.lighten4, // #FFCDD2
        }
      },
    },
  },
})
