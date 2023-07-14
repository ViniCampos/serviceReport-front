<template>
  <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
        <span class="fs-4">Report Service</span>
      </a>

      <ul class="nav nav-pills">
        <li class="nav-item"><a href="/#/report" class="nav-link active" aria-current="page">Relatório</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Mês</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Ano</a></li>
        <li class="nav-item"><a href="#" class="nav-link">Estudos</a></li>
      </ul>
    </header>
  </div>
  <router-view/>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
</template>

<script>

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
