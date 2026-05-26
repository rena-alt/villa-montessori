import React, { useState } from 'react';

interface FormState {
  parentName: string;
  email: string;
  phone: string;
  childAge: string;
  message: string;
}
const encode = (data: { [key: string]: string }) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    parentName: '',
    email: '',
    phone: '',
    childAge: '3',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // Enviamos la petición a la raíz, pero estructurada para Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'admisiones-montessori', // Debe coincidir con el name del <form>
          ...formData,
        }),
      });

      if (!response.ok) throw new Error('Error al enviar los datos. Intenta más tarde.');
      setStatus('success');
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Ocurrió un problema inesperado.');
    }
  };

  if (status === 'success') {
    return (
      <div className="montessori-success-card animate-fade-in">
        {/* Mantenemos el estilo de éxito que ya definiste */}
        <style dangerouslySetInnerHTML={{__html: `
          .montessori-success-card {
            background-color: var(--color-bg-cream, #fdfbf7) !important;
            border: 1px solid rgba(13, 71, 49, 0.1) !important;
            border-radius: var(--radius-xl, 24px) !important;
            padding: 40px 32px !important;
            text-align: center !important;
            max-width: 576px !important;
            margin: 0 auto !important;
          }
          .success-icon {
            width: 48px !important;
            height: 48px !important;
            background-color: var(--color-brand-green, #0d4731) !important;
            color: #ffffff !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-weight: 700 !important;
            margin: 0 auto 16px auto !important;
          }
          .montessori-success-card h3 {
            font-family: var(--font-headers), serif !important;
            color: var(--color-slate-dark, #1e293b) !important;
            font-size: 24px !important;
            font-weight: 700 !important;
            margin: 0 0 12px 0 !important;
          }
          .montessori-success-card p {
            color: #475569 !important;
            font-size: 15px !important;
            line-height: 1.6 !important;
            margin: 0 !important;
          }
        `}} />
        <div className="success-icon">✓</div>
        <h3>¡Solicitud Recibida!</h3>
        <p>Agradecemos tu interés en Villa Montessori. Nos pondremos en contacto contigo en las próximas 24 horas hábiles para coordinar la sesión informativa en Casa de los Niños.</p>
      </div>
    );
  }

  return (
    <div className="montessori-isolated-form-card">
      <style dangerouslySetInnerHTML={{__html: `
        .montessori-isolated-form-card {
          width: 100% !important;
          max-width: 576px !important;
          margin: 0 auto !important;
          background-color: #ffffff !important;
          border-radius: var(--radius-xl, 24px) !important;
          padding: 32px !important;
          border: 1px solid rgba(13, 71, 49, 0.05) !important;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.03) !important;
          box-sizing: border-box !important;
          text-align: left !important;
        }
        @media (min-width: 768px) {
          .montessori-isolated-form-card { padding: 40px !important; }
        }
        .montessori-isolated-form-card h3 {
          font-family: var(--font-headers), serif !important;
          color: var(--color-slate-dark, #1e293b) !important;
          font-size: 24px !important;
          font-weight: 700 !important;
          margin: 0 0 8px 0 !important;
          text-align: left !important;
        }
        .montessori-isolated-form-card .form-subtitle {
          font-size: var(--font-size-sm, 14px) !important;
          color: var(--color-slate-dark, #1e293b) !important;
          opacity: 0.65 !important;
          margin: 0 0 28px 0 !important;
          text-align: left !important;
          line-height: 1.5 !important;
        }
        .montessori-group {
          margin-bottom: 20px !important;
          display: block !important;
          text-align: left !important;
        }
        .montessori-grid-fields {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 20px !important;
        }
        @media (min-width: 640px) {
          .montessori-grid-fields { grid-template-columns: 1fr 1fr !important; }
        }
        .montessori-isolated-form-card label {
          display: block !important;
          font-family: var(--font-headers), sans-serif !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          text-transform: uppercase !important;
          letter-spacing: 0.08em !important;
          color: var(--color-brand-green, #0d4731) !important;
          margin-bottom: 8px !important;
          text-align: left !important;
        }
        .montessori-field {
          display: block !important;
          width: 100% !important;
          height: 46px !important;
          padding: 0 16px !important;
          font-size: 14px !important;
          background-color: var(--color-bg-cream, #fdfbf7) !important;
          color: var(--color-slate-dark, #1e293b) !important;
          border: 1px solid rgba(13, 71, 49, 0.08) !important;
          border-radius: var(--radius-lg, 16px) !important;
          outline: none !important;
          box-sizing: border-box !important;
          transition: all 0.3s ease !important;
        }
        .montessori-field:focus {
          border-color: var(--color-brand-green, #0d4731) !important;
          background-color: #ffffff !important;
          box-shadow: 0 0 0 4px rgba(13, 71, 49, 0.05) !important;
        }
        textarea.montessori-field {
          height: auto !important;
          padding: 14px 16px !important;
          resize: none !important;
        }
        .montessori-select-container {
          position: relative !important;
          width: 100% !important;
          display: block !important;
        }
        .montessori-field-select {
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          background-image: none !important;
          cursor: pointer !important;
          padding-right: 40px !important;
        }
        .montessori-arrow-box {
          position: absolute !important;
          top: 0 !important;
          bottom: 0 !important;
          right: 16px !important;
          display: flex !important;
          align-items: center !important;
          pointer-events: none !important;
          opacity: 0.5 !important;
          color: currentColor !important;
        }
        .montessori-arrow-box svg {
          width: 16px !important;
          height: 16px !important;
          display: block !important;
        }
        .montessori-btn {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          width: 100% !important;
          height: 48px !important;
          background-color: var(--color-brand-green, #0d4731) !important;
          color: #ffffff !important;
          border: none !important;
          border-radius: 9999px !important;
          font-size: 14px !important;
          font-weight: 700 !important;
          letter-spacing: 0.02em !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          box-shadow: 0 4px 12px rgba(13, 71, 49, 0.15) !important;
          margin-top: 12px !important;
        }
        .montessori-btn:hover:not(:disabled) {
          transform: translateY(-2px) !important;
          box-shadow: 0 6px 20px rgba(13, 71, 49, 0.25) !important;
          filter: brightness(1.1) !important;
        }
        .montessori-btn:disabled {
          opacity: 0.6 !important;
          cursor: not-allowed !important;
        }
        .montessori-error-alert {
          font-size: 12px !important;
          color: #b91c1c !important;
          background-color: #fef2f2 !important;
          padding: 12px 16px !important;
          border-radius: var(--radius-md, 12px) !important;
          border: 1px solid #fee2e2 !important;
          margin-bottom: 16px !important;
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }
      `}} />

      <h3>Agendar Visita Guiada</h3>
      <p className="form-subtitle">
        Conoce nuestras instalaciones y observa cómo trabajan los niños de forma autónoma en el ambiente.
      </p>

      <form name="admisiones-montessori" method="POST" data-netlify="true" onSubmit={handleSubmit}>
        
        <input type="hidden" name="form-name" value="admisiones-montessori" />

        <div className="montessori-group">
          <label htmlFor="parentName">Nombre completo del tutor *</label>
          <input
            required
            type="text"
            id="parentName"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            placeholder="Ej. María González"
            className="montessori-field"
          />
        </div>

        <div className="montessori-grid-fields montessori-group">
          <div>
            <label htmlFor="email">Correo electrónico *</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className="montessori-field"
            />
          </div>

          <div>
            <label htmlFor="phone">Teléfono (WhatsApp) *</label>
            <input
              required
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="5512345678"
              className="montessori-field"
            />
          </div>
        </div>

        <div className="montessori-group">
          <label htmlFor="childAge">Edad actual de tu hijo/a</label>
          <div className="montessori-select-container">
            <select
              id="childAge"
              name="childAge"
              value={formData.childAge}
              onChange={handleChange}
              className="montessori-field mt-field-select montessori-field-select"
            >
              <option value="2">Menor de 3 años (Próximo ingreso)</option>
              <option value="3">3 años</option>
              <option value="4">4 años</option>
              <option value="5">5 años o más</option>
            </select>
            <div className="montessori-arrow-box">
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="montessori-group">
          <label htmlFor="message">¿Alguna duda o requerimiento especial?</label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={formData.message}
            placeholder="Cuéntanos un poco sobre tu hijo/a..."
            onChange={handleChange}
            className="montessori-field"
          />
        </div>

        {status === 'error' && (
          <div className="montessori-error-alert">
            <strong>!</strong> {errorMessage}
          </div>
        )}

        <button
          disabled={status === 'submitting'}
          type="submit"
          className="montessori-btn"
        >
          {status === 'submitting' ? 'Procesando solicitud...' : 'Enviar Solicitud de Informes'}
        </button>
      </form>
    </div>
  );
}