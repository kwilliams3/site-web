import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import Map from '../components/Map';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Contactez-Nous</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous sommes disponibles pour répondre à vos questions. Contactez-nous par téléphone, WhatsApp, email ou via le formulaire.
          </p>
        </div>
        
        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Colonne de gauche - Informations de contact */}
          <div className="space-y-8">
            {/* Carte de contact */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Nos Coordonnées</h2>
              
              <div className="space-y-4">
                {/* Téléphone */}
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">Téléphone/WhatsApp</p>
                    <p className="text-gray-600">+237 677 70 38 93</p>
                    <p className="text-gray-600">+237 656 95 62 48</p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">Email</p>
                    <p className="text-gray-600">tiliz9@yahoo.fr</p>
                  </div>
                </div>
                
                {/* Adresse */}
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">Adresse</p>
                    <p className="text-gray-600">Akwa, rue Castelnau</p>
                    <p className="text-gray-600">en face Collège King Akwa</p>
                  </div>
                </div>
                
                {/* Horaires */}
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-800">Heures d'Ouverture</p>
                    <p className="text-gray-600">Lundi - Samedi: 7h30 - 20h30</p>
                    <p className="text-gray-600">Dimanche: 9h00 - 15h00</p>
                    <p className="text-sm text-gray-500 mt-1">Fermé les jours fériés</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carte géographique */}
            <Map />
          </div>
          
          {/* Colonne de droite - Formulaire et points de vente */}
          <div className="space-y-8">
            {/* Formulaire de contact */}
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
                  <span className="font-medium"> +237 677 70 38 93</span>
                </p>
              </div>
            </div>

            {/* Points de vente */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Points de Vente au Cameroun</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow-sm">
                  <h4 className="font-medium text-gray-800">Douala</h4>
                  <p className="text-sm text-gray-600">Akwa, rue Castelnau (face Collège King Akwa)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;