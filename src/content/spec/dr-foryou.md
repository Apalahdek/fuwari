<html>
  <head>
    <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-standalone-preset.js"></script>
    <link
      rel="stylesheet"
      type="text/css"
      href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css"
    />
    <title>Sorum Valz Store API</title>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script defer>
      window.onload = function () {
        const ui = SwaggerUIBundle({
          spec: {
            openapi: "3.0.0",
            info: {
              version: "1.0.0",
              title: "Sorum Valz Store API",
              description: "This API provides access to the room data for the Sorum Valz Store."
            },
            servers: [
              {
                url: "https://sorum-valz-store.vercel.app",
                description: "Sorum Valz Store API Server"
              }
            ],
            security: [
              {
                application: ["read", "write"]
              }
            ],
            paths: {
              "/api/rooms": {
                get: {
                  summary: "Get all rooms",
                  description: "Retrieve a list of all available rooms.",
                  responses: {
                    "200": {
                      description: "OK",
                      content: {
                        "application/json": {
                          schema: {
                            type: "array",
                            items: {
                              type: "object",
                              properties: {
                                id: {
                                  type: "integer",
                                  description: "Room ID"
                                },
                                name: {
                                  type: "string",
                                  description: "Name of the room"
                                },
                                price: {
                                  type: "number",
                                  format: "float",
                                  description: "Price of the room"
                                },
                                available: {
                                  type: "boolean",
                                  description: "Availability of the room"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            components: {
              schemas: {},
              securitySchemes: {
                application: {
                  type: "oauth2",
                  flows: {
                    clientCredentials: {
                      tokenUrl: "http://example.com/oauth/token",
                      scopes: {
                        write: "allows modifying resources",
                        read: "allows reading resources"
                      }
                    }
                  }
                }
              }
            }
          },
          dom_id: "#swagger-ui",
          deepLinking: true,
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
          plugins: [SwaggerUIBundle.plugins.DownloadUrl],
          layout: "StandaloneLayout",
        });
        window.ui = ui;
      };
    </script>
    <style>
      .swagger-ui .topbar .download-url-wrapper input[type="text"] {
        border: 2px solid #77889a;
      }
      .swagger-ui .topbar .download-url-wrapper .download-url-button {
        background: #77889a;
      }
      .swagger-ui img {
        display: none;
      }
      .swagger-ui .topbar {
        background-color: #ededed;
        border-bottom: 2px solid #c1c1c1;
      }
      .swagger-ui .topbar .download-url-wrapper .select-label {
        color: #3b4151;
      }
    </style>
  </body>
</html>
