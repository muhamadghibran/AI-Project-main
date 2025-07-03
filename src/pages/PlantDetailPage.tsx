import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePlants } from '../context/PlantsContext';
import { format } from 'date-fns';
import { Droplets, Sun, ThermometerSun, Ruler, FlaskConical } from 'lucide-react';
import { useTranslatedPlant } from '../hooks/useTranslatedPlant';
import { useTranslation } from 'react-i18next';

const PlantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPlantById, getUserPlantById, addPlant, removePlant } = usePlants();
  const { translatePlant } = useTranslatedPlant();
  const { t } = useTranslation();
  
  const plant = id ? getPlantById(id) : undefined;
  const userPlant = id ? getUserPlantById(id) : undefined;
  
  // If plant not found, redirect to plants page
  if (!plant) {
    return <Navigate to="/plants" replace />;
  }
  
  const translatedPlant = translatePlant(plant);
  const translatedUserPlant = userPlant ? translatePlant(userPlant) : null;
  const isInUserGarden = !!userPlant;
  
  // Toggle whether plant is in user's garden
  const togglePlantSelection = () => {
    if (isInUserGarden) {
      removePlant(plant.id);
    } else {
      addPlant(plant.id);
    }
  };
  
  return (
    <motion.div 
      className="container mx-auto px-4 py-4 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="relative rounded-xl overflow-hidden h-60 mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img 
          src={translatedPlant.image} 
          alt={translatedPlant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h1 className="text-2xl font-bold">{translatedPlant.name}</h1>
            <p className="text-sm italic">{translatedPlant.scientificName}</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="card mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-2">{t('plants.about')}</h2>
        <p className="text-gray-700 dark:text-gray-300">{translatedPlant.description}</p>
        
        <div className="flex justify-between mt-4">
          <button 
            onClick={togglePlantSelection}
            className={`btn ${isInUserGarden ? 'btn-outline' : 'btn-primary'} w-full`}
          >
            {isInUserGarden ? t('plants.removeFromGarden') : t('plants.addToGarden')}
          </button>
        </div>
      </motion.div>
      
      <motion.div 
        className="card mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-4">{t('plants.careRequirements')}</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Droplets size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('plants.waterNeeds')}</p>
              <p className="font-medium capitalize">{translatedPlant.wateringFrequency}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-yellow-100 p-2 rounded-full mr-3">
              <Sun size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('plants.light')}</p>
              <p className="font-medium capitalize">{translatedPlant.lightPreference}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-full mr-3">
              <ThermometerSun size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('plants.temperature')}</p>
              <p className="font-medium">
                {translatedPlant.idealTemperature.min}°C - {translatedPlant.idealTemperature.max}°C
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <Ruler size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('plants.height')}</p>
              <p className="font-medium">
                {translatedPlant.heightRange.min} - {translatedPlant.heightRange.max} cm
              </p>
            </div>
          </div>
          
          <div className="col-span-2 flex items-center">
            <div className="bg-purple-100 p-2 rounded-full mr-3">
              <FlaskConical size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('plants.fertilizer')}</p>
              <p className="font-medium">{translatedPlant.fertilizer}</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold mb-2">{t('plants.careInstructions')}</h2>
        <p className="text-gray-700 dark:text-gray-300">{translatedPlant.careInstructions}</p>
      </motion.div>
      
      {translatedUserPlant && translatedUserPlant.careHistory.length > 0 && (
        <motion.div 
          className="card mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-2">{t('plants.careHistory')}</h2>
          <div className="max-h-48 overflow-y-auto">
            {translatedUserPlant.careHistory
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((entry, index) => (
                <div key={index} className="py-2 border-b border-gray-100 last:border-b-0">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(entry.date), 'MMM d, yyyy')}
                  </p>
                  <p className="font-medium capitalize">{entry.action}</p>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PlantDetailPage;