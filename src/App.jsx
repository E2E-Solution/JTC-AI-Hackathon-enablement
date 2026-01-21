import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Stages from './pages/Stages'
import Stage0Step from './pages/Stage0Step'
import Stage1Overview from './pages/Stage1Overview'
import Stage1Step1 from './pages/Stage1Step1'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stages" element={<Stages />} />
        <Route path="/stage/0/step" element={<Stage0Step />} />
        <Route path="/stage/1" element={<Stage1Overview />} />
        <Route path="/stage/1/step/1.1" element={<Stage1Step1 />} />
      </Routes>
    </Layout>
  )
}

export default App
