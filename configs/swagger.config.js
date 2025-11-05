const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Student Service API Documentation',
            version: '1.0.0',
            description: 'API documentation for Student Service Backend',
            contact: {
                name: 'API Support',
                email: 'support@studentservice.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:9999',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: [
        './router/*.js',
        './models/*.js',
        './controllers/*.js'
    ]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;