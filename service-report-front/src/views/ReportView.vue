<template>
    <div class="container">
      <div class="row row-cols-3">
        <div class="col-sm-3">
            <i class="icon-tall bi bi-book"></i>
            <p>Publicações</p>
        </div>
        <div class="col-sm-4">
          <div class="central-number">
            0
          </div>
        </div>
        <div class="col-sm-5">
          <div class="row">
            <div class="col-2">
              <button type="button" class="btn btn-primary">+</button>
            </div>
            <div class="col-2">
              <button type="button" class="btn btn-primary">-</button>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div v-if="reportData">
      <p>{{ reportData }}</p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ReportView',
  components: {

  },
  data () {
    return {
      reportData: null
    }
  },
  mounted () {
    //  this.fetchReportData()
  },
  methods: {
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
  top: 10%;
  font-size: 70px;
}

.btn {
  top: 60%;
  position: relative;
  font-size: 25px;
  font-weight: bold;
  border-radius: 38px
}

</style>
