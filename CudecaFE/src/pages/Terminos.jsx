import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const Terminos = () => {
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
            <FileText className="w-16 h-16 text-cudeca-yellow mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Términos y Condiciones
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Aceptación de Términos</h2>
            <p className="text-lg text-gray-700">
              Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos y condiciones 
              de uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Uso del Sitio Web</h2>
            <p className="text-lg text-gray-700 mb-4">
              Este sitio web es operado por Fundación Cudeca. Usted se compromete a:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 ml-4">
              <li>Proporcionar información veraz y actualizada</li>
              <li>Mantener la confidencialidad de sus credenciales de acceso</li>
              <li>No utilizar el sitio para fines ilegales o no autorizados</li>
              <li>No interferir con el funcionamiento del sitio</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Eventos y Tickets</h2>
            <p className="text-lg text-gray-700 mb-4">
              Al comprar tickets para eventos:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 ml-4">
              <li>La compra constituye un contrato vinculante</li>
              <li>Los tickets son intransferibles salvo autorización expresa</li>
              <li>Fundación Cudeca se reserva el derecho de cancelar o modificar eventos</li>
              <li>En caso de cancelación, se ofrecerá reembolso completo</li>
              <li>Los menores deben estar acompañados por un adulto</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Donaciones</h2>
            <p className="text-lg text-gray-700">
              Las donaciones realizadas a través de este sitio son definitivas y no reembolsables, 
              excepto en circunstancias excepcionales. Todas las donaciones se utilizarán para los 
              fines caritativos de Fundación Cudeca y son deducibles de impuestos según la legislación vigente.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Propiedad Intelectual</h2>
            <p className="text-lg text-gray-700">
              Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, imágenes y software, 
              es propiedad de Fundación Cudeca y está protegido por las leyes de propiedad intelectual. 
              No se permite su reproducción sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Limitación de Responsabilidad</h2>
            <p className="text-lg text-gray-700">
              Fundación Cudeca no será responsable de daños directos, indirectos, incidentales o consecuentes 
              que resulten del uso o la imposibilidad de uso de este sitio web, incluso si hemos sido informados 
              de la posibilidad de tales daños.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Modificaciones</h2>
            <p className="text-lg text-gray-700">
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
              Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Ley Aplicable</h2>
            <p className="text-lg text-gray-700">
              Estos términos se regirán e interpretarán de acuerdo con las leyes de España. 
              Cualquier disputa se resolverá en los tribunales de Málaga.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Contacto</h2>
            <p className="text-lg text-gray-700">
              Para preguntas sobre estos términos y condiciones:
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

export default Terminos;
