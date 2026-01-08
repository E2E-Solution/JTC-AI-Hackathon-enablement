import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Stages from './pages/Stages'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stages" element={<Stages />} />
      </Routes>
    </Layout>
  )
}

export default App
