import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../context/WeatherContext';
import { usePlants } from '../context/PlantsContext';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTranslatedPlant } from '../hooks/useTranslatedPlant';

// Components
import WeatherCard from '../components/features/WeatherCard';
import PlantActionCard from '../components/features/PlantActionCard';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { weather, weatherCondition } = useWeather();
  const { userPlants, todaysActions } = usePlants();
  const { t } = useTranslation();
  const { translatePlants } = useTranslatedPlant();

  const translatedUserPlants = translatePlants(userPlants);

  // Ambil tanaman yang perlu dirawat hari ini
  const plantsNeedingCare = translatedUserPlants.filter((plant) => {
    const actions = todaysActions.get(plant.id);
    return actions && actions.length > 0;
  });

  // Mendapatkan judul dan tips berdasarkan cuaca
  const getWeatherTitle = () => t(`weather.${weatherCondition}`);
  const getWeatherTip = () => t(`weather.${weatherCondition}Tip`);

  return (
    <motion.div
      className="container mx-auto px-4 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Weather Section */}
      <WeatherCard weather={weather} />

      {/* Plant Care Section */}
      <motion.section
        className="mt-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {t('dashboard.todaysCare')}
          </h2>
          <button
            onClick={() => navigate('/plants')}
            className="text-sm text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
          >
            {t('dashboard.managePlants')}
          </button>
        </div>

        {userPlants.length === 0 ? (
          <motion.div
            className="card text-center"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t('dashboard.noPlants')}</p>
            <button onClick={() => navigate('/plants')} className="btn-primary">
              {t('dashboard.addPlants')}
            </button>
          </motion.div>
        ) : plantsNeedingCare.length === 0 ? (
          <motion.div
            className="card text-center"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-gray-600 dark:text-gray-400">{t('dashboard.allCaredFor')}</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
              {t('dashboard.checkTomorrow')}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {plantsNeedingCare.map((plant) => {
              const actions = todaysActions.get(plant.id) || [];
              return (
                <PlantActionCard
                  key={plant.id}
                  plant={plant}
                  actions={actions}
                />
              );
            })}
          </div>
        )}
      </motion.section>

      {/* Weather Tips */}
      <motion.section
        className="mt-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          {t('dashboard.weatherTips')}
        </h2>
        <div className="card">
          <h3 className="font-medium text-lg mb-2">{getWeatherTitle()}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{getWeatherTip()}</p>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default DashboardPage;