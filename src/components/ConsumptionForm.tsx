'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar, Clock } from 'lucide-react';
import { Consumption } from '@/types';
import { getMethodDescription } from '@/lib/thcCalculator';

const consumptionSchema = z.object({
  amount: z.number().min(0.01).max(10),
  method: z.enum(['smoked', 'oral']),
  timestamp: z.string()
});

type ConsumptionFormData = z.infer<typeof consumptionSchema>;

interface ConsumptionFormProps {
  onSubmit: (consumption: Consumption) => void;
}

export default function ConsumptionForm({ onSubmit }: ConsumptionFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<ConsumptionFormData>({
    resolver: zodResolver(consumptionSchema),
    defaultValues: {
      amount: 0.1,
      method: 'smoked',
      timestamp: new Date().toISOString().slice(0, 16)
    }
  });

  const watchedMethod = watch('method');

  const onFormSubmit = (data: ConsumptionFormData) => {
    const consumption: Consumption = {
      amount: data.amount,
      method: data.method,
      timestamp: new Date(data.timestamp)
    };
    
    onSubmit(consumption);
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setIsSubmitted(false);
    }, 2000);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setSelectedDate(newDate);
    setValue('timestamp', e.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* Amount Input */}
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Konsumierte Menge (Gramm)
        </label>
        <div className="relative">
          <input
            {...register('amount', { valueAsNumber: true })}
            type="number"
            id="amount"
            step="0.01"
            min="0.01"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="0.1"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 text-sm">g</span>
          </div>
        </div>
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Geben Sie die ungefähre Menge in Gramm ein (z.B. 0.1g für einen kleinen Joint)
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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

      {/* Date and Time Input */}
      <div>
        <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700 mb-1">
          Zeitpunkt des Konsums
        </label>
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <input
              {...register('timestamp')}
              type="datetime-local"
              id="timestamp"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onChange={handleDateChange}
            />
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <Clock className="w-4 h-4" />
          </div>
        </div>
        {errors.timestamp && (
          <p className="mt-1 text-sm text-red-600">{errors.timestamp.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Wählen Sie das Datum und die Uhrzeit Ihres letzten Konsums
        </p>
      </div>

      {/* Quick Time Buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Schnellauswahl
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Jetzt', hours: 0 },
            { label: '1 Stunde', hours: 1 },
            { label: '2 Stunden', hours: 2 },
            { label: '4 Stunden', hours: 4 }
          ].map((option) => (
            <button
              key={option.hours}
              type="button"
              onClick={() => {
                const date = new Date();
                date.setHours(date.getHours() - option.hours);
                const isoString = date.toISOString().slice(0, 16);
                setValue('timestamp', isoString);
                setSelectedDate(date);
              }}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
      >
        {isSubmitted ? 'Konsum eingetragen ✓' : 'Konsum eintragen'}
      </button>

      {/* Selected Time Display */}
      <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
        <p className="text-sm text-gray-700">
          <strong>Ausgewählter Zeitpunkt:</strong>{' '}
          {format(selectedDate, "dd.MM.yyyy 'um' HH:mm", { locale: de })}
        </p>
      </div>

      {/* Info Box */}
      <div className="bg-green-50 border border-green-200 rounded-md p-3">
        <p className="text-sm text-green-800">
          <strong>Hinweis:</strong> Je genauer Sie den Zeitpunkt eingeben, desto präziser 
          ist die Berechnung Ihrer sicheren Wartezeit.
        </p>
      </div>
    </form>
  );
} 