import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, PlusCircle, AlertCircle, IndianRupee } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

const ServiceScreen = () => {
  const { serviceId } = useParams()
  const navigate = useNavigate()
  const { t } = useLanguage()

  const getServiceData = (t) => ({
    electricity: { title: t('electricity'), icon: '⚡', theme: 'bg-yellow-50 text-yellow-600', border: 'border-yellow-200' },
    water: { title: t('water'), icon: '💧', theme: 'bg-blue-50 text-blue-600', border: 'border-blue-200' },
    gas: { title: t('gas'), icon: '🔥', theme: 'bg-orange-50 text-orange-600', border: 'border-orange-200' },
    sanitation: { title: t('sanitation'), icon: '🗑️', theme: 'bg-green-50 text-green-600', border: 'border-green-200' },
    municipal: { title: t('municipal'), icon: '🏛️', theme: 'bg-indigo-50 text-indigo-600', border: 'border-indigo-200' },
    smartcity: { title: t('smartcity'), icon: '🏙️', theme: 'bg-purple-50 text-purple-600', border: 'border-purple-200' }
  })
  
  const serviceData = getServiceData(t)
  const service = serviceData[serviceId]

  const actions = [
    { id: 'pay', label: t('payBill'), icon: IndianRupee, color: 'text-emerald-600 bg-emerald-100 border-emerald-200' },
    { id: 'history', label: t('viewHistory'), icon: FileText, color: 'text-blue-600 bg-blue-100 border-blue-200' },
    { id: 'new', label: t('newConnection'), icon: PlusCircle, color: 'text-indigo-600 bg-indigo-100 border-indigo-200' },
    { id: 'complaint', label: t('lodgeComplaint'), icon: AlertCircle, color: 'text-rose-600 bg-rose-100 border-rose-200' }
  ]

  if (!service) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 min-h-screen">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">{t('serviceNotFound')}</h2>
        <button onClick={() => navigate('/')} className="px-8 py-4 bg-assam-blue text-white rounded-2xl text-xl font-bold hover:bg-blue-800 transition-colors">
          {t('goBack')}
        </button>
      </div>
    )
  }

  const handleAction = (actionId) => {
    navigate(`/service/${serviceId}/${actionId}`)
  }

  return (
    <div className="min-h-[calc(100vh-theme(spacing.20))] bg-slate-50 flex flex-col items-center p-6 relative overflow-hidden">
      {/* Decorative dots background */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative z-10 w-full max-w-6xl flex justify-between items-end mb-8 mt-4">
        <div>
           <button onClick={() => navigate('/home')} className="flex items-center gap-2 text-assam-blue font-bold text-xl mb-4 opacity-80 hover:opacity-100 transition-opacity">
             <ArrowLeft className="w-6 h-6" /> {t('back')}
           </button>
           <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${service.theme} ${service.border} border mb-4 text-3xl shadow-sm`}>
             {service.icon}
           </div>
           <h2 className="text-4xl md:text-5xl font-display font-extrabold text-slate-800 tracking-tight">{service.title}</h2>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        
        {/* Left Col - Actions */}
        <div className="flex flex-col gap-6">
           {actions.map((action, idx) => {
             const Icon = action.icon
             return (
               <motion.button
                 key={action.id}
                 onClick={() => handleAction(action.id)}
                 initial={{ opacity: 0, x: -50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: idx * 0.1 }}
                 className="h-24 bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-slate-300 flex items-center px-8 justify-between group transition-all focus:outline-none focus:ring-4 focus:ring-slate-300"
               >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${action.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-bold text-gray-700 group-hover:text-assam-blue text-left">{action.label}</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-colors shrink-0">
                    <span className="text-3xl text-slate-400 group-hover:text-assam-blue">›</span>
                  </div>
               </motion.button>
             )
           })}
        </div>

        {/* Right Col - Info / Instructions */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border border-gray-100 relative"
        >
          <div className={`h-40 ${service.theme} p-8 flex items-end relative overflow-hidden border-b ${service.border}`}>
             {/* Decorative abstract shape */}
             <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-40 rounded-full -translate-y-32 translate-x-16 blur-2xl"></div>
             <h3 className="text-3xl font-bold relative z-10 text-slate-800">
               {t('accessYour')} {service.title}
             </h3>
          </div>
          
          <div className="p-8 flex-1 flex flex-col justify-center items-center text-center space-y-6">
             <div className={`w-28 h-28 rounded-full ${service.theme} flex items-center justify-center text-6xl shadow-inner border ${service.border}`}>
                {service.icon}
             </div>
             <div>
               <p className="text-2xl text-slate-800 font-medium mb-4">{t('tapActionToProceed')}</p>
               <p className="text-slate-500 text-lg">{t('promptToScan')}</p>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default ServiceScreen
