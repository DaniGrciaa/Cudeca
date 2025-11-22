import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Calendar, Clock, MapPin, Mail, Phone, CheckCircle } from 'lucide-react';

const Voluntariado = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    ciudad: '',
    disponibilidad: '',
    areas: [],
    experiencia: '',
    motivacion: ''
  });

  const areasVoluntariado = [
    'Eventos y Recaudación de Fondos',
    'Apoyo Administrativo',
    'Comunicación y Redes Sociales',
    'Acompañamiento a Pacientes',
    'Tienda Solidaria',
    'Transporte',
    'Otro'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (area) => {
    setFormData(prev => ({
      ...prev,
      areas: prev.areas.includes(area)
        ? prev.areas.filter(a => a !== area)
        : [...prev.areas, area]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Integrar con backend
    console.log('Solicitud de voluntariado:', formData);
    alert('¡Gracias por tu interés en ser voluntario! Nos pondremos en contacto contigo pronto.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&h=400&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-cudeca-darkGreen opacity-85"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Voluntariado
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto">
              Únete a nuestro equipo de voluntarios y ayuda a marcar la diferencia
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenido Principal */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Información sobre el voluntariado */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              ¿Por qué ser voluntario en Cudeca?
            </h2>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Como voluntario de Cudeca, tendrás la oportunidad de contribuir de manera significativa 
              a mejorar la calidad de vida de personas con enfermedades avanzadas y sus familias.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md">
                <Heart className="w-8 h-8 text-cudeca-mediumGreen flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Haz la diferencia</h3>
                  <p className="text-gray-700">
                    Tu tiempo y dedicación tienen un impacto directo en las vidas de nuestros pacientes y sus familias.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md">
                <Users className="w-8 h-8 text-cudeca-mediumGreen flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Únete a una comunidad</h3>
                  <p className="text-gray-700">
                    Forma parte de un equipo comprometido de más de 100 voluntarios activos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md">
                <Calendar className="w-8 h-8 text-cudeca-mediumGreen flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Flexibilidad horaria</h3>
                  <p className="text-gray-700">
                    Adaptamos las actividades a tu disponibilidad. No importa cuánto tiempo puedas dedicar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-md">
                <Clock className="w-8 h-8 text-cudeca-mediumGreen flex-shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Formación continua</h3>
                  <p className="text-gray-700">
                    Ofrecemos formación y apoyo constante para que te sientas preparado y seguro.
                  </p>
                </div>
              </div>
            </div>

            {/* Áreas de voluntariado */}
            <div className="bg-cudeca-paleGreen border-l-4 border-cudeca-mediumGreen p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Áreas donde puedes colaborar:</h3>
              <ul className="space-y-2">
                {areasVoluntariado.map((area, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-cudeca-mediumGreen flex-shrink-0" aria-hidden="true" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto directo */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-4">¿Prefieres hablar con nosotros?</h3>
              <div className="space-y-3">
                <a
                  href="mailto:voluntariado@cudeca.org"
                  className="flex items-center gap-3 text-cudeca-darkGreen hover:text-cudeca-mediumGreen font-semibold"
                >
                  <Mail className="w-5 h-5" aria-hidden="true" />
                  voluntariado@cudeca.org
                </a>
                <a
                  href="tel:+34952564363"
                  className="flex items-center gap-3 text-cudeca-darkGreen hover:text-cudeca-mediumGreen font-semibold"
                >
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  +34 952 564 363
                </a>
                <div className="flex items-start gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-cudeca-mediumGreen flex-shrink-0 mt-1" aria-hidden="true" />
                  <span>Calle Cudeca s/n, 29631 Benalmádena, Málaga</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulario de inscripción */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-lg shadow-xl p-8 sticky top-24">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Inscríbete como Voluntario
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre y Apellidos */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="apellidos" className="block text-sm font-semibold text-gray-700 mb-2">
                      Apellidos <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleChange}
                      required
                      className="input-field"
                      placeholder="Tus apellidos"
                    />
                  </div>
                </div>

                {/* Email y Teléfono */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">
                    Teléfono <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="+34 600 000 000"
                  />
                </div>

                <div>
                  <label htmlFor="ciudad" className="block text-sm font-semibold text-gray-700 mb-2">
                    Ciudad <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="Tu ciudad"
                  />
                </div>

                {/* Disponibilidad */}
                <div>
                  <label htmlFor="disponibilidad" className="block text-sm font-semibold text-gray-700 mb-2">
                    Disponibilidad <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="disponibilidad"
                    name="disponibilidad"
                    value={formData.disponibilidad}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Selecciona...</option>
                    <option value="mañanas">Mañanas</option>
                    <option value="tardes">Tardes</option>
                    <option value="fines-de-semana">Fines de semana</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                {/* Áreas de interés */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Áreas de interés <span className="text-red-600">*</span>
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-4">
                    {areasVoluntariado.map((area) => (
                      <label key={area} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.areas.includes(area)}
                          onChange={() => handleCheckboxChange(area)}
                          className="w-5 h-5 text-cudeca-mediumGreen focus:ring-cudeca-mediumGreen rounded"
                        />
                        <span className="text-gray-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Motivación */}
                <div>
                  <label htmlFor="motivacion" className="block text-sm font-semibold text-gray-700 mb-2">
                    ¿Por qué quieres ser voluntario? <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="motivacion"
                    name="motivacion"
                    value={formData.motivacion}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="input-field"
                    placeholder="Cuéntanos tu motivación..."
                  />
                </div>

                {/* Botón de envío */}
                <button
                  type="submit"
                  className="w-full bg-cudeca-mediumGreen text-white font-bold py-4 px-6 rounded-lg hover:bg-cudeca-darkGreen transition-all duration-200 shadow-lg hover:shadow-xl text-lg focus:outline-none focus:ring-4 focus:ring-cudeca-mediumGreen focus:ring-offset-2"
                >
                  Enviar Solicitud
                </button>

                <p className="text-sm text-center text-gray-600">
                  Al enviar este formulario aceptas nuestra política de privacidad
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Voluntariado;
