import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Stage0Step() {
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
              to="/stages" 
              className="inline-flex items-center text-mission-primary hover:text-mission-primary/80 mb-4 transition-colors"
            >
              <span className="mr-2">←</span> Back to Stages
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🛠️ Stage 0: Prepare Equipment
            </h1>
            <p className="text-xl text-gray-700 mb-2">
              <span className="font-semibold">Call Sign:</span> Prepare equipments
            </p>
            <p className="text-lg text-gray-600">
              Sign in and navigate resource group
            </p>
          </div>

          {/* Overview */}
          <div className="bg-blue-50 border-l-4 border-mission-primary p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-3">Mission Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              Before we begin building the Procurement Command Center, we need to prepare our equipment by setting up 
              access to Azure Portal and Microsoft AI Foundry. This step will guide you through signing in to both platforms 
              and identifying your resource group that has been created for this session.
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
                  <h3 className="text-2xl font-semibold mb-2">Sign in to Azure Portal</h3>
                  <p className="text-gray-700 mb-4">
                    Go to the Azure Portal and sign in using your hackathon credentials.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Open your web browser and go to <a href="https://portal.azure.com" target="_blank" rel="noopener noreferrer" className="text-mission-primary hover:underline">https://portal.azure.com</a></li>
                    <li>You will be prompted to sign in</li>
                    <li>Sign in using your hackathon credentials</li>
                    <li>You will see the Azure Portal homepage</li>
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
                  <h3 className="text-2xl font-semibold mb-2">Identify Your Resource Group</h3>
                  <p className="text-gray-700 mb-4">
                    On the Azure Portal homepage, identify the "Resource Group" that has been created for you for this session.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>The facilitators will give you the name of your resource group</li>
                    <li>Look for the resource group in the "recent" section on the homepage</li>
                    <li>If you don't see the resource group in the "recent" section, search for it using the search bar at the top of the page</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-0-step-2.png`}
                      alt="Azure Portal homepage showing Resource Group"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: Azure Portal homepage with Resource Group</p>
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
                  <h3 className="text-2xl font-semibold mb-2">Navigate to Microsoft AI Foundry</h3>
                  <p className="text-gray-700 mb-4">
                    Go to Microsoft AI Foundry. You should be logged in with the same account you used to log in to Azure Portal in step 1.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>Open a new tab or window in your browser</li>
                    <li>Go to <a href="https://ai.azure.com" target="_blank" rel="noopener noreferrer" className="text-mission-primary hover:underline">https://ai.azure.com</a></li>
                    <li>You should be automatically logged in with the same account you used for Azure Portal</li>
                    <li>If prompted to sign in, use the same hackathon credentials</li>
                  </ol>
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
                  <h3 className="text-2xl font-semibold mb-2">Verify Setup Complete</h3>
                  <p className="text-gray-700 mb-4">
                    Confirm that you have successfully accessed Microsoft AI Foundry.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-6">
                    <li>You should see the Microsoft AI Foundry page</li>
                    <li>Verify that you are logged in with the correct account</li>
                    <li>You should now have access to both Azure Portal and Microsoft AI Foundry</li>
                  </ol>
                  <div className="mt-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/stage-0-step-4.png`}
                      alt="Microsoft AI Foundry page"
                      className="rounded-lg shadow-md border border-gray-200 max-w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2 italic">Figure: Microsoft AI Foundry page</p>
                  </div>
                  <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                    <p className="text-green-800 font-semibold">
                      🎉 Congratulations! You have set up all the equipment you need to build Procurement Command Centre!
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
                <span>Successfully signed in to Azure Portal using hackathon credentials</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Identified the Resource Group created for this session</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Navigated to Microsoft AI Foundry (ai.azure.com)</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☑</span>
                <span>Verified access to Microsoft AI Foundry page</span>
              </li>
            </ul>
          </div>

          {/* Next Stage CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-mission-primary to-mission-secondary text-white rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4">🎯 Ready for Stage 1?</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Stage 1: Vendor Scout Agent</h3>
              <p className="text-blue-100 mb-4 leading-relaxed">
                Now that your Azure environment is ready, you'll build an AI-powered agent with knowledge base 
                integration to match vendors with precision and deliver ranked recommendations. Stage 1 includes:
              </p>
              <ul className="space-y-2 text-blue-100 mb-4">
                <li className="flex items-start">
                  <span className="mr-2">🔹</span>
                  <span><strong>1.1 Provision Model:</strong> Set up the AI model for vendor matching</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔹</span>
                  <span><strong>1.2 Upload instructions and knowledge base:</strong> Configure the knowledge base with vendor profiles</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔹</span>
                  <span><strong>1.3 Test:</strong> Validate the vendor matching agent</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/stages"
                className="px-6 py-3 bg-white text-mission-primary rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                View All Stages
              </Link>
              <Link
                to="/stages"
                className="px-6 py-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-blue-400/50 text-center"
              >
                Continue to Stage 1 →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
