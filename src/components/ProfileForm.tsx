'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Profile } from '@/types';
import { getFrequencyDescription, getMethodDescription } from '@/lib/thcCalculator';

const profileSchema = z.object({
  age: z.number().min(18).max(100),
  weight: z.number().min(40).max(200),
  frequency: z.enum(['occasional', 'regular', 'chronic']),
  method: z.enum(['smoked', 'oral'])
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  onSubmit: (profile: Profile) => void;
}

export default function ProfileForm({ onSubmit }: ProfileFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      age: 25,
      weight: 70,
      frequency: 'occasional',
      method: 'smoked'
    }
  });

  const watchedFrequency = watch('frequency');
  const watchedMethod = watch('method');

  const onFormSubmit = (data: ProfileFormData) => {
    onSubmit(data);
    setIsSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* Age Input */}
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
          Alter (Jahre)
        </label>
        <input
          {...register('age', { valueAsNumber: true })}
          type="number"
          id="age"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="25"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
        )}
      </div>

      {/* Weight Input */}
      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
          Körpergewicht (kg)
        </label>
        <input
          {...register('weight', { valueAsNumber: true })}
          type="number"
          id="weight"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="70"
        />
        {errors.weight && (
          <p className="mt-1 text-sm text-red-600">{errors.weight.message}</p>
        )}
      </div>

      {/* Usage Frequency */}
      <div>
        <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
          Nutzungsfrequenz
        </label>
        <select
          {...register('frequency')}
          id="frequency"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="occasional">Gelegentlich (weniger als 1x pro Woche)</option>
          <option value="regular">Regelmäßig (2-4x pro Woche)</option>
          <option value="chronic">Chronisch (täglich oder fast täglich)</option>
        </select>
        {errors.frequency && (
          <p className="mt-1 text-sm text-red-600">{errors.frequency.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          {getFrequencyDescription(watchedFrequency)}
        </p>
      </div>

      {/* Consumption Method */}
      <div>
        <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
          Konsumart
        </label>
        <select
          {...register('method')}
          id="method"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="smoked">Geraucht (Joint, Bong, etc.)</option>
          <option value="oral">Oral (Essen, Tinktur, etc.)</option>
        </select>
        {errors.method && (
          <p className="mt-1 text-sm text-red-600">{errors.method.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          {getMethodDescription(watchedMethod)}
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        {isSubmitted ? 'Profil gespeichert ✓' : 'Profil speichern'}
      </button>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
        <p className="text-sm text-blue-800">
          <strong>Hinweis:</strong> Diese Informationen werden nur lokal gespeichert und dienen der 
          präziseren Berechnung Ihrer sicheren Wartezeit. Alle Daten bleiben auf Ihrem Gerät.
        </p>
      </div>
    </form>
  );
} 