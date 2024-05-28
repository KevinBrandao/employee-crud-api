// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Employee CRUD API',
      description: 'API for managing employees',
      version: '1.0.0',
      contact: {
        name: 'Developer'
      },
      servers: [`http://localhost:${PORT}`]
    }
  },
  apis: ['server.js', 'routes/employees.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
const employeesRoute = require('./routes/employees');
app.use('/employees', employeesRoute);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
