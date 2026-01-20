import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const stages = [
  {
    id: 0,
    emoji: '🛠️',
    name: 'Preparation',
    callSign: 'Prepare equipments',
    description: 'Set up the foundation and prepare all necessary resources for the mission.',
    steps: [
      {
        id: '0.1',
        name: 'Sign in and navigate resource group',
        description: 'Sign in to Azure and navigate to the resource group.'
      }
    ]
  },
  {
    id: 1,
    emoji: '🔍',
    name: 'Vendor Scout Agent',
    callSign: 'Vendor Scout',
    description: 'Build an AI-powered agent with knowledge base integration to match vendors with precision and deliver ranked recommendations.',
    steps: [
      {
        id: '1.1',
        name: 'Provision Model',
        description: 'Provision the AI model for vendor matching.'
      },
      {
        id: '1.2',
        name: 'Upload instructions and knowledge base',
        description: 'Upload instructions and populate the knowledge base with vendor profiles and capabilities.'
      },
      {
        id: '1.3',
        name: 'Test',
        description: 'Test the vendor matching agent with sample queries.'
      }
    ]
  },
  {
    id: 2,
    emoji: '📧',
    name: 'Mission Comms',
    callSign: 'RFP Automation',
    description: 'Create Logic Apps workflows to automate RFP email distribution, track responses, and manage approval workflows.',
    steps: [
      {
        id: '2.1',
        name: 'Navigate to logic apps and build workflows',
        description: 'Navigate to Logic Apps and build the necessary workflows for RFP automation.'
      },
      {
        id: '2.2',
        name: 'Create OpenAPI connections',
        description: 'Create OpenAPI connections for the Logic Apps workflows.'
      },
      {
        id: '2.3',
        name: 'Test',
        description: 'Test the RFP automation workflows.'
      }
    ]
  },
  {
    id: 3,
    emoji: '📊',
    name: 'Mission Debrief',
    callSign: 'Data Analysis',
    description: 'Use Code Interpreter with Python to analyze vendor data, generate insights, and create visualizations for decision support.',
    steps: [
      {
        id: '3.1',
        name: 'Prepare Data for Analysis',
        description: 'Extract and structure vendor data for Python analysis.'
      },
      {
        id: '3.2',
        name: 'Run Analysis Scripts',
        description: 'Execute Python scripts to calculate metrics, compare vendors, and identify patterns.'
      },
      {
        id: '3.3',
        name: 'Generate Visualizations',
        description: 'Create charts and graphs that visualize vendor comparisons, cost analysis, and recommendation scores.'
      }
    ]
  }
]

export default function Stages() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-container pt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-center mb-4">
            Mission Stages 🛫
          </h1>
          <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Plot each mission that brings Procurement Command Center to life. 
            This curriculum-style view keeps your team aligned from vendor matching to data-driven insights.
          </p>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Curriculum Flight Plan</h2>
            <p className="text-lg text-gray-700 mb-8">
              Each stage is a focused mission. Complete them in order to ready Procurement 
              Command Center for Sarah's procurement journey.
            </p>
          </div>

          {/* Stages Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <table className="w-full">
              <thead className="bg-mission-primary text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Stage</th>
                  <th className="px-6 py-4 text-left font-semibold">Call Sign</th>
                  <th className="px-6 py-4 text-left font-semibold">Mission Briefing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stages.map((stage, index) => (
                  <motion.tr
                    key={stage.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="text-mission-primary font-semibold flex items-center">
                        <span className="text-2xl mr-2">{stage.emoji}</span>
                        Stage {stage.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">
                      {stage.emoji} {stage.callSign}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      <p className="mb-2">{stage.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {stage.steps.map((step) => (
                          <button
                            key={step.id}
                            className="px-4 py-2 bg-mission-primary text-white rounded-lg hover:bg-mission-primary/90 transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                            onClick={() => {
                              // TODO: Navigate to step detail page
                              console.log(`Navigate to ${stage.id}.${step.id}: ${step.name}`)
                            }}
                          >
                            <span className="font-medium">{step.id}</span> · {step.name}
                          </button>
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stage Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="card"
              >
                <div className="text-5xl mb-4">{stage.emoji}</div>
                <h3 className="text-2xl font-bold mb-2">
                  Stage {stage.id}: {stage.name}
                </h3>
                <p className="text-gray-700 mb-4">{stage.description}</p>
                <div className="text-gray-500 text-sm">
                  Stage details coming soon...
                </div>
              </motion.div>
            ))}
          </div>

          {/* Congratulations Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border-2 border-green-200"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">🎉 Congratulations!</h2>
            <p className="text-lg text-center mb-6 text-gray-700">
              You've completed an incredible journey building Procurement Command Center from the ground up! 
              Here's what you've accomplished:
            </p>
            <ul className="space-y-3 max-w-3xl mx-auto">
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <div>
                  <strong>Built an AI-powered vendor matching system</strong> with knowledge base integration 
                  that delivers ranked recommendations
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <div>
                  <strong>Automated RFP workflows</strong> with Logic Apps that distribute emails, 
                  track responses, and manage approvals
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <div>
                  <strong>Created data-driven insights</strong> using Python analysis and visualizations 
                  that transform procurement data into actionable intelligence
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">✅</span>
                <div>
                  <strong>Integrated end-to-end automation</strong> connecting AI models, workflows, 
                  and analytics into a unified procurement command center
                </div>
              </li>
            </ul>
            <p className="text-center mt-8 text-lg text-gray-700">
              You now have a fully functional procurement system that can match vendors intelligently, 
              automate workflows, and deliver data-driven insights. Well done! 🚀
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
