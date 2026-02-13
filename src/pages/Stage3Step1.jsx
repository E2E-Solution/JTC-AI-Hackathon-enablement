import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Stage3Step1() {
  const instructionText = `9. Data Analysis & Visualization (Code Interpreter Augmentation)
You have access to a structured CSV dataset containing vendor performance metrics.
This capability is advisory and analytical only and must not interfere with:
- Vendor discovery
- Mandatory information collection
- Email intent detection
- Workflow invocation

9.1 When to Use Code Interpreter
You should invoke the Code Interpreter tool when the user explicitly or implicitly asks to:
- Compare two or more vendors or caterers
- Visualize vendor performance or differences
- Plot, chart, or graph vendor data
- Rank vendors based on performance metrics
- Explore trends, trade-offs, or outliers

Common intent signals include:
- “compare”, “versus”, “vs”, “which is better”
- “visualise / visualize”, “show a chart”, “plot”
- “performance comparison”, “ranking”, “top vendors”

When this intent is detected:
✅ Use Code Interpreter
✅ Load the uploaded CSV dataset
✅ Perform quantitative analysis
✅ Generate a visual chart or diagram

9.2 Visualization Rules
When using Code Interpreter for visualization:
- Prefer bar charts for direct comparisons
- Prefer grouped bar charts for multi-metric comparisons
- Prefer scatter plots for trade-offs (e.g. cost vs quality)

Always include:
- Clear chart title
- Labeled axes
- Vendor names visible and readable

Avoid clutter. Simplicity and clarity are more important than complexity.

9.3 RAG + Visualization Response Structure
When visual analysis is performed, structure your response as:
1) Brief explanation of what is being analyzed (natural language)
2) Visualization generated via Code Interpreter
3) Clear explanation of what the chart shows
4) Practical procurement insight or takeaway

Do not return:
- Charts without explanation
- Long explanations without visuals when visualization is clearly useful

9.4 Behavioral Constraints (Analytics Mode)
- Do not fabricate data outside the CSV
- Do not invent vendors or metrics
- Do not modify vendor IDs or names
- Do not trigger email workflows during analysis or visualization
- Treat the CSV as the single source of truth for numeric values`

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
              to="/stage/3"
              className="inline-flex items-center text-mission-primary hover:text-mission-primary/80 mb-4 transition-colors"
            >
              <span className="mr-2">←</span> Back to Stage 3 Overview
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              📊 Stage 3.1: Enable Code Interpreter & Upload Data
            </h1>
            <p className="text-xl text-gray-700 mb-2">
              <span className="font-semibold">Call Sign:</span> Data Analysis
            </p>
            <p className="text-lg text-gray-600">
              Enable Code Interpreter for your Vendor Scout Agent and upload the vendor review CSV so that you can perform rich data analysis and visualization.
            </p>
          </div>

          {/* Overview */}
          <div className="bg-blue-50 border-l-4 border-mission-primary p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-3">Mission Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              In this step, you will configure Code Interpreter as an action for your Vendor Scout Agent and upload the vendor review dataset. 
              This prepares your agent to run Python-based analysis over vendor performance metrics and generate visual insights during Mission Debrief.
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
                  <h3 className="text-2xl font-semibold mb-2">Go to Agent Playground</h3>
                  <p className="text-gray-700 mb-4">
                    Open the Vendor Scout Agent playground in your Microsoft AI Foundry portal.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Go to your Microsoft AI Foundry portal</li>
                    <li>Open the resource where your Vendor Scout Agent is configured</li>
                    <li>On the resource page, navigate to <strong>Agents</strong> and select your <strong>Vendor Scout</strong> agent</li>
                    <li>Click on <strong>Try in playground</strong> if needed so you can see the agent setup and actions</li>
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
                  <h3 className="text-2xl font-semibold mb-2">Add Code Interpreter Action</h3>
                  <p className="text-gray-700 mb-4">
                    In the <strong>Actions</strong> section of the Setup pane, add the Code Interpreter tool.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>In the agent <strong>Setup</strong> pane, locate the <strong>Actions</strong> section</li>
                    <li>Click <strong>+ Add</strong> in the Actions section</li>
                    <li>Choose to add the <strong>Code Interpreter</strong> action</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-3-1-step-3.png`}
                      alt="Actions section showing + Add and Code Interpreter option"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">
                      Figure: Adding Code Interpreter from the Actions section.
                    </p>
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
                  <h3 className="text-2xl font-semibold mb-2">Upload Vendor Review CSV</h3>
                  <p className="text-gray-700 mb-4">
                    Upload the vendor review CSV file so Code Interpreter can use it for analysis.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>In the Code Interpreter configuration, click <strong>Select local files</strong></li>
                    <li>Choose the file <strong>Vendor_review_sample.csv</strong> from the course materials</li>
                    <li>Click <strong>Upload and save</strong> to attach the CSV to the agent</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-3-1-step-4.png`}
                      alt="Code Interpreter file picker showing Vendor_review_sample.csv"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">
                      Figure: Uploading the Vendor_review_sample.csv file to Code Interpreter.
                    </p>
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
              className="mb-8"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-mission-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  4
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">Append Analysis Instructions</h3>
                  <p className="text-gray-700 mb-4">
                    Add the following analysis and visualization instructions to the bottom of the existing Instructions section.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-4">
                    <p className="text-yellow-800 font-semibold mb-2">📋 Copy and Append These Instructions</p>
                    <p className="text-yellow-700 text-sm">
                      Copy the block below and paste it at the <strong>bottom</strong> of the existing agent instructions.
                    </p>
                  </div>
                  <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700">Instruction Text to Copy:</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(instructionText)
                          alert('Analysis instructions copied to clipboard!')
                        }}
                        className="px-3 py-1 bg-mission-primary text-white rounded text-sm hover:bg-mission-primary/90 transition-colors"
                      >
                        📋 Copy All
                      </button>
                    </div>
                    <pre className="text-xs text-gray-800 whitespace-pre-wrap font-mono overflow-x-auto max-h-96 overflow-y-auto">
                      {instructionText}
                    </pre>
                  </div>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Go to the <strong>Instructions</strong> section in the Setup pane</li>
                    <li>Scroll to the bottom of the existing instructions</li>
                    <li>Paste the instruction block shown above (starting from <strong>\"9. Data Analysis & Visualization\"</strong>)</li>
                    <li>Ensure formatting is readable and consistent with the rest of the instructions</li>
                    <li>Save your changes</li>
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
                <span>Opened the Vendor Scout Agent playground in Microsoft AI Foundry</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Added <strong>Code Interpreter</strong> as an action in the Actions section</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Uploaded <strong>Vendor_review_sample.csv</strong> and clicked <strong>Upload and save</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Appended the analysis instructions (section 9) to the bottom of the agent instructions</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Saved the updated agent configuration</span>
              </li>
            </ul>
            <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-600 rounded">
              <p className="text-green-800 font-semibold">
                🎉 Congratulations! You have configured the Code Interpreter capability for your Vendor Scout Agent and prepared it for data analysis in Mission Debrief!
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
            <h2 className="text-3xl font-bold mb-4">🎯 Ready for Stage 3.2?</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Stage 3.2: Test</h3>
              <p className="text-blue-100 mb-4 leading-relaxed">
                Next, you&apos;ll test Code Interpreter with your uploaded dataset — running comparisons, charts, and insights to complete the Mission Debrief.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/stage/3"
                className="px-6 py-3 bg-white text-mission-primary rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                Back to Stage 3 Overview
              </Link>
              <Link
                to="/stage/3/step/3.2"
                className="px-6 py-3 bg-white text-mission-primary rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                Continue to Stage 3.2 →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}

