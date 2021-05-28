# FHIR Patient Browser Demo App

## online demo
Here is [the online demo](http://fhir-patient.demo.community.intersystems.com/)
You can have it being deployed online too if you change the DNS in GitHub Actions workflow [build-push-gcr.yml](.github/workflows/build-push-gcr.yaml) 
You will need a SERVICE_ACCOUNT_KEY secret that could be collected by request in the [discord channel](https://discord.gg/67hSyh2rmh)


## Endpoint configuration

Adjust main.js to point to your FHIR server
```javascript
var client = Fhir({
  baseUrl: 'https://XXXXXXXXX.execute-api.us-east-2.amazonaws.com/fhir',
  
  headers: {
    'x-api-key':'x5DLGbN52yaYYekXkryCW75rJUHBDMQa1ewwTGfj',
    'accept':'*/*'
  }
```

## Dependencies in build process

Webpack assumed to be installed. See https://webpack.js.org/

```bash
npm install fhir.js
npm install webpack
npx webpack --config webpack.config.js
```