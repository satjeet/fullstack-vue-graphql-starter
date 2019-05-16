import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import es from "vuetify/es5/locale/es";

Vue.use(Vuetify, {
  lang: {
    locales: { es },
    current: "es"
  },
  theme: {
    primary: "#ffc107",
    primario: "#2196f3",
    secondary: "#cddc39",
    accent: "#3f51b5",
    error: "#ff5722",
    warning: "#f44336",
    info: "#8bc34a",
    success: "#2196f3"
  }
});
