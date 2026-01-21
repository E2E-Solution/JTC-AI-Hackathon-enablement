import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Stage1Overview() {
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
              🔍 Stage 1: Vendor Scout Agent
            </h1>
            <p className="text-xl text-gray-700 mb-2">
              <span className="font-semibold">Call Sign:</span> Vendor Scout
            </p>
            <p className="text-lg text-gray-600">
              Build an AI-powered agent with knowledge base integration to match vendors with precision and deliver ranked recommendations.
            </p>
          </div>

          {/* Overview */}
          <div className="bg-blue-50 border-l-4 border-mission-primary p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-3">Mission Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In Stage 1, you'll build the Vendor Scout Agent - an intelligent system that matches vendors with precision 
              using AI models and knowledge base integration. This agent will understand procurement requirements, search 
              through vendor profiles, and deliver ranked recommendations with confidence scores.
            </p>
            <p className="text-gray-700 leading-relaxed">
              The Vendor Scout Agent is the foundation of the Procurement Command Center, enabling Sarah to find the 
              perfect vendor match quickly and confidently.
            </p>
          </div>

          {/* Stage Steps */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold mb-6">Stage 1 Steps</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Step 1.1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="border-2 border-gray-200 rounded-lg p-6 hover:border-mission-primary transition-colors"
              >
                <div className="text-3xl mb-3">1.1</div>
                <h3 className="text-xl font-semibold mb-3">Provision Model</h3>
                <p className="text-gray-700 mb-4">
                  Set up the AI model for vendor matching. You'll create a Microsoft AI Foundry resource and deploy 
                  the GPT-4o model that will power the Vendor Scout Agent.
                </p>
                <Link
                  to="/stage/1/step/1.1"
                  className="inline-block px-4 py-2 bg-mission-primary text-white rounded-lg hover:bg-mission-primary/90 transition-colors text-sm font-medium"
                >
                  Start Step 1.1 →
                </Link>
              </motion.div>

              {/* Step 1.2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="border-2 border-gray-200 rounded-lg p-6 hover:border-mission-primary transition-colors"
              >
                <div className="text-3xl mb-3">1.2</div>
                <h3 className="text-xl font-semibold mb-3">Upload Instructions and Knowledge Base</h3>
                <p className="text-gray-700 mb-4">
                  Configure the knowledge base with vendor profiles and capabilities. Upload instructions that will 
                  guide the agent in matching vendors accurately.
                </p>
                <button
                  disabled
                  className="inline-block px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-sm font-medium"
                >
                  Coming Soon
                </button>
              </motion.div>

              {/* Step 1.3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="border-2 border-gray-200 rounded-lg p-6 hover:border-mission-primary transition-colors"
              >
                <div className="text-3xl mb-3">1.3</div>
                <h3 className="text-xl font-semibold mb-3">Test</h3>
                <p className="text-gray-700 mb-4">
                  Validate the vendor matching agent with sample queries. Test the agent's ability to match vendors 
                  accurately and deliver ranked recommendations.
                </p>
                <button
                  disabled
                  className="inline-block px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-sm font-medium"
                >
                  Coming Soon
                </button>
              </motion.div>
            </div>
          </div>

          {/* What You'll Build */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold mb-4">What You'll Build</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <div>
                  <strong>AI-powered vendor matching system</strong> that understands procurement requirements and 
                  searches through vendor profiles intelligently
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <div>
                  <strong>Knowledge base integration</strong> that stores and retrieves vendor capabilities and profiles
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <div>
                  <strong>Ranked recommendations</strong> with confidence scores to help Sarah make informed decisions
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <div>
                  <strong>Intelligent matching algorithm</strong> that scores vendors based on requirements and capabilities
                </div>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-mission-primary to-mission-secondary text-white rounded-xl p-8 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-4">🚀 Ready to Start?</h2>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Begin with Step 1.1 to provision your AI model. This is the foundation that will power your Vendor Scout Agent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/stage/1/step/1.1"
                className="px-6 py-3 bg-white text-mission-primary rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
              >
                Start Step 1.1: Provision Model →
              </Link>
              <Link
                to="/stages"
                className="px-6 py-3 bg-blue-600/80 backdrop-blur-sm text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl border-2 border-blue-400/50 text-center"
              >
                View All Stages
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
