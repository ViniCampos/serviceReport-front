# service-report-front

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### GET REPORT
    postReportedData () {
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
