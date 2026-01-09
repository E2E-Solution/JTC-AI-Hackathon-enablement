import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-mission-primary to-mission-secondary text-white py-16 md:py-24 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                🚀 Project Ignite: Procurement Command Centre
              </h1>
              <p className="text-xl md:text-2xl mb-4 font-semibold text-blue-200">
                Mission: Ignite the Best Vendor Match
              </p>
              <p className="text-lg md:text-xl mb-6 text-blue-100 leading-relaxed">
                Build an intelligent procurement system that matches vendors with precision ✅, 
                automates RFP workflows 📧, and delivers data-driven insights 📊.
              </p>
              <p className="text-base md:text-lg mb-8 text-blue-50 leading-relaxed">
                You're Mission Control 🎛️. Orchestrate the flow, wire the automations, 
                and give every procurement decision the intelligence it deserves.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/stages" 
                  className="px-8 py-4 bg-white text-mission-primary rounded-lg font-bold text-lg hover:bg-blue-50 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-center"
                >
                  🚀 Begin Mission
                </Link>
                <Link 
                  to="/stages" 
                  className="px-8 py-4 bg-blue-600/80 backdrop-blur-sm text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border-2 border-blue-400/50 text-center"
                >
                  🧭 View Mission Stages
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center lg:justify-end"
            >
              <figure className="relative">
                <img 
                  src="/images/azure-ai-icon.png" 
                  alt="Azure AI – Your intelligent procurement mission control" 
                  className="w-full max-w-lg transform hover:scale-105 transition-transform duration-300"
                />
                <figcaption className="mt-4 text-center text-blue-200 text-sm font-medium">
                  🎯 Azure AI — Your intelligent procurement mission control
                </figcaption>
              </figure>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Briefing */}
      <section id="mission-brief" className="bg-gray-50 py-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-100"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 text-center">
              Mission Briefing
            </h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Traditional procurement is slow, manual, and misses the best matches. 
                RFPs get lost in email threads, approvals bottleneck, and vendor analysis 
                happens in spreadsheets that never tell the full story.
              </p>
              <p>
                <strong className="text-mission-primary">Procurement Command Center flips the script</strong> with an AI-powered 
                system that handles the entire journey: intelligent vendor matching, automated 
                RFP workflows, and data-driven decision support.
              </p>
              <p>
                By mission completion, you'll have a fully automated procurement pipeline that 
                finds the best vendors, streamlines approvals, and delivers actionable insights.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="bg-gray-50 py-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-100"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 text-center">
              Meet Sarah – Our Procurement Manager on Mission Critical
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">👋 Meet Sarah</h3>
                <p className="mb-4 text-gray-700">
                  Procurement manager, urgent project, three weeks to find the perfect vendor.
                </p>
                <ul className="space-y-2 mb-4 list-disc list-inside text-gray-700">
                  <li>📭 RFP emails scattered across inboxes</li>
                  <li>📊 Vendor data trapped in spreadsheets</li>
                  <li>⏳ Approval workflows stuck in manual loops</li>
                  <li>🤔 No clear view of vendor match quality</li>
                </ul>
                <p className="mt-4">
                  <strong className="text-mission-primary">Procurement Command Center becomes Sarah's mission control</strong> — 
                  match vendors intelligently, automate RFP distribution, and deliver insights 
                  that drive confident decisions.
                </p>
              </div>
              <aside className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-red-800">
                  Where the Process Breaks ⚠️
                </h3>
                <ul className="space-y-2 list-disc list-inside text-gray-700">
                  <li>🧾 Vendor information scattered across emails and documents</li>
                  <li>🛰️ No unified view of vendor capabilities and match scores</li>
                  <li>🔁 Manual RFP distribution and approval tracking</li>
                  <li>📉 Analysis happens after decisions are made</li>
                </ul>
              </aside>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-center">
              Meet Procurement Command Center – Your AI-Powered Mission Control
            </h2>
            <p className="text-center text-gray-700 mb-8">
              Procurement Command Center is the intelligent system guiding every procurement 
              decision through AI-powered matching, automated workflows, and data-driven insights.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900">🔍 Vendor Scout Agent</h3>
                <p className="text-gray-700 mb-2">
                  AI-powered vendor matching with knowledge base
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Leverage AI models and knowledge bases to match vendors with precision. 
                  The agent understands requirements, searches vendor profiles, and delivers 
                  ranked recommendations with confidence scores.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900">📧 Mission Comms</h3>
                <p className="text-gray-700 mb-2">
                  Logic Apps workflows: email RFP + approvals
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Automate RFP distribution via email, track responses, and manage approval 
                  workflows. Logic Apps orchestrates the entire communication pipeline, 
                  ensuring nothing falls through the cracks.
                </p>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-900">📊 Mission Debrief</h3>
                <p className="text-gray-700 mb-2">
                  Code Interpreter: Python analysis + visualizations
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Analyze vendor data, generate insights, and create visualizations using 
                  Python. The Code Interpreter transforms raw procurement data into actionable 
                  intelligence with charts, comparisons, and recommendations.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="bg-gray-50 py-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-100"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 text-center">Who This Mission Is For</h2>
            <p className="text-center text-gray-700 mb-6">
              Join peers who are ready to transform procurement chaos into intelligent automation.
            </p>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <span className="text-2xl mr-4">🤝</span>
                <div>
                  <strong>Procurement & Sourcing teams</strong> modernizing vendor selection and RFP processes.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4">🛠️</span>
                <div>
                  <strong>IT & Automation squads</strong> extending AI capabilities into business processes.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4">💡</span>
                <div>
                  <strong>Makers and builders</strong> who learn fastest by shipping real solutions.
                </div>
              </li>
            </ul>
            <p className="text-center text-gray-600">
              No deep dev credentials required — we guide you from first AI model to full 
              procurement automation flow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-16">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-100 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Ready to Ignite the Best Match? 🎯</h2>
            <p className="text-lg text-gray-700 mb-8">
              Every great procurement decision starts with intelligent matching. Rally your team, 
              activate the Command Center, and let Sarah find the perfect vendor with confidence, 
              automation, and data-driven clarity.
            </p>
            <Link 
              to="/stages" 
              className="inline-block px-8 py-4 bg-mission-primary text-white rounded-lg font-bold text-lg hover:bg-mission-dark transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              🛠️ Start Mission 1 – Vendor Scout Agent
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
