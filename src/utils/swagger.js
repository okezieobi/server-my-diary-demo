import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'REST API for My Diary app', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'REST API for MyDiary is an online journal for personal use', // short description of the app
  },
  servers: [
    { url: 'https://diary-app-demo.herokuapp.com/api/v1', description: 'Deployed server on Heroku' },
    { url: 'http://localhost:5000/api/v1', description: 'Local development/testing server' },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'authorization',
      },
    },
  },
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yml'],
};
// initialize swagger-jsdoc
export default {
  setup: swaggerUI.setup(swaggerJSDoc(options)),
  serve: swaggerUI.serve,
};
