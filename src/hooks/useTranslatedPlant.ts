import { useTranslation } from 'react-i18next';
import { Plant, UserPlant } from '../types/plants';

export const useTranslatedPlant = () => {
  const { t } = useTranslation();

  const translatePlant = (plant: Plant | UserPlant): Plant | UserPlant => {
    return {
      ...plant,
      name: t(`plants.names.${plant.id}`, plant.name),
      description: t(`plants.descriptions.${plant.id}`, plant.description),
      careInstructions: t(`plants.careInstructions.${plant.id}`, plant.careInstructions),
      fertilizer: t(`plants.fertilizers.${plant.fertilizer}`, plant.fertilizer),
      wateringFrequency: t(`plants.wateringFrequency.${plant.wateringFrequency}`, plant.wateringFrequency) as any,
      lightPreference: t(`plants.lightPreference.${plant.lightPreference}`, plant.lightPreference) as any,
    };
  };

  const translatePlants = (plants: (Plant | UserPlant)[]): (Plant | UserPlant)[] => {
    return plants.map(translatePlant);
  };

  return {
    translatePlant,
    translatePlants,
  };
};