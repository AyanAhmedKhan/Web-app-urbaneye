import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Droplet, Flame, Trash2, Building2, Smartphone, QrCode } from 'lucide-react'
import IdleOverlay from '../components/IdleOverlay'
import { useLanguage } from '../context/LanguageContext'

const IDLE_TIMEOUT = 60000 // 60 seconds

const utilityServices = [
  { id: 'electricity', icon: Zap, color: 'from-yellow-400 to-yellow-600', path: '/service/electricity' },
  { id: 'water', icon: Droplet, color: 'from-blue-400 to-blue-600', path: '/service/water' },
  { id: 'gas', icon: Flame, color: 'from-orange-400 to-orange-600', path: '/service/gas' },
  { id: 'sanitation', icon: Trash2, color: 'from-emerald-400 to-emerald-600', path: '/service/sanitation' },
  { id: 'municipal', icon: Building2, color: 'from-purple-400 to-purple-600', path: '/service/municipal' },
  { id: 'smartcity', icon: Smartphone, color: 'from-indigo-400 to-indigo-600', path: '/service/smartcity' },
]

export default function MainMenu() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [isIdle, setIsIdle] = useState(false)
  const idleTimer = useRef(null)

  const resetIdle = () => {
    setIsIdle(false)
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT)
  }

  useEffect(() => {
    resetIdle()
    const events = ['touchstart', 'mousedown', 'mousemove', 'keydown']
    events.forEach(e => window.addEventListener(e, resetIdle))
    return () => {
      clearTimeout(idleTimer.current)
      events.forEach(e => window.removeEventListener(e, resetIdle))
    }
  }, [])

  return (
    <>
      <AnimatePresence>
        {isIdle && <IdleOverlay onDismiss={resetIdle} />}
      </AnimatePresence>

      <section className="flex-1 flex flex-col p-6 min-h-[calc(100vh-theme(spacing.20))] bg-surface" aria-label="Main Menu">
        
        <div className="text-center mb-8">
          <h2 className="text-4xl font-display font-bold text-assam-blue">{t('selectService')}</h2>
          <p className="text-xl text-gray-600 mt-2">{t('howCanWeHelp')}</p>
        </div>

        {/* ATM Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full mx-auto flex-1 content-center">
          
          {/* Main Services */}
          {utilityServices.map((service, idx) => (
            <motion.button
              key={service.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => navigate(service.path)}
              className="group relative h-32 flex items-center bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-assam-blue"
            >
              {/* Color Stripe on left */}
              <div className={`absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b ${service.color}`} />
              
              <div className="pl-8 pr-6 py-4 flex items-center justify-between w-full">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${service.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                     <service.icon className="w-8 h-8" />
                  </div>
                  <span className="text-2xl font-bold text-gray-800 text-left leading-tight group-hover:text-assam-blue transition-colors">
                    {t(service.id)}
                  </span>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center group-hover:border-assam-blue group-hover:bg-blue-50 transition-colors">
                  <span className="text-3xl text-gray-400 group-hover:text-assam-blue">›</span>
                </div>
              </div>
            </motion.button>
          ))}

        </div>

        {/* Report Grievance using QR (Bottom Action) */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8 }}
           className="mt-8 flex justify-center max-w-6xl mx-auto w-full"
        >
           <button
             onClick={() => navigate('/categories')}
             className="w-full md:w-2/3 group relative overflow-hidden bg-gradient-to-r from-assam-blue to-blue-900 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-between focus:outline-none focus:ring-4 focus:ring-blue-400"
           >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <QrCode className="w-10 h-10" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-200 uppercase tracking-wider mb-1">{t('fastTrack')}</p>
                  <h3 className="text-3xl font-bold font-display">{t('reportGrievance')}</h3>
                </div>
              </div>
              <div className="w-14 h-14 bg-white text-assam-blue flex items-center justify-center rounded-full shadow-md group-hover:bg-blue-50 transition-colors">
                <span className="text-3xl mb-1">›</span>
              </div>
           </button>
        </motion.div>

      </section>
    </>
  )
}
