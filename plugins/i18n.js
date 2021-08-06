import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export default ({app, store}) => {
  // Define a instancia do i18n no aplicativo,
  // para poder usar globalmente em nossos componentes
  app.i18n = new VueI18n({

    // Oculta avisos (deixando aqueles que alertam sobre a falta completa
    // de tradução para a chave fornecida)
    silentTranslationWarn: true,

    // Defina um local de fallback caso locale nao possa ser encontrado
    fallbackLocale: 'pt',

    // Defina a localidade inicial (aqui, com base no valor inicial de nossa aplicação)
    locale: window.sessionStorage.getItem('language'),

    // Associe cada local a um arquivo de conteúdo
    messages: {
      pt: require("~/utils/languages/content-pt.json"),
      en: require("~/utils/languages/content-en.json"),
    }
  });
};
