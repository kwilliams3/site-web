import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        <div className="p-3 bg-green-100 rounded-full mb-4">
          <Icon className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ValueCard;