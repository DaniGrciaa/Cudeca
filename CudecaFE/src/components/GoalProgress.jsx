import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const GoalProgress = ({ current = 0, goal = 10000, eventTitle = "Evento" }) => {
  const percentage = Math.min((current / goal) * 100, 100);
  const remaining = Math.max(goal - current, 0);

  const data = [
    { name: 'Recaudado', value: current, color: '#10B981' },
    { name: 'Pendiente', value: remaining, color: '#E5E7EB' }
  ];

  const COLORS = ['#10B981', '#E5E7EB'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-gray-200">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-cudeca-darkGreen font-bold">
            {payload[0].value.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-cudeca-darkGreen" aria-hidden="true" />
        <h2 className="text-2xl font-bold text-gray-900">
          Progreso de Recaudación
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Gráfico circular */}
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Estadísticas */}
        <div className="flex flex-col justify-center space-y-4">
          <div className="bg-cudeca-lightGreen p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Recaudado</p>
            <p className="text-3xl font-bold text-cudeca-darkGreen">
              {current.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Objetivo</p>
            <p className="text-3xl font-bold text-gray-900">
              {goal.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
            </p>
          </div>

          <div className="bg-cudeca-yellow bg-opacity-20 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Progreso</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">
                {percentage.toFixed(1)}%
              </p>
              {percentage >= 100 && (
                <span className="text-lg text-cudeca-darkGreen font-semibold">
                  ¡Objetivo cumplido! 🎉
                </span>
              )}
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-cudeca-mediumGreen h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progreso de recaudación: ${percentage.toFixed(1)}%`}
            />
          </div>

          {remaining > 0 && (
            <p className="text-center text-gray-600 text-lg">
              Quedan <span className="font-bold text-cudeca-darkGreen">
                {remaining.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </span> para alcanzar el objetivo
            </p>
          )}
        </div>
      </div>

      {/* Mensaje motivacional */}
      <div className="mt-6 p-4 bg-cudeca-paleGreen rounded-lg border-l-4 border-cudeca-mediumGreen">
        <p className="text-lg text-gray-700">
          <strong>¡Tu apoyo marca la diferencia!</strong> Cada contribución nos acerca a nuestro objetivo de ayudar a más personas.
        </p>
      </div>
    </motion.div>
  );
};

export default GoalProgress;
