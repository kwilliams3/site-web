import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">À Propos de STE SERDIS SARL</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Services & Distributions - Votre partenaire de confiance pour tous vos besoins
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
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notre Entreprise</h2>
              <p className="text-gray-600 mb-6">
                STE SERDIS SARL, sous la direction de Mme TIEWENGUNOU Epse ELAME Elisabeth, est une entreprise spécialisée dans les services et distributions. Notre promesse : qualité, fiabilité et service client exceptionnel.
              </p>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Coordonnées</h3>
                <p className="text-gray-600"><span className="font-medium">Email :</span> tiliz9@yahoo.fr</p>
                <p className="text-gray-600"><span className="font-medium">Téléphone :</span> +237 677 70 38 93</p>
                <p className="text-gray-600"><span className="font-medium">Téléphone :</span> +237 656 95 62 48</p>
                <p className="text-gray-600 mt-2"><span className="font-medium">Adresse :</span> Akwa, rue Castelnau, en face Collège King Akwa</p>
              </div>
              
              <p className="text-gray-600">
                Nous nous engageons à fournir des services de qualité et une distribution efficace pour répondre aux besoins diversifiés de notre clientèle.
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
                Offrir des services et solutions de distribution de qualité, en créant des partenariats durables avec nos clients et fournisseurs. Nous nous engageons à répondre aux besoins spécifiques de chaque client avec professionnalisme et efficacité.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notre Vision</h2>
              <p className="text-gray-600">
                Devenir le leader reconnu dans notre domaine d'activité, en nous appuyant sur notre expertise, notre réseau de distribution et notre engagement envers l'excellence du service. Nous aspirons à étendre notre présence tout en maintenant nos valeurs fondamentales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;