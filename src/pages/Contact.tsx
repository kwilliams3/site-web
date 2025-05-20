import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import Map from '../components/Map';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Contactez-Nous</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous sommes disponibles pour répondre à vos questions. Contactez-nous par téléphone, WhatsApp, email ou via le formulaire.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Nos Coordonnées</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">Téléphone/WhatsApp</p>
                    <p className="text-gray-600">+237 6 12 23 34 45</p>
                    <p className="text-gray-600">+237 6 45 56 67 78</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">Email</p>
                    <p className="text-gray-600">contact@supermarche-cm.com</p>
                    <p className="text-gray-600">serviceclient@supermarche-cm.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">Adresses</p>
                    <p className="text-gray-600">Bonanjo: Rue de la Poste, Douala</p>
                    <p className="text-gray-600">Bonapriso: Carrefour ARNO, Douala</p>
                    <p className="text-gray-600">Akwa: Boulevard de la Liberté, Douala</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">Heures d'Ouverture</p>
                    <p className="text-gray-600">Lundi - Samedi: 7h30 - 20h30</p>
                    <p className="text-gray-600">Dimanche: 9h00 - 15h00</p>
                    <p className="text-sm text-gray-500 mt-1">Fermé les jours fériés</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map - Centrée sur Douala */}
            <Map />
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Envoyez un Message</h2>
            <div className="mb-4">
              <p className="text-gray-600 text-sm">
                Pour les réclamations ou suggestions, veuillez remplir ce formulaire. 
                Nous vous répondrons dans les 48 heures.
              </p>
            </div>
            <ContactForm />
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Vous pouvez aussi nous contacter directement sur WhatsApp au 
                <span className="font-medium"> +237 6 12 23 34 45</span>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Cameroon-specific info */}
        <div className="mt-12 bg-green-50 rounded-lg p-6 max-w-6xl mx-auto">
          <h3 className="text-lg font-semibold text-green-800 mb-3">Points de Vente au Cameroun</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="font-medium text-gray-800">Douala</h4>
              <p className="text-sm text-gray-600">Bonanjo, Rue de la Poste</p>
              <p className="text-sm text-gray-600">Bonapriso, Carrefour ARNO</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="font-medium text-gray-800">Yaoundé</h4>
              <p className="text-sm text-gray-600">Bastos, Rue 1.234</p>
              <p className="text-sm text-gray-600">Mvan, Carrefour SCOUL</p>
            </div>
            <div className="bg-white p-4 rounded shadow-sm">
              <h4 className="font-medium text-gray-800">Autres Villes</h4>
              <p className="text-sm text-gray-600">Bafoussam: Marché A</p>
              <p className="text-sm text-gray-600">Bamenda: Commercial Ave</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;