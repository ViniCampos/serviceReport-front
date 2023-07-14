<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <i class="icon-tall bi bi-calendar-date"></i>
        <p>Data</p>
      </div>
      <div class="col-8">
        <div class="row calendar-aligment">
          <VueDatePicker
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
  </div>
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
  <input @click="sendReport" class="btn btn-primary w-90" type="submit" value="Enviar">
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
    },
    mediasContador (newValue) {
      this.medias = newValue
    },
    clockContador (newValue) {
      this.clock = newValue
    },
    revisitContador (newValue) {
      this.revisit = newValue
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
        this.postReportedData(report)
      } else {
        alert('Preencha os campos')
        console.log('Insira uma data')
      }
    },
    postReportedData (report) {
      const url = 'https://u9wy0guk1l.execute-api.sa-east-1.amazonaws.com/default/serviceReport'

      axios.post(url, report)
        .then(response => {
          alert(JSON.stringify(response.data))
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

.calendar-aligment {
  position: relative;
  top: 30%;
}

</style>
