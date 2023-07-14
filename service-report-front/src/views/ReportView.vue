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
  <revisit
    id="revisit"
    @atualizar-contador="revisitContador"
  >
  </revisit>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <VueDatePicker
          text-input
          v-model="date"
          select-text="Selecionar"
          locale="pt-BR"
          :enable-time-picker="false"
          :max-date="new Date()"
          focus-start-date>
        </VueDatePicker>
      </div>
    </div>
  </div>
  <input @click="sendReport" class="btn btn-primary w-90" type="submit" value="Enviar">
  <div v-if="reportData">
    <p>{{ reportData }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import Publications from '../components/Publications.vue'
import Medias from '../components/Medias.vue'
import Clock from '../components/Clock.vue'
import Revisit from '../components/Revisit.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'ReportView',
  components: {
    Publications,
    Medias,
    Clock,
    Revisit,
    VueDatePicker
  },
  data () {
    return {
      reportData: null,
      publications: 0,
      medias: 0,
      revisit: 0,
      clock: '0:00',
      date: null
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
      this.clock = newValue
      console.log('novo valor clock: ' + this.clock)
    },
    revisitContador (newValue) {
      this.revisit = newValue
      console.log('novo valor revisit: ' + this.revisit)
    },
    sendReport () {
      if (this.clock !== '0:00' && this.date !== null) {
        const formattedDate = this.date.toISOString().split('T')[0]
        const report = {
          action: 'insertReport',
          data: {
            nomePublicador: 'Vinicius Alves de Campos',
            data: formattedDate,
            revisitas: this.revisit,
            publicacoes: this.publications,
            videos: this.medias,
            horasTrabalhadas: this.clock
          }
        }
        alert('Report a ser enviado: ' + JSON.stringify(report))
        console.log('Report a ser enviado: ' + JSON.stringify(report))
      } else {
        alert('Preencha os campos')
        console.log('Insira uma data')
      }
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

.w-90 {
  width: 90%;
}

</style>
