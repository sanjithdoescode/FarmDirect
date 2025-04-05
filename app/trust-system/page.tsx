import React from 'react';
import Header from '../components/Header'; // Assuming Header exists
import Footer from '../components/Footer'; // Assuming Footer exists
import { FaCertificate, FaUsers, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function TrustSystemPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">FarmDirect Trust System Explained</h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12 text-center">
          At FarmDirect, transparency is key. Since we cannot personally verify the quality of every item from every farm, we've introduced a tiered trust system to help you understand the basis for each farmer's verification level.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Tier 1 */}
          <div className="border border-yellow-300 bg-yellow-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-3">
              <FaCertificate className="text-3xl text-yellow-600 mr-3" />
              <h2 className="text-2xl font-semibold text-yellow-800">Tier 1: Formal Certification</h2>
            </div>
            <p className="text-gray-700 mb-2">
              Farmers in Tier 1 have provided valid, recognized certifications related to farming practices, quality, or safety standards. This represents the highest level of formal, external verification available on our platform.
            </p>
            <p className="text-sm text-gray-600 font-medium mb-1">Examples include:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-3">
              <li>NPOP (India Organic)</li>
              <li>PGS-India Green</li>
              <li>India Good Agriculture Practice (IndG.A.P.)</li>
              <li>GlobalG.A.P.</li>
              <li>HACCP / ISO 22000 (Food Safety)</li>
            </ul>
            <p className="text-xs text-gray-500"><strong>Verification:</strong> FarmDirect attempts to verify the validity and expiry of submitted certificates with the issuing bodies where possible.</p>
          </div>

          {/* Tier 2 */}
          <div className="border border-green-300 bg-green-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-3">
              <FaUsers className="text-3xl text-green-600 mr-3" />
              <h2 className="text-2xl font-semibold text-green-800">Tier 2: Community Trust</h2>
            </div>
            <p className="text-gray-700 mb-2">
              Tier 2 farmers participate in recognized Participatory Guarantee Systems (PGS). PGS relies on community involvement, peer review, and collective responsibility among farmers, consumers, and local stakeholders to ensure adherence to specific standards (often organic or sustainable).
            </p>
            <p className="text-sm text-gray-600 mb-3">
              This tier emphasizes trust built within a community network rather than formal third-party certification.
            </p>
            <p className="text-xs text-gray-500"><strong>Verification:</strong> FarmDirect verifies the farmer's membership in a recognized PGS group based on information provided by the group or farmer.</p>
          </div>

          {/* Tier 3 */}
          <div className="border border-gray-300 bg-gray-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-3">
              <FaInfoCircle className="text-3xl text-gray-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">Tier 3: Basic Information</h2>
            </div>
            <p className="text-gray-700 mb-2">
              Farmers in Tier 3 have provided basic information about their farm, such as location, description, and potentially photos. This tier provides foundational transparency but does not involve formal certification or community-based PGS verification.
            </p>
             <p className="text-sm text-gray-600 mb-3">
              It serves as an entry point for farmers joining the platform.
            </p>
            <p className="text-xs text-gray-500"><strong>Verification:</strong> FarmDirect performs basic checks on the submitted information for plausibility and completeness.</p>
          </div>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-500 text-orange-700 p-4 rounded-md max-w-4xl mx-auto" role="alert">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-2xl mr-3" />
            <h3 className="font-bold">Important Considerations</h3>
          </div>
          <p className="mt-2 text-sm">
            While this system aims to increase transparency, it's not an absolute guarantee of quality or practice adherence. Tier 1 relies on the rigour of external certifiers, Tier 2 on the integrity of the PGS group, and Tier 3 on the farmer's self-reporting. We encourage you to also consider farmer profiles, product descriptions, and reviews when making your purchasing decisions.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
} 