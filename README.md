# FHIR Patient Browser Demo App

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