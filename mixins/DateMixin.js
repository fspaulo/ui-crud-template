export default {
  methods: {
    /* ----PARA FORMATAR UMA DATA---- */
    /* -------TO FORMAT A DATE------- */
    formatDate(date) { //
      let day = this.addZero(date.getDate())
      let month = [
        this.$t('month.jan'), this.$t('month.feb'), this.$t('month.mar'), this.$t('month.apr'),
        this.$t('month.may'), this.$t('month.jun'), this.$t('month.jul'), this.$t('month.aug'),
        this.$t('month.sep'), this.$t('month.oct'), this.$t('month.nov'), this.$t('month.dec')
      ][date.getMonth()]
      let year = date.getFullYear()
      let hour = this.addZero(date.getHours())
      let min = this.addZero(date.getMinutes())
      let sec = this.addZero(date.getSeconds())

      return `${day}/${month}/${year} - ${hour}:${min}:${sec}`
    },

    /* ----PARA CAPTURAR O MOMENTO FORMATADO---- */
    /* -----TO CAPTURE THE FORMATTED MOMENT----- */
    formatMoment() {
      let lang = window.sessionStorage.getItem('language')
      let moment = require('moment'); /// para capturar o momento
      moment().format();
      moment.locale(lang);

      return moment().format('DD/MMMM/YYYY - HH:mm:ss')
    },

    /* ----ADICIONAR ZERO AOS VALORES COM 1 ALGARISMO---- */
    /* ---------ADD ZERO TO VALUES WITH 1 FIGURE--------- */
    addZero(number){
      if (number <= 9)
        return "0" + number;
      else
        return number;
    }
  }
}
