import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Stages from './pages/Stages'
import Stage0Step from './pages/Stage0Step'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stages" element={<Stages />} />
        <Route path="/stage/0/step" element={<Stage0Step />} />
      </Routes>
    </Layout>
  )
}

export default App
