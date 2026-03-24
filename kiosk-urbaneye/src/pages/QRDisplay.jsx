import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Smartphone, Timer, RefreshCw } from 'lucide-react'
import QRCodeBlock from '../components/QRCodeBlock'

const QR_EXPIRY = 300 // 5 minutes in seconds

export default function QRDisplay() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState(QR_EXPIRY)
  const timerRef = useRef(null)

  // Extract category from session ID
  const category = sessionId?.split('-')[0] || 'general'

  // Build the complaint URL (for QR)
  const complaintUrl = `${window.location.origin}/report/${sessionId}`

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          navigate('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [navigate])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const handleRefresh = () => {
    const newSession = `${category}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    navigate(`/qr/${newSession}`, { replace: true })
    setTimeLeft(QR_EXPIRY)
  }

  return (
    <section
      className="flex-1 flex flex-col items-center min-h-[calc(100vh-5rem)] px-4 py-6 sm:py-10"
      aria-label="Scan QR code to submit complaint"
    >
      {/* Back */}
      <div className="w-full max-w-2xl mb-4">
        <motion.button
          onClick={() => navigate('/categories')}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
          className="touch-target inline-flex items-center gap-2 font-bold text-xl text-gray-700 hover:text-assam-blue px-6 py-4 rounded-xl shadow-md bg-white border border-gray-100 transition-colors"
          aria-label="Go back to category selection"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back</span>
        </motion.button>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 sm:p-12 max-w-lg w-full text-center shadow-xl border-4 border-gray-50"
      >
        {/* Category tag */}
        <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-accent-500" aria-hidden="true" />
          {category.replace(/-/g, ' ')}
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
          Scan to Report
        </h2>
        <p className="text-lg text-gray-600 mb-6 px-4">
          Open your phone camera and scan the QR code below to file your complaint
        </p>

        {/* QR Code */}
        <QRCodeBlock value={complaintUrl} category={category} />

        {/* Timer */}
        <div
          className="mt-6 flex items-center justify-center gap-2 text-sm"
          role="timer"
          aria-live="polite"
          aria-label={`QR code expires in ${minutes} minutes and ${seconds} seconds`}
        >
          <Timer className="w-4 h-4 text-gray-400" aria-hidden="true" />
          <span className={`font-mono font-semibold ${timeLeft < 60 ? 'text-danger' : 'text-primary-700'}`}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span className="text-gray-400">remaining</span>
        </div>

        {/* Refresh */}
        <motion.button
          onClick={handleRefresh}
          whileHover={{ rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          className="touch-target mt-8 inline-flex items-center justify-center gap-2 text-lg font-bold text-assam-blue hover:text-assam-blue/80 transition-colors px-6 py-3 rounded-xl border-2 border-assam-blue/20 hover:bg-assam-blue/5 w-full"
          aria-label="Generate a new QR code"
        >
          <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Generate New QR</span>
        </motion.button>

        {/* Instructions */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-start gap-3 text-left">
            <div className="w-9 h-9 rounded-lg bg-accent-50 flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-4 h-4 text-accent-600" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">How it works</p>
              <ol className="text-sm text-gray-600 mt-2 space-y-1.5 list-decimal list-inside" aria-label="Steps to submit complaint">
                <li>Open your phone camera</li>
                <li>Point it at the QR code above</li>
                <li>Fill in the complaint form on your phone</li>
                <li>Upload photos/evidence and submit</li>
              </ol>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
