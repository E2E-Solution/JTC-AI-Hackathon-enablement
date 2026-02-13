import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Stage2Step2() {
  const openApiSchema = `{
  "openapi": "3.0.3",
  "info": {
    "title": "Vendor RFP Email - Logic App HTTP Trigger API",
    "version": "1.0.0",
    "description": "Invoke an Azure Logic App HTTP trigger to send an RFP email to a selected vendor using a structured payload."
  },
  "servers": [
    {
      "url": "",
      "description": "Vendor RFP Logic App"
    }
  ],
  "paths": {
    "/StatefulAgent001/triggers/When_an_HTTP_request_is_received/invoke": {
      "post": {
        "summary": "Send RFP email to vendor (via Logic App)",
        "operationId": "sendVendorRfpEmail",
        "security": [
          {
            "apiKeyHeader": []
          }
        ],
        "parameters": [
          {
            "name": "api-version",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "default": "2022-05-01",
              "example": "2022-05-01"
            }
          },
          {
            "name": "sp",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "default": "/triggers/When_an_HTTP_request_is_received/run",
              "example": "/triggers/When_an_HTTP_request_is_received/run"
            }
          },
          {
            "name": "sv",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "default": "1.0",
              "example": "1.0"
            }
          },
          {
            "name": "sig",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "description": "Logic App trigger signature",
              "example": "v98NHBs9q_NBi3mdBP6KAxYnqPGttMJ9bObZyr4uEko"
            }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/VendorRfpEmailRequest"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful invocation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/VendorRfpEmailResponse"
                }
              }
            }
          },
          "400": {
            "description": "Invalid payload",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/VendorRfpEmailResponse"
                }
              }
            }
          },
          "500": {
            "description": "Workflow error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/VendorRfpEmailResponse"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "securitySchemes": {
      "apiKeyHeader": {
        "type": "apiKey",
        "name": "x-api-key",
        "in": "header",
        "description": "Optional. Use only if you front the Logic App with APIM/custom gateway requiring an API key."
      }
    },
    "schemas": {
      "VendorRfpEmailRequest": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "transactionId": {
            "type": "string",
            "example": "TXN-20260112-001"
          },
          "action": {
            "type": "string",
            "example": "SendVendorRfpEmail"
          },
          "requester": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "name": {
                "type": "string",
                "example": "Jane Smith"
              },
              "role": {
                "type": "string",
                "example": "Procurement Manager"
              },
              "organizationName": {
                "type": "string",
                "example": "Contoso"
              }
            }
          },
          "vendor": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "name": {
                "type": "string",
                "example": "EventCo"
              },
              "email": {
                "type": "string",
                "format": "email",
                "example": "john@eventco.com"
              },
              "category": {
                "type": "string",
                "example": "Event planning"
              },
              "serviceType": {
                "type": "string",
                "example": "Event Management"
              }
            }
          },
          "rfp": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "eventOrRequestTitle": {
                "type": "string",
                "example": "Corporate Awards – Trophies & Laptops"
              },
              "eventSummary": {
                "type": "string",
                "example": "We are sourcing vendors for an internal event and require a quotation for items listed below."
              },
              "expectedDeliveryDate": {
                "type": "string",
                "example": "2026-02-15"
              },
              "itemsSummary": {
                "type": "string",
                "example": "50 × Custom engraved trophies (metal)\\n10 × Business laptops (16GB RAM / 512GB SSD)"
              },
              "notes": {
                "type": "string",
                "example": "Include lead time, delivery method, and quotation validity."
              }
            }
          },
          "metadata": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
              "source": {
                "type": "string",
                "example": "CopilotStudioAgent"
              },
              "timestamp": {
                "type": "string",
                "example": "2026-01-12T16:43:30+08:00"
              }
            }
          }
        }
      },
      "VendorRfpEmailResponse": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "status": {
            "type": "string",
            "description": "Outcome of the workflow.",
            "enum": [
              "Success",
              "Failure"
            ],
            "example": "Success"
          },
          "message": {
            "type": "string",
            "example": "Email sent successfully to vendor."
          },
          "transactionId": {
            "type": "string",
            "example": "TXN-20260112-001"
          },
          "runId": {
            "type": "string",
            "description": "Optional Logic App run identifier for troubleshooting.",
            "example": "08585615257612345678901234567CU12"
          }
        },
        "required": [
          "status",
          "message",
          "transactionId"
        ]
      }
    }
  }
}`

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-container pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/stage/2"
              className="inline-flex items-center text-mission-primary hover:text-mission-primary/80 mb-4 transition-colors"
            >
              <span className="mr-2">←</span> Back to Stage 2 Overview
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              📧 Stage 2.2: Create OpenAPI Connections
            </h1>
            <p className="text-xl text-gray-700 mb-2">
              <span className="font-semibold">Call Sign:</span> RFP Automation
            </p>
            <p className="text-lg text-gray-600">
              Create OpenAPI connections to link the Vendor Scout Agent to the RFP automation workflow. This will enable the agent to trigger email workflows automatically.
            </p>
          </div>

          {/* Overview */}
          <div className="bg-blue-50 border-l-4 border-mission-primary p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-3">Mission Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              In this step, you'll create an OpenAPI connection that links your Vendor Scout Agent to the Logic Apps workflow you built in Step 2.1. 
              This connection enables the agent to automatically trigger the RFP email workflow when a user requests to send an email to a vendor. 
              You'll configure the OpenAPI tool with the HTTP URL from your Logic Apps workflow.
            </p>
          </div>

          {/* Step-by-Step Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">Step-by-Step Instructions</h2>
            
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8 pb-8 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-mission-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  1
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">Access Vendor Scout Agent</h3>
                  <p className="text-gray-700 mb-4">
                    Go back to the Microsoft Foundry Agent playground (Vendor Scout) that you configured in Stage 1.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Navigate back to Microsoft AI Foundry</li>
                    <li>Open the Vendor Scout agent that you created in Stage 1</li>
                    <li>You should see the Setup pane on the right side of the window</li>
                  </ol>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 pb-8 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-mission-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  2
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">Add OpenAPI Tool</h3>
                  <p className="text-gray-700 mb-4">
                    Click "+ Add" on the "Actions" section on the setup pane to add a new action.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>In the Setup pane, locate the "Actions" section</li>
                    <li>Click "+ Add" on the "Actions" section</li>
                    <li>Click "OpenAPI 3.0 specified tool"</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-2-2-step-2.png`}
                      alt="Actions section with Add button and OpenAPI 3.0 specified tool option"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: Actions section with Add button and OpenAPI 3.0 specified tool option</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 pb-8 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-mission-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  3
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">Configure Tool Name and Description</h3>
                  <p className="text-gray-700 mb-4">
                    Enter the name and description for the OpenAPI tool.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Enter the name: <strong>"RFP_email_tool"</strong> in the name field</li>
                    <li>In the description field, enter: <strong>"Use this tool to complete email sending workflow"</strong></li>
                    <li>Click "Next" to proceed</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-2-2-step-4.png`}
                      alt="OpenAPI tool configuration with name and description fields"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: OpenAPI tool configuration page with name and description fields</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 pb-8 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-mission-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  4
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">Paste OpenAPI Schema</h3>
                  <p className="text-gray-700 mb-4">
                    Paste the OpenAPI schema in the box and set the authentication method to "Anonymous".
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-4">
                    <p className="text-yellow-800 font-semibold mb-2">📋 Copy and Paste OpenAPI Schema</p>
                    <p className="text-yellow-700 text-sm">
                      Please copy the entire OpenAPI schema below and paste it into the schema box. Make sure to set the authentication method to "Anonymous".
                    </p>
                  </div>
                  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">OpenAPI Schema to Copy:</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(openApiSchema)
                          alert('OpenAPI schema copied to clipboard!')
                        }}
                        className="px-3 py-1 bg-mission-primary text-white rounded text-sm hover:bg-mission-primary/90 transition-colors"
                      >
                        📋 Copy All
                      </button>
                    </div>
                    <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono overflow-x-auto max-h-96 overflow-y-auto">
                      {openApiSchema}
                    </pre>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Copy the OpenAPI schema shown above (use the "Copy All" button for convenience)</li>
                    <li>Paste the schema into the schema box</li>
                    <li>Set the authentication method to <strong>"Anonymous"</strong></li>
                  </ol>
                </div>
              </div>
            </motion.div>

            {/* Step 5 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8 pb-8 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-mission-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  5
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">Insert HTTP URL</h3>
                  <p className="text-gray-700 mb-4">
                    In line 10 of the schema (the "url" field in the "servers" array), insert your HTTP URL that you copied from the previous stage.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mb-4">
                    <p className="text-blue-800 font-semibold mb-2">💡 Important:</p>
                    <p className="text-blue-700 text-sm">
                      You need to insert the HTTP URL that you copied from Step 2.1 (Stage 2.1, Step 13) into line 10 of the schema. 
                      This is the URL of your Logic Apps workflow HTTP trigger.
                    </p>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Locate line 10 in the schema (the "url" field within the "servers" array)</li>
                    <li>Replace the empty string <code className="bg-gray-100 px-1 rounded">""</code> with your HTTP URL from Step 2.1</li>
                    <li>The URL should look something like: <code className="bg-gray-100 px-1 rounded">https://prod-xx.westus.logic.azure.com:443/workflows/...</code></li>
                    <li>After inserting the URL, click "Next"</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-2-2-step-6.png`}
                      alt="OpenAPI schema with HTTP URL inserted in servers array"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: OpenAPI schema showing HTTP URL in servers array</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 6 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-8 pb-8 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-mission-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  6
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">Create the Tool</h3>
                  <p className="text-gray-700 mb-4">
                    Complete the tool creation process.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Review your configuration to ensure everything is correct</li>
                    <li>Click "Create Tool" to finalize the OpenAPI connection</li>
                    <li>Wait for the tool to be created successfully</li>
                  </ol>
                </div>
              </div>
            </motion.div>

            {/* Step 7 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-mission-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  7
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">Update Instructions with HTTP URL</h3>
                  <p className="text-gray-700 mb-4">
                    In the setup pane, go to the "Instructions" section and input the HTTP URL under step 3.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>In the Setup pane, navigate to the "Instructions" section</li>
                    <li>Locate step 3 in the instructions (the "Email Intent Detection" section)</li>
                    <li>Find the line that says: "Here is the tool calling with OpenAPI for DemoEndpoint endpoint:"</li>
                    <li>Replace or add the HTTP URL from your Logic Apps workflow after this line</li>
                    <li>This ensures the agent knows which endpoint to call when sending emails</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-2-2-step-8.png`}
                      alt="Create Tool button and tool creation confirmation"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: Create Tool button and successful tool creation</p>
                  </div>
                  <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                    <p className="text-green-800 font-semibold mb-2">✅ Completion Note:</p>
                    <p className="text-green-700 text-sm">
                      After completing this step, your Vendor Scout Agent will be fully connected to the Logic Apps workflow. 
                      The agent can now automatically trigger RFP emails when users request to contact vendors.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Completion Check */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <span className="mr-2">✅</span> Completion Checklist
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Successfully accessed the Vendor Scout agent in Microsoft AI Foundry</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Clicked "+ Add" on the "Actions" section in the Setup pane</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Selected "OpenAPI 3.0 specified tool"</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Entered name "RFP_email_tool" in the name field</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Entered description "Use this tool to complete email sending workflow"</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Clicked "Next" to proceed to schema configuration</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Copied and pasted the complete OpenAPI schema into the schema box</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Set authentication method to "Anonymous"</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Inserted the HTTP URL from Step 2.1 into line 10 of the schema (servers array url field)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Clicked "Next" after inserting the HTTP URL</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Clicked "Create Tool" to finalize the OpenAPI connection</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Verified that the tool was created successfully</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Updated the Instructions section with the HTTP URL under step 3</span>
              </li>
            </ul>
            <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-600 rounded">
              <p className="text-green-800 font-semibold">
                🎉 Congratulations! You have connected your Logic Apps workflow to your Vendor Scout Agent!
              </p>
            </div>
          </div>

          {/* Next Stage CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-mission-primary to-mission-secondary text-white rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4">🎯 Ready for Step 2.3?</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Step 2.3: Test</h3>
              <p className="text-blue-100 mb-4 leading-relaxed">
                Now that your OpenAPI connection is set up, you'll test the complete RFP automation workflow. 
                Test the agent's ability to trigger email workflows automatically when users request to contact vendors.
              </p>
              <ul className="space-y-2 text-blue-100 mb-4">
                <li className="flex items-start">
                  <span className="mr-2">🔹</span>
                  <span>Test the complete RFP automation workflow end-to-end</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔹</span>
                  <span>Validate that emails are sent correctly through the Logic Apps workflow</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔹</span>
                  <span>Verify that the agent correctly triggers the workflow when users request vendor contact</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/stage/2"
                className="px-6 py-3 bg-white text-mission-primary rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                Back to Stage 2 Overview
              </Link>
              <Link
                to="/stage/2/step/2.3"
                className="px-6 py-3 bg-white text-mission-primary rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                Continue to Step 2.3 →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
