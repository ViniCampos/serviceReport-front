<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-4">
          <i class="bi bi-calendar-date"></i>
          <p>Mês</p>
        </div>
        <div class="col-6 pt-2">
            <VueDatePicker
              month-picker
              v-model="month"
              @update:model-value="handleDate"
              select-text="Selecionar"
              locale="pt-BR"
              :enable-time-picker="false"
              :max-date="new Date()"
              focus-start-date>
            </VueDatePicker>
        </div>
      </div>
      <div class="row pb-1">
        <div class="col-12">
        </div>
      </div>
      <div class="row" v-for="item in reportData" :key="item.id">
        <div class="row">
          <div class="col-4">
            <p>{{ formatarData(item.data) }}</p>
          </div>
          <div class="col-6"></div>
          <div class="col-2 trash-button">
            <i class="bi bi-trash" @click="deleteItem(item.id)"></i>
          </div>
        </div>
        <div class="row pb-1">
          <div class="col-3"><i class="bi bi-person-video"></i> {{ item.videos }}</div>
          <div class="col-3"><i class="bi-bootstrap-reboot"></i> {{ item.revisitas }}</div>
          <div class="col-3"><i class="bi bi-clock-history"></i> {{ item.horasTrabalhadas }}</div>
          <div class="col-3"><i class="bi bi-book"></i> {{ item.publicacoes }}</div>
          <!-- <div class="col-2">icon {{ item.estudos ? item.estudos.nome : '' }}</div> -->
        </div>
        <div class="row pb-2">
          <div class="col-12">
            <hr size="0" width="100%">
          </div>
        </div>
      </div>
      <div class="row" v-if="reportData">
        <div class="row">
          <div class="col-4">
            <p>Total mês {{ dateSelected.month + 1 }}</p>
          </div>
        </div>
        <div class="row pb-5">
          <div class="col-3"><i class="bi bi-person-video"></i> {{ totalVideos }}</div>
          <div class="col-3"><i class="bi-bootstrap-reboot"></i> {{ totalRevisitas }}</div>
          <div class="col-3"><i class="bi bi-clock-history"></i> {{ totalHoras }}</div>
          <div class="col-3"><i class="bi bi-book"></i> {{ totalPublicacoes }}</div>
          <!-- <div class="col-2">icon {{ item.estudos ? item.estudos.nome : '' }}</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@vuepic/vue-datepicker/dist/main.css'
import axios from 'axios'
import VueDatePicker from '@vuepic/vue-datepicker'

export default {
  name: 'MonthReportView',
  components: {
    VueDatePicker
  },
  data () {
    return {
      reportData: null,
      nomePublicador: 'Vinicius Alves de Campos',
      totalVideos: 0,
      totalRevisitas: 0,
      totalPublicacoes: 0,
      month: new Date().getMonth(),
      dateSelected: this.getActualDate(),
      horas: 0,
      totalHoras: '00:00'
    }
  },
  mounted () {
    // this.fetchReportedData()
  },
  methods: {
    fetchReportedData () {
      const url = 'https://u9wy0guk1l.execute-api.sa-east-1.amazonaws.com/default/serviceReport'
      console.log('Start Date Selected: ' + new Date().toISOString().split('T')[0])
      console.log(JSON.stringify(this.dateSelected))
      const fullURL = `${url}?publicador=${encodeURIComponent(this.nomePublicador)}&data=${this.dateSelected.year}-${(this.dateSelected.month + 1).toString().padStart(2, '0')}`

      axios.get(fullURL)
        .then(response => {
          // console.log(JSON.stringify(response.data))
          this.reportData = response.data.sort((a, b) => {
            const dataA = new Date(a.data)
            const dataB = new Date(b.data)
            return dataA - dataB
          })
          this.totalVideos = 0
          this.totalRevisitas = 0
          this.totalPublicacoes = 0
          this.horas = 0
          response.data.forEach(item => {
            this.totalVideos += item.videos
            this.totalRevisitas += item.revisitas
            this.totalPublicacoes += item.publicacoes
            const horasTrabalhadas = item.horasTrabalhadas.split(':')
            const horasEmMinutos = parseInt(horasTrabalhadas[0]) * 60 + parseInt(horasTrabalhadas[1])
            this.horas += horasEmMinutos
          })
          const horas = Math.floor(this.horas / 60)
          const minutos = this.horas % 60
          this.totalHoras = horas.toString().padStart(2, '0') + ':' + minutos.toString().padStart(2, '0')
        })
        .catch(error => {
          this.reportData = null
          console.error(error)
        })
    },
    getActualDate () {
      const month = new Date().getMonth()
      const year = new Date().getFullYear()
      const actualDate = { month: month, years: year }
      return actualDate
    },
    handleDate (modelData) {
      console.log(modelData)
      this.dateSelected = modelData
      this.fetchReportedData()
    },
    formatarData (data) {
      const date = new Date(data)
      const dataFormatada = 'Dia ' + (date.getDate() + 1) + ' Mês ' + (date.getMonth() + 1)
      return dataFormatada
    },
    deleteItem (itemId) {
      const url = 'https://u9wy0guk1l.execute-api.sa-east-1.amazonaws.com/default/serviceReport'
      const fullURL = `${url}?publicador=${encodeURIComponent(this.nomePublicador)}&elementId=${encodeURIComponent(itemId)}`

      axios.delete(fullURL)
        .then(response => {
          alert(JSON.stringify('Deletado com sucesso' + JSON.stringify(response.data)))
          this.fetchReportedData()
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

.row {
  margin-right: calc(-1.5 * var(--bs-gutter-x))
}

hr {
  height: 2px;
}

.trash-button {
  position: relative;
  top: -15%;
}

</style>
