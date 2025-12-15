import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Privacidad = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-cudeca-darkGreen py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Shield className="w-16 h-16 text-cudeca-yellow mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Política de Privacidad
            </h1>
            <p className="text-xl text-white">
              Última actualización: Diciembre 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 md:p-12 space-y-8"
        >
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Información que Recopilamos</h2>
            <p className="text-lg text-gray-700 mb-4">
              En Fundación Cudeca, recopilamos información personal cuando usted se registra en nuestro sitio, 
              realiza una donación, compra tickets para eventos o se comunica con nosotros.
            </p>
            <p className="text-lg text-gray-700">
              La información puede incluir: nombre, dirección de correo electrónico, dirección postal, 
              número de teléfono e información de pago.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Uso de la Información</h2>
            <p className="text-lg text-gray-700 mb-4">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 ml-4">
              <li>Procesar donaciones y compras de tickets</li>
              <li>Enviar confirmaciones y recibos</li>
              <li>Comunicar información sobre eventos y actividades</li>
              <li>Mejorar nuestros servicios y experiencia del usuario</li>
              <li>Cumplir con obligaciones legales y fiscales</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Protección de Datos</h2>
            <p className="text-lg text-gray-700">
              Implementamos medidas de seguridad diseñadas para proteger su información personal contra 
              acceso no autorizado, alteración, divulgación o destrucción. Utilizamos cifrado SSL para 
              todas las transacciones financieras.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Compartir Información</h2>
            <p className="text-lg text-gray-700">
              No vendemos, intercambiamos ni transferimos su información personal a terceros, excepto 
              cuando sea necesario para procesar transacciones o cumplir con la ley.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Sus Derechos</h2>
            <p className="text-lg text-gray-700 mb-4">
              Usted tiene derecho a:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 ml-4">
              <li>Acceder a sus datos personales</li>
              <li>Rectificar datos inexactos</li>
              <li>Solicitar la eliminación de sus datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
              <li>Retirar su consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Contacto</h2>
            <p className="text-lg text-gray-700">
              Para ejercer sus derechos o si tiene preguntas sobre nuestra política de privacidad, 
              puede contactarnos en:
            </p>
            <p className="text-lg text-gray-700 mt-4">
              <strong>Email:</strong> info@cudeca.org<br />
              <strong>Teléfono:</strong> +34 952 56 47 35<br />
              <strong>Dirección:</strong> Calle Cudeca s/n, 29631 Benalmádena, Málaga
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacidad;
