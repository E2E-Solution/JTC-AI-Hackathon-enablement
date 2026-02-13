import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Stage1Step2() {
  const instructionText = `1. Agent Purpose & Scope
You are a Vendor Sourcing Assistant.
Your core responsibilities are:
Help users identify and filter suitable vendors based on their stated requirements.
Collect mandatory information from the user before contacting a vendor.
Trigger an external workflow (via OpenAPI Logic App) to send vendor emails.
Clearly inform the user whether the email was sent successfully or failed.
You must not send emails directly.
All emails are sent only via the OpenAPI Logic App workflow.

2. Vendor Discovery & Filtering Behavior
When a user describes a requirement, such as:
type of items (e.g. hardware, trophies, laptops, food, services)
category (e.g. hardware, catering, event planning)
budget, timeline, or service type
You should:
Ask clarifying questions only if required to narrow down vendors.
Recommend or shortlist vendors that best match the requirement.
Clearly explain why each vendor is a good match (in simple terms).
✅ At this stage, do not ask for email‑specific details yet.

3. Email Intent Detection
When the user indicates intent such as:
"send an email to this vendor"
"reach out to them"
"email the vendor"
"request a quote"
Here is the tool calling with OpenAPI for DemoEndpoint endpoint:
You must pause execution and move to information‑collection mode.
Use the email address in the files uploaded by user to retrieve vendor email

4. Mandatory Information Collection (Before Sending Email)
Before calling the Logic App, you must collect all three of the following fields.
Ask the user clearly and explicitly for each one:
Summary of the event or request
(What the vendor should know – purpose, context, high‑level description)
Expected date of delivery
(Target delivery date or service date)
Items and quantities of interest
(e.g. "50 trophies", "10 laptops", "buffet for 100 pax")
✅ You must verify that all three fields are provided.
✅ If any are missing, ask only for the missing information.
Do not call the workflow until all required data is collected.

5. Workflow Invocation (OpenAPI Logic App)
Once all mandatory information is present:
Call the OpenAPI Logic App connection.
Pass the following payload:
Vendor name and contact email
Summary of event
Expected date of delivery
Items and quantity
Wait for the response status from the workflow.

6. Post‑Workflow User Response
Based on the workflow response:
✅ If the workflow response indicates success:
Inform the user clearly that the email has been sent.
Mention the vendor name.
Reassure them no further action is required.
Example response:
✅ Your email has been successfully sent to EventCo.
They now have the details of your request and should follow up directly with you.
❌ If the workflow response indicates failure:
Inform the user that the email was not sent.
Do not guess the reason.
Prompt the user to retry.
Example response:
⚠️ I wasn't able to send the email to Goodbites due to a workflow error.
Please try again, or let me know if you want to resend the request.

7. Behavior Constraints
Do not fabricate vendor details or email outcomes.
Do not send emails without explicit user intent.
Do not proceed if any required input is missing.
Always keep responses clear, concise, and action‑oriented.

8. Conversation Style
Professional, helpful, and concise
Procurement‑friendly wording
Avoid technical jargon unless the user asks for it`

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
              to="/stage/1"
              className="inline-flex items-center text-mission-primary hover:text-mission-primary/80 mb-4 transition-colors"
            >
              <span className="mr-2">←</span> Back to Stage 1 Overview
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🔍 Stage 1.2: Upload Instructions and Knowledge Base
            </h1>
            <p className="text-xl text-gray-700 mb-2">
              <span className="font-semibold">Call Sign:</span> Vendor Scout
            </p>
            <p className="text-lg text-gray-600">
              Configure the knowledge base with vendor profiles and capabilities. Upload instructions that will guide the agent in matching vendors accurately.
            </p>
          </div>

          {/* Overview */}
          <div className="bg-blue-50 border-l-4 border-mission-primary p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-3">Mission Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              In this step, you'll configure the Vendor Scout Agent with instructions and populate the knowledge base with vendor profiles and capabilities. 
              The instructions will guide the agent's behavior in matching vendors, collecting information, and triggering workflows. The knowledge base 
              will provide the agent with vendor information to make accurate recommendations.
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
                  <h3 className="text-2xl font-semibold mb-2">Access the Vendor Scout Agent</h3>
                  <p className="text-gray-700 mb-4">
                    Navigate to the agent you created in the previous stage.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>On your "Agents" pane in the resource that you have provisioned, click on the "Vendor Scout" agent that you have created in the previous stage</li>
                    <li>You will see a "Setup" panel open on the right side of the window</li>
                    <li>Take note of the "Instruction", "Knowledge" and "Actions" section. These are the sections you will be configuring to build the Procurement Command Centre</li>
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
                  <h3 className="text-2xl font-semibold mb-2">Review the Setup Panel</h3>
                  <p className="text-gray-700 mb-4">
                    Familiarize yourself with the Setup panel sections.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>You should see the Setup panel on the right side of the window</li>
                    <li>Notice the three main sections: "Instruction", "Knowledge", and "Actions"</li>
                    <li>These sections will be configured to build the Procurement Command Centre</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-1-2-step-2.png`}
                      alt="Setup panel with Instruction, Knowledge, and Actions sections"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: Setup panel showing Instruction, Knowledge, and Actions sections</p>
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
                  <h3 className="text-2xl font-semibold mb-2">Paste Instructions</h3>
                  <p className="text-gray-700 mb-4">
                    In the Instructions Tab, paste the instruction below. Do take time to read through it. Under the third instruction you will notice "Here is the tool calling with OpenAPI for DemoEndpoint endpoint:" - This is for you to input in the next stage.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-4">
                    <p className="text-yellow-800 font-semibold mb-2">📋 Copy and Paste Instructions</p>
                    <p className="text-yellow-700 text-sm">
                      Please copy the entire instruction text below and paste it into the Instructions Tab in the Setup panel.
                    </p>
                  </div>
                  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Instruction Text to Copy:</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(instructionText)
                          alert('Instruction text copied to clipboard!')
                        }}
                        className="px-3 py-1 bg-mission-primary text-white rounded text-sm hover:bg-mission-primary/90 transition-colors"
                      >
                        📋 Copy All
                      </button>
                    </div>
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono overflow-x-auto max-h-96 overflow-y-auto">
                      {instructionText}
                    </pre>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Click on the "Instructions" tab in the Setup panel</li>
                    <li>Copy the entire instruction text shown above (use the "Copy All" button for convenience)</li>
                    <li>Paste the instruction text into the Instructions field</li>
                    <li>Take time to read through the instructions to understand what the agent will do</li>
                    <li><strong>Note:</strong> Under the third instruction, you will notice "Here is the tool calling with OpenAPI for DemoEndpoint endpoint:" - This is for you to input in the next stage</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-1-2-step-4.png`}
                      alt="Instructions tab with pasted instruction text"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: Instructions tab with instruction text pasted</p>
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
                  <h3 className="text-2xl font-semibold mb-2">Add Knowledge Base Files</h3>
                  <p className="text-gray-700 mb-4">
                    Click the "+ Add" under the "Knowledge" tab to add in the file(s) that you downloaded as the pre-requisite for this session.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Click on the "Knowledge" tab in the Setup panel</li>
                    <li>Click the "+ Add" button under the Knowledge tab</li>
                    <li>Select "Files – Upload local files"</li>
                    <li>Click "Select local files" and add the files you have previously downloaded</li>
                    <li>Click "Upload and save" to complete the upload</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-1-2-step-5.png`}
                      alt="Knowledge tab with Add button and file upload option"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: Knowledge tab showing Add button and file upload options</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 5 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-mission-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  5
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">Verify Configuration</h3>
                  <p className="text-gray-700 mb-4">
                    Ensure that both the instructions and knowledge base files have been successfully uploaded.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Verify that the instruction text is visible in the Instructions tab</li>
                    <li>Verify that your knowledge base files are listed in the Knowledge tab</li>
                    <li>Ensure all files have been uploaded successfully</li>
                  </ol>
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
                <span>Successfully accessed the Vendor Scout agent from the Agents pane</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Opened the Setup panel and reviewed the Instruction, Knowledge, and Actions sections</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Copied and pasted the complete instruction text into the Instructions tab</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Read through the instructions and noted the OpenAPI endpoint reference for the next stage</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Added knowledge base files using the "+ Add" button in the Knowledge tab</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Selected "Files – Upload local files" and uploaded the prerequisite files</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Clicked "Upload and save" to complete the knowledge base configuration</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Verified that both instructions and knowledge base files are properly configured</span>
              </li>
            </ul>
            <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-600 rounded">
              <p className="text-green-800 font-semibold">
                🎉 Congratulations! You have configured the vendor scout agent with its instructions and knowledge base for it to answer your queries with! Let's move on to testing next!
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
            <h2 className="text-3xl font-bold mb-4">🎯 Ready for Step 1.3?</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Step 1.3: Test</h3>
              <p className="text-blue-100 mb-4 leading-relaxed">
                Now that your Vendor Scout Agent is configured with instructions and knowledge base, you'll test it with sample queries 
                to validate its ability to match vendors accurately and deliver ranked recommendations.
              </p>
              <ul className="space-y-2 text-blue-100 mb-4">
                <li className="flex items-start">
                  <span className="mr-2">🔹</span>
                  <span>Test the agent with sample procurement queries</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔹</span>
                  <span>Validate vendor matching accuracy</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔹</span>
                  <span>Review ranked recommendations and confidence scores</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/stage/1"
                className="px-6 py-3 bg-white text-mission-primary rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                Back to Stage 1 Overview
              </Link>
              <Link
                to="/stage/1/step/1.3"
                className="px-6 py-3 bg-white text-mission-primary rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                Continue to Step 1.3 →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
