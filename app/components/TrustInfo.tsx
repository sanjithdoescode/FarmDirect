import React from 'react';
import { FaCertificate, FaUsers, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import TrustBadge from './TrustBadge';

// Define a conceptual structure for details - this will evolve
interface TrustDetails {
  certifications?: string[]; // For Tier 1
  pgsGroupName?: string;     // For Tier 2
  hasFarmPhotos?: boolean;   // For Tier 3
}

interface TrustInfoProps {
  tier: 1 | 2 | 3;
  details?: TrustDetails; // Optional details prop
}

const TrustInfo: React.FC<TrustInfoProps> = ({ tier, details }) => {
  const renderTier1Details = () => (
    <div className="mt-2">
      <h4 className="font-semibold text-sm text-gray-700 mb-1">Based on Formal Certifications:</h4>
      {details?.certifications && details.certifications.length > 0 ? (
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          {details.certifications.map((cert, index) => (
            <li key={index} className="flex items-center">
              <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
              <span>{cert}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic">Specific certifications not listed.</p>
      )}
      <p className="text-xs text-gray-500 mt-2">Verification: FarmDirect attempts to verify the validity of submitted certificates.</p>
    </div>
  );

  const renderTier2Details = () => (
    <div className="mt-2">
      <h4 className="font-semibold text-sm text-gray-700 mb-1">Based on Participatory Guarantee System (PGS):</h4>
      {details?.pgsGroupName ? (
        <p className="text-sm text-gray-600">Verified member of the <strong>{details.pgsGroupName}</strong> PGS group.</p>
      ) : (
        <p className="text-sm text-gray-500 italic">Specific PGS group not listed.</p>
      )}
      <p className="text-xs text-gray-500 mt-2">Verification: Relies on community trust and peer review within the PGS group.</p>
    </div>
  );

  const renderTier3Details = () => (
    <div className="mt-2">
      <h4 className="font-semibold text-sm text-gray-700 mb-1">Based on Basic Farm Information:</h4>
      {details?.hasFarmPhotos ? (
         <p className="text-sm text-gray-600 flex items-center"><FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" /> Farm photos provided.</p>
      ) : (
        <p className="text-sm text-gray-500 italic">Basic farm details provided.</p>
      )}
       <p className="text-xs text-gray-500 mt-2">Verification: Basic information submitted by the farmer.</p>
    </div>
  );

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex items-center mb-2">
        <TrustBadge tier={tier} />
      </div>
      {tier === 1 && renderTier1Details()}
      {tier === 2 && renderTier2Details()}
      {tier === 3 && renderTier3Details()}
      <a href="/trust-system" className="text-xs text-blue-600 hover:underline mt-3 inline-block">Learn more about Trust Tiers</a>
    </div>
  );
};

export default TrustInfo; 