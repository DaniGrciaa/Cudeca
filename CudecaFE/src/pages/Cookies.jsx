import { motion } from 'framer-motion';
import { Cookie } from 'lucide-react';

const Cookies = () => {
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
            <Cookie className="w-16 h-16 text-cudeca-yellow mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Política de Cookies
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Qué son las Cookies?</h2>
            <p className="text-lg text-gray-700">
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita 
              nuestro sitio web. Nos ayudan a mejorar su experiencia de navegación, recordar sus preferencias 
              y entender cómo utiliza nuestro sitio.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tipos de Cookies que Utilizamos</h2>
            
            <div className="space-y-6 mt-4">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">1. Cookies Estrictamente Necesarias</h3>
                <p className="text-lg text-gray-700">
                  Estas cookies son esenciales para que el sitio web funcione correctamente. Incluyen cookies 
                  que permiten recordar información cuando navega entre páginas o que le permiten acceder a 
                  áreas seguras del sitio.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">2. Cookies de Rendimiento</h3>
                <p className="text-lg text-gray-700">
                  Estas cookies nos permiten reconocer y contar el número de visitantes y ver cómo se mueven 
                  los visitantes por nuestro sitio. Esto nos ayuda a mejorar el funcionamiento del sitio, 
                  por ejemplo, asegurando que los usuarios encuentren fácilmente lo que buscan.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">3. Cookies de Funcionalidad</h3>
                <p className="text-lg text-gray-700">
                  Estas cookies permiten que el sitio web recuerde las elecciones que hace (como su nombre de 
                  usuario, idioma o región) y proporcionen características mejoradas y más personales.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">4. Cookies de Marketing</h3>
                <p className="text-lg text-gray-700">
                  Estas cookies se utilizan para rastrear a los visitantes en los sitios web. La intención es 
                  mostrar anuncios que sean relevantes y atractivos para el usuario individual.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cookies de Terceros</h2>
            <p className="text-lg text-gray-700 mb-4">
              Utilizamos servicios de terceros que pueden establecer cookies en su dispositivo:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 ml-4">
              <li><strong>Google Analytics:</strong> Para analizar el uso del sitio web</li>
              <li><strong>Procesadores de pago:</strong> Para gestionar transacciones seguras</li>
              <li><strong>Redes sociales:</strong> Para integrar funcionalidades de compartir contenido</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Gestión de Cookies</h2>
            <p className="text-lg text-gray-700 mb-4">
              Puede controlar y gestionar las cookies de varias formas:
            </p>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 ml-4">
              <li>Configurar su navegador para rechazar todas las cookies</li>
              <li>Configurar su navegador para que le indique cuando se envía una cookie</li>
              <li>Eliminar las cookies ya instaladas en su dispositivo</li>
            </ul>
            <p className="text-lg text-gray-700 mt-4">
              Tenga en cuenta que si elimina o rechaza las cookies, algunas funciones de nuestro sitio 
              pueden no funcionar correctamente.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Duración de las Cookies</h2>
            <p className="text-lg text-gray-700">
              Utilizamos tanto cookies de sesión (que expiran cuando cierra su navegador) como cookies 
              persistentes (que permanecen en su dispositivo por un período específico o hasta que las elimine).
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Actualizaciones</h2>
            <p className="text-lg text-gray-700">
              Podemos actualizar esta política de cookies periódicamente. Le recomendamos revisarla 
              regularmente para estar informado sobre cómo utilizamos las cookies.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contacto</h2>
            <p className="text-lg text-gray-700">
              Si tiene preguntas sobre nuestra política de cookies:
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

export default Cookies;
