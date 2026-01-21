import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Stage1Step1() {
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
              🔍 Stage 1.1: Provision Model
            </h1>
            <p className="text-xl text-gray-700 mb-2">
              <span className="font-semibold">Call Sign:</span> Vendor Scout
            </p>
            <p className="text-lg text-gray-600">
              Set up the AI model for vendor matching by creating a Microsoft AI Foundry resource and deploying the GPT-4o model.
            </p>
          </div>

          {/* Overview */}
          <div className="bg-blue-50 border-l-4 border-mission-primary p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-3">Mission Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              In this step, you'll provision the AI model that will power the Vendor Scout Agent. You'll create a 
              Microsoft AI Foundry resource and deploy the GPT-4o model, which will be the intelligence behind 
              matching vendors with precision.
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
                  <h3 className="text-2xl font-semibold mb-2">Access Microsoft AI Foundry</h3>
                  <p className="text-gray-700 mb-4">
                    Go to Microsoft AI Foundry. You should already be logged in from Stage 0.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Open your web browser and go to <a href="https://ai.azure.com" target="_blank" rel="noopener noreferrer" className="text-mission-primary hover:underline">https://ai.azure.com</a></li>
                    <li>You should already be logged in with the same account you used in Stage 0</li>
                    <li>If you are not logged in, sign in again with your credentials for this workshop</li>
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
                  <h3 className="text-2xl font-semibold mb-2">Create New Resource</h3>
                  <p className="text-gray-700 mb-4">
                    At the home page, click on "Create New" to start creating your Microsoft AI Foundry resource.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>On the Microsoft AI Foundry home page, locate the "Create New" button</li>
                    <li>Click on "Create New"</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-1-1-step-step-2.png`}
                      alt="Click Create New on Microsoft AI Foundry home page"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: Microsoft AI Foundry home page with Create New button</p>
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
                  <h3 className="text-2xl font-semibold mb-2">Select Microsoft Foundry Resource</h3>
                  <p className="text-gray-700 mb-4">
                    Select the resource type for your AI solution.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>From the options presented, select "Microsoft Foundry Resource"</li>
                    <li>Click "Next" to proceed</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-1-1-step-step-3.png`}
                      alt="Select Microsoft Foundry Resource"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: Select Microsoft Foundry Resource option</p>
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
                  <h3 className="text-2xl font-semibold mb-2">Name Your Resource and Select Region</h3>
                  <p className="text-gray-700 mb-4">
                    Configure your resource with a name and ensure it's in the correct resource group.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Name the resource with your preferred name</li>
                    <li><strong>Important:</strong> Ensure the resource group your project is created in is the same resource group as the one created for you for this session</li>
                    <li>If you're unsure about the resource group, check with your facilitators</li>
                    <li>Select <strong>Region: Southeast Asia</strong></li>
                    <li>Complete the creation process</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-1-1-step-step-4-.png`}
                      alt="Name resource and select region"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: Resource configuration page</p>
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
              className="mb-8 pb-8 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-mission-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  5
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">Navigate to Agents</h3>
                  <p className="text-gray-700 mb-4">
                    Once your agent is provisioned, you'll see the resource page. Navigate to the Agents section.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Wait for your resource to be provisioned</li>
                    <li>Once provisioned, you will see the resource page</li>
                    <li>Click on "Agents" on the side pane</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-1-1-step-step-5.png`}
                      alt="Click on Agents in the side pane"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: Resource page with Agents option in side pane</p>
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
                  <h3 className="text-2xl font-semibold mb-2">Select GPT-4o Model</h3>
                  <p className="text-gray-700 mb-4">
                    You'll see a pop-up window showing all available models. Select the GPT-4o model for this session.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>You will be greeted with a pop-up window</li>
                    <li>This is where you can see all the models that you can deploy for your AI solution</li>
                    <li>For this session, select <strong>"gpt-4o"</strong></li>
                    <li>Click "Confirm"</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-1-1-step-step-6.png`}
                      alt="Select gpt-4o model from pop-up"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: Model selection pop-up window</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 7 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8 pb-8 border-b border-gray-200 last:border-b-0"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-mission-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  7
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">Configure Deployment Type</h3>
                  <p className="text-gray-700 mb-4">
                    Configure the deployment settings for your model.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>In the pop-up window, set the deployment type to <strong>"Global Standard"</strong></li>
                    <li>Click "Deploy"</li>
                    <li>Wait for the deployment to complete</li>
                  </ol>
                </div>
              </div>
            </motion.div>

            {/* Step 8 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-8"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 bg-mission-primary text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  8
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-semibold mb-2">Rename Model to "Vendor Scout"</h3>
                  <p className="text-gray-700 mb-4">
                    The model will be deployed with a random name. Rename it to "Vendor Scout" for easy identification.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>You will see the model deployed with a random name</li>
                    <li>Click on the name to edit it</li>
                    <li>Change the name to <strong>"Vendor Scout"</strong></li>
                    <li>Save the changes</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-1-1-step-step-8.png`}
                      alt="Rename model to Vendor Scout"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: Renamed model to Vendor Scout</p>
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
                <span>Successfully accessed Microsoft AI Foundry</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Created Microsoft Foundry Resource in the correct resource group</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Selected Southeast Asia as the region</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Navigated to Agents section</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Selected and deployed gpt-4o model with Global Standard deployment type</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Renamed the model to "Vendor Scout"</span>
              </li>
            </ul>
            <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-600 rounded">
              <p className="text-green-800 font-semibold">
                🎉 Great Job! You have set up your foundry resource and deployed the model required for Procurement Command Centre!
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
            <h2 className="text-3xl font-bold mb-4">🎯 Ready for Step 1.2?</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Step 1.2: Upload Instructions and Knowledge Base</h3>
              <p className="text-blue-100 mb-4 leading-relaxed">
                Now that your AI model is provisioned, you'll configure the knowledge base with vendor profiles and 
                capabilities. You'll upload instructions that will guide the agent in matching vendors accurately.
              </p>
              <ul className="space-y-2 text-blue-100 mb-4">
                <li className="flex items-start">
                  <span className="mr-2">🔹</span>
                  <span>Upload vendor profiles and capabilities to the knowledge base</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔹</span>
                  <span>Configure instructions for the Vendor Scout Agent</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔹</span>
                  <span>Set up the matching logic and scoring criteria</span>
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
              <button
                disabled
                className="px-6 py-3 bg-blue-600/50 backdrop-blur-sm text-white rounded-lg font-bold text-lg cursor-not-allowed border-2 border-blue-400/30 text-center opacity-60"
              >
                Step 1.2 Coming Soon →
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
