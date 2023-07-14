<template>
  <publications
    id="publications"
    @atualizar-contador="publicationsContador">
  </publications>
  <medias
    id="medias"
    @atualizar-contador="mediasContador"
  >
  </medias>
  <clock
    id="clock"
    @atualizar-contador="clockContador"
  >
</clock>
  <div v-if="reportData">
    <p>{{ reportData }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import Publications from '../components/Publications.vue'
import Medias from '../components/Medias.vue'
import Clock from '../components/Clock.vue'

export default {
  name: 'ReportView',
  components: {
    Publications,
    Medias,
    Clock
  },
  data () {
    return {
      reportData: null,
      publications: 0,
      medias: 0
    }
  },
  mounted () {
    //  this.fetchReportData()
  },
  methods: {
    publicationsContador (newValue) {
      this.publications = newValue
      console.log('novo valor publications: ' + this.publications)
    },
    mediasContador (newValue) {
      this.medias = newValue
      console.log('novo valor medias: ' + this.medias)
    },
    clockContador (newValue) {
      this.medias = newValue
      console.log('novo valor clock: ' + this.medias)
    },
    fetchReportData () {
      const url = 'https://u9wy0guk1l.execute-api.sa-east-1.amazonaws.com/default/serviceReport'
      const publicador = 'Vinicius Alves de Campos'
      const fullURL = `${url}?publicador=${encodeURIComponent(publicador)}`

      axios.get(fullURL)
        .then(response => {
          this.reportData = response.data
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style>
  @import "bootstrap-icons/font/bootstrap-icons.css";

.icon-tall {
    font-size: calc(1.375rem + 7.5vw)!important;
}

.central-number {
  position: relative;
  top: 0%;
  font-size: 70px;
}

.btn {
  top: 60%;
  position: relative;
  font-size: 25px;
  font-weight: bold;
  border-radius: 38px
}

i {
  top: 10%;
  position: relative;
}

</style>
