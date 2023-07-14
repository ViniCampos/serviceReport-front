<template>
  <div v-if="reportData">
    <div class="container">
      <div class="row" v-for="item in reportData" :key="item.id">
        <div class="row">
          <div class="col-4">
            <p>{{ formatarData(item.data) }}</p>
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
    </div>
  </div>
</template>

<script>
import '@vuepic/vue-datepicker/dist/main.css'
import axios from 'axios'

export default {
  name: 'MonthReportView',
  components: {
  },
  data () {
    return {
      reportData: null
    }
  },
  mounted () {
    this.fetchReportedData()
  },
  methods: {
    fetchReportedData () {
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
    },
    formatarData (data) {
      const date = new Date(data)
      const dataFormatada = 'Dia ' + date.getDate() + ' Mês ' + (date.getMonth() + 1)
      return dataFormatada
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

</style>
