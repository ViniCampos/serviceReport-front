<template>
  <div class="container">
    <div class="row row-cols-3">
      <div class="col-sm-3">
          <!-- <i class="icon-tall bi bi-book"></i> -->
          <i class="icon-tall bi bi-person-video"></i>
          <p>Vídeos</p>
      </div>
      <div class="col-sm-4">
        <div class="central-number">
          <span>{{ contador }}</span>
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
  name: 'Medias',
  props: {
    //  msg: String //NOT NECESSARY RIGHT NOW
  },
  data () {
    return {
      reportData: null,
      contador: 0
    }
  },
  methods: {
    increment () {
      this.contador++
      this.$emit('atualizar-contador', this.contador)
    },
    decrement () {
      if (this.contador > 0) {
        this.contador--
        this.$emit('atualizar-contador', this.contador)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
