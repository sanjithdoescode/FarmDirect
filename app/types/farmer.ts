// app/types/farmer.ts

// Details needed for the Trust System
interface TrustDetails {
  certifications?: string[]; // List of certification names (e.g., "NPOP", "PGS-India")
  certificationFiles?: string[]; // URLs or IDs of uploaded certificate files (for verification)
  pgsGroupName?: string;         // Name of the PGS group
  pgsVerificationInfo?: string; // How PGS participation is verified (e.g., link, contact)
  farmPhotos?: string[];        // URLs of farm photos
}

// Extending the conceptual FarmerProfile
export interface FarmerProfile {
  id: string;                  // Unique farmer identifier
  userId: string;              // Link to the User model
  name: string;                // Farmer's name (might come from User model)
  farmName?: string;
  address?: {
    // Full address structure
    street: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  };
  contactNumber?: string;
  profilePictureUrl?: string;
  farmDescription?: string;
  yearsFarming?: number;
  farmSize?: {
    value: number;
    unit: 'acres' | 'hectares';
  };
  specialties?: string[];       // e.g., "Organic Vegetables", "Traditional Rice Varieties"
  
  // --- Trust System Fields ---
  trustTier: 1 | 2 | 3;
  trustDetails: TrustDetails;  // Holds the evidence for the tier
  // ---------------------------

  // Other fields from documentation
  certifications?: string[];    // Maybe keep a simple list here too for display?
  ratings?: {                 // Average rating and count
    average: number;
    count: number;
  };
  // ... other fields as needed ...
}

// Interface for farmer data embedded in a Product
export interface ProductFarmerInfo {
  id: string;        // Farmer ID
  name: string;      // Farmer name
  trustTier: 1 | 2 | 3; // Trust tier is crucial here
} 