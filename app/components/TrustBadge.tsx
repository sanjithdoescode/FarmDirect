import React from 'react';
import { FaCertificate, FaUsers, FaInfoCircle } from 'react-icons/fa'; // Example icons

interface TrustBadgeProps {
  tier: 1 | 2 | 3;
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ tier }) => {
  let bgColor = '';
  let textColor = 'text-gray-800';
  let icon = null;
  let text = '';

  switch (tier) {
    case 1:
      bgColor = 'bg-yellow-400'; // Gold/Yellow for Tier 1
      textColor = 'text-yellow-900';
      icon = <FaCertificate className="mr-1" />;
      text = 'Tier 1 Verified';
      break;
    case 2:
      bgColor = 'bg-green-400'; // Green for Tier 2
      textColor = 'text-green-900';
      icon = <FaUsers className="mr-1" />;
      text = 'Tier 2 Community Trust';
      break;
    case 3:
    default:
      bgColor = 'bg-gray-300'; // Gray for Tier 3
      textColor = 'text-gray-700';
      icon = <FaInfoCircle className="mr-1" />;
      text = 'Tier 3 Basic Info';
      break;
  }

  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
      title={`Trust Level: ${text}`}
    >
      {icon}
      {text}
    </div>
  );
};

export default TrustBadge; 