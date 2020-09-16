import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'REST API for My Diary app', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'REST API for MyDiary is an online journal where users can pen down their thoughts and feelings', // short description of the app
  },
  servers: [
    { url: 'https://diary-app-demo-v1.azurewebsites.net/api/v1', description: 'Deployed server' },
    { url: 'http://localhost:3000/api/v1', description: 'Local development/testing server' },
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'token',
      },
    },
  },
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./docs/**/*.yaml'],
};
// initialize swagger-jsdoc
export default swaggerJSDoc(options);
