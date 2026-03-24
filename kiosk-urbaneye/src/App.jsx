import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import LanguageSelect from './pages/LanguageSelect'
import MainMenu from './pages/MainMenu'
import ServiceScreen from './pages/ServiceScreen'
import CategorySelect from './pages/CategorySelect'
import QRDisplay from './pages/QRDisplay'
import ComplaintForm from './pages/ComplaintForm'
import SuccessScreen from './pages/SuccessScreen'
import PayBillFlow from './pages/PayBillFlow'
import NewConnectionFlow from './pages/NewConnectionFlow'
import Header from './components/Header'
import AccessibilityBar from './components/AccessibilityBar'

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        {/* Skip-to-content for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div className="min-h-screen flex flex-col">
          <AccessibilityBar />
          <Header />
          <main id="main-content" role="main" className="flex-1">
            <Routes>
              {/* Kiosk terminal screens */}
              <Route path="/" element={<LanguageSelect />} />
              <Route path="/home" element={<MainMenu />} />
              <Route path="/service/:type" element={<ServiceScreen />} />
              <Route path="/service/:type/pay" element={<PayBillFlow />} />
              <Route path="/service/:type/new" element={<NewConnectionFlow />} />
              <Route path="/categories" element={<CategorySelect />} />
              <Route path="/qr/:sessionId" element={<QRDisplay />} />

              {/* Mobile screens (after QR scan) */}
              <Route path="/report/:sessionId" element={<ComplaintForm />} />
              <Route path="/success/:trackingId" element={<SuccessScreen />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
