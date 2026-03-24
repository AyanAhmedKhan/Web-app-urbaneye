import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function CategorySelect() {
  const navigate = useNavigate()
  const { t } = useLanguage()

  const categories = [
    { id: 'road', icon: '🛣️', label: t('road') },
    { id: 'water', icon: '🚰', label: t('waterSupply') },
    { id: 'electricity', icon: '💡', label: t('streetLight') },
    { id: 'sanitation', icon: '🗑️', label: t('sanitationWaste') },
    { id: 'safety', icon: '🛡️', label: t('safety') },
    { id: 'noise', icon: '🔊', label: t('noise') },
    { id: 'parks', icon: '🌳', label: t('parks') },
    { id: 'other', icon: '📋', label: t('other') }
  ]

  const handleSelect = (categoryId) => {
    navigate('/qr', { state: { category: categoryId } })
  }

  return (
    <div className="flex-1 flex flex-col p-8 fade-in h-screen bg-surface">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate('/home')}
          className="p-4 rounded-2xl bg-white shadow-sm border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 active:scale-95 transition-all"
        >
          <ArrowLeft size={32} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col justify-center">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('whatReport')}</h1>
          <p className="text-xl text-gray-600">
            {t('selectCategory')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(category.id)}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-6 hover:border-blue-500 hover:shadow-md transition-all group focus:outline-none focus:ring-4 focus:ring-blue-400"
            >
              <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </div>
              <span className="text-2xl font-bold text-gray-800 text-center">
                {category.label}
              </span>
            </motion.button>
          ))}
        </div>

        <p className="text-center text-gray-500 mt-12 text-lg">
          {t('complaintRouteInfo')}
        </p>
      </div>
    </div>
  )
}
