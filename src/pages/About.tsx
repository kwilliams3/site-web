import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">À Propos de SuperMarché</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez notre histoire, notre mission et nos valeurs qui font de nous un supermarché unique.
          </p>
        </div>
        
        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-5xl mx-auto">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg" 
                alt="Notre magasin" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notre Histoire</h2>
              <p className="text-gray-600 mb-6">
                Fondé en 2010, SuperMarché est né d'une passion pour les produits frais et de qualité. Notre fondateur, passionné par l'alimentation saine et durable, a voulu créer un lieu où les clients pourraient trouver des produits exceptionnels tout en soutenant les producteurs locaux.
              </p>
              <p className="text-gray-600 mb-6">
                Au fil des années, nous avons grandi pour devenir le supermarché de référence dans notre région, tout en restant fidèles à nos valeurs d'origine : qualité, fraîcheur, service client exceptionnel et engagement envers notre communauté.
              </p>
              <p className="text-gray-600">
                Aujourd'hui, nous sommes fiers de continuer à servir nos clients avec la même passion et le même dévouement qu'à nos débuts, en proposant toujours les meilleurs produits au meilleur prix.
              </p>
            </div>
          </div>
        </div>
        
        {/* Mission & Values */}
        <div className="max-w-5xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notre Mission</h2>
              <p className="text-gray-600">
                Notre mission est de fournir à nos clients des produits de la plus haute qualité, frais et abordables, tout en soutenant les producteurs locaux et en minimisant notre impact sur l'environnement. Nous nous efforçons de créer une expérience d'achat agréable et personnalisée, où chaque client se sent valorisé et où chaque visite est un plaisir.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notre Vision</h2>
              <p className="text-gray-600">
                Nous aspirons à devenir le supermarché de référence dans notre région, reconnu pour notre engagement envers la qualité, le service client exceptionnel et notre impact positif sur la communauté. Nous voulons être plus qu'un simple lieu d'achat - nous voulons être un partenaire de confiance dans la vie quotidienne de nos clients.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team / Statistics */}
        <div className="max-w-5xl mx-auto mt-12 bg-green-700 text-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-8">SuperMarché en Chiffres</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-4xl font-bold">15+</p>
                <p className="text-sm mt-2">Années d'expérience</p>
              </div>
              <div>
                <p className="text-4xl font-bold">50+</p>
                <p className="text-sm mt-2">Employés dévoués</p>
              </div>
              <div>
                <p className="text-4xl font-bold">1000+</p>
                <p className="text-sm mt-2">Produits disponibles</p>
              </div>
              <div>
                <p className="text-4xl font-bold">20+</p>
                <p className="text-sm mt-2">Producteurs locaux</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;