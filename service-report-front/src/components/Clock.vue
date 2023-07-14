<template>
  <div class="container">
    <div class="row row-cols-3">
      <div class="col-sm-3">
          <i class="icon-tall bi bi-clock-history"></i>
          <p>Horas</p>
      </div>
      <div class="col-sm-4">
        <div class="central-number">
          <span>{{ formatTime(horas, minutos) }}</span>
        </div>
      </div>
      <div class="col-sm-5">
        <div class="row">
          <div class="col-4">
            <button type="button" @click="increment" class="btn btn-primary">+</button>
          </div>
          <div class="col-4">
            <button type="button" @click="decrement" class="btn btn-primary"> - </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Clock',
  props: {
    //  msg: String //NOT NECESSARY RIGHT NOW
  },
  data () {
    return {
      reportData: null,
      contador: '0:00',
      horas: 0,
      minutos: 0
    }
  },
  methods: {
    increment () {
      this.minutos += 30
      if (this.minutos >= 60) {
        this.horas += 1
        this.minutos -= 60
      }
    },
    decrement () {
      if (this.horas > 0 || this.minutos >= 30) {
        this.minutos -= 30
        if (this.minutos <= -30) {
          this.horas -= 1
          this.minutos += 60
        }
      }
    },
    formatTime (horas, minutos) {
      const tempoFormatado = `${horas.toString().padStart(1, '0')}:${minutos.toString().padStart(2, '0')}`
      this.$emit('atualizar-contador', tempoFormatado)
      return tempoFormatado
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.central-number {
  font-size: 50px;
}

</style>
