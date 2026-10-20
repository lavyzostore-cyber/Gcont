export interface VehicleTier {
  id: string;
  name: string;
  nameEs: string;
  price: number;
  description: string;
  descriptionEs: string;
  examples: string;
  badge?: string;
}

export interface SpecialtyTier {
  id: string;
  name: string;
  nameEs: string;
  priceDisplay: string;
  priceDisplayEs: string;
  description: string;
  descriptionEs: string;
}

export interface AddOnService {
  id: string;
  name: string;
  nameEs: string;
  price: number;
  description: string;
  descriptionEs: string;
  popular?: boolean;
}

export interface ServiceFeature {
  id: string;
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  icon: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  titleEs: string;
  category: 'exterior' | 'interior' | 'wheels' | 'mobile' | 'flyer';
  image: string;
  alt: string;
  isRealClient: boolean;
  cropClass?: string;
  caption: string;
  captionEs: string;
}

export const BUSINESS_INFO = {
  name: 'G Contreras Car Wash',
  subtitle: 'Mobile Detailing',
  tagline: 'PROFESSIONAL CAR CARE. RIGHT AT YOUR DOOR.',
  taglineEs: 'CUIDADO AUTOMOTRIZ PROFESIONAL. EN LA PUERTA DE TU HOGAR.',
  heroHeadline: 'PROFESSIONAL CAR CARE. RIGHT AT YOUR DOOR.',
  heroHeadlineEs: 'CUIDADO AUTOMOTRIZ PROFESIONAL. EN LA PUERTA DE TU HOGAR.',
  heroSubheadline: 'Mobile car washing and detailing across Bakersfield, Shafter, and Wasco.',
  heroSubheadlineEs: 'Lavado y detallado móvil profesional en Bakersfield, Shafter y Wasco.',
  phone: '(661) 692-1044',
  rawPhone: '6616921044',
  intlPhone: '16616921044',
  instagram: '@gcontrerascarwash',
  instagramUrl: 'https://www.instagram.com/gcontrerascarwash/',
  locations: ['Bakersfield', 'Shafter', 'Wasco'],
  state: 'California',
  loyaltyOffer: {
    title: 'YOUR 5TH WASH IS FREE',
    titleEs: '¡TU 5TO LAVADO ES GRATIS!',
    subtitle: 'Ask us for the details of our repeat-customer offer.',
    subtitleEs: 'Pregúntanos por los detalles de nuestra oferta para clientes frecuentes.',
    disclaimer: 'Owner editable promotion. Confirmed on official business Instagram profile.'
  },
  assets: {
    brandLogo: '/assets/real/flyer_brand_logo.jpg',
    alfaRomeo: '/assets/real/alfa_romeo.jpg',
    suburbanSuv: '/assets/real/suburban_suv.jpg',
    snowFoamTruck: '/assets/real/snow_foam_truck.jpg',
    mobileRigTruck: '/assets/real/mobile_rig_truck.jpg',
    customWheel: '/assets/real/custom_wheel.jpg',
    heroVideo: '/assets/video/hero_detailing.mp4',
    profileScreenshot: '/assets/aistudio/Screenshot_2026-10-20-20-46-50-63_1c337646f29875672b5a61192b9010f9_7e68eb1b.jpg',
    flyerScreenshot: '/assets/aistudio/Screenshot_2026-10-20-20-50-47-09_1c337646f29875672b5a61192b9010f9_ee9d32ea.jpg',
  }
};

export const STANDARD_INCLUSIONS = [
  { id: 'hand_wash', en: 'Exterior hand wash', es: 'Lavado a mano exterior' },
  { id: 'wheels', en: 'Wheels & tires cleaned', es: 'Limpieza de rines y llantas' },
  { id: 'windows', en: 'Windows cleaned (inside & out)', es: 'Limpieza de vidrios y cristales' },
  { id: 'wipe_down', en: 'Interior wipe down & dust removal', es: 'Limpieza interior y tablero' },
  { id: 'door_jambs', en: 'Door jambs cleaned', es: 'Marcos de puertas limpios' },
  { id: 'tire_shine', en: 'High-gloss tire shine', es: 'Brillo y protector para llantas' },
  { id: 'spot_free', en: 'Spot-free water rinse', es: 'Enjuague con agua libre de manchas' },
];

export const VEHICLE_TIERS: VehicleTier[] = [
  {
    id: 'small',
    name: 'Small Vehicles',
    nameEs: 'Vehículos Pequeños',
    price: 35,
    description: 'Sedans, Coupes, and Compact Hatchbacks',
    descriptionEs: 'Sedanes, cupés y autos compactos',
    examples: 'Honda Civic, Toyota Corolla, BMW 3 Series, Mustang, Model 3',
  },
  {
    id: 'midsize',
    name: 'Mid-Size Vehicles',
    nameEs: 'Vehículos Medianos',
    price: 45,
    description: '4-Door Full Sedans, Small Trucks, Crossovers & Non-Lifted SUVs',
    descriptionEs: 'Autos de 4 puertas, trocas pequeñas, crossovers y SUVs',
    examples: 'Toyota RAV4, Ford Maverick, Honda CR-V, Tacoma, Subaru Outback',
    badge: 'Most Popular'
  },
  {
    id: 'large',
    name: 'Large Trucks / SUVs',
    nameEs: 'Trocas Grandes / SUVs',
    price: 50,
    description: 'Lifted Trucks, 3-Row Full-Size SUVs & Crew Cabs',
    descriptionEs: 'Trocas levantadas, SUVs grandes de 3 filas y cabinas dobles',
    examples: 'Silverado 1500/2500, F-150, Ram 1500, Chevy Tahoe, Suburban',
  }
];

export const SPECIALTY_TIERS: SpecialtyTier[] = [
  {
    id: 'rvs',
    name: 'RVs & Motorhomes',
    nameEs: 'Casas Rodantes (RVs)',
    priceDisplay: 'Price Varies',
    priceDisplayEs: 'Precio Varía',
    description: 'Custom quote based on overall length, condition, and height.',
    descriptionEs: 'Cotización personalizada según tamaño y condición.',
  },
  {
    id: 'semis',
    name: 'Semi Trucks & Cabs',
    nameEs: 'Tráileres y Tractocamiones',
    priceDisplay: 'Price Varies',
    priceDisplayEs: 'Precio Varía',
    description: 'Commercial rigs and work cabs washed on-site with high-power equipment.',
    descriptionEs: 'Lavado profesional en su base o patio de estacionamiento.',
  },
  {
    id: 'utvs',
    name: 'UTVs (RZRs & Can-Ams)',
    nameEs: 'Vehículos UTV (RZR / Can-Am)',
    priceDisplay: '$30 – $55',
    priceDisplayEs: '$30 – $55',
    description: 'Mud removal, chassis wash, roll cage wipe-down, and plastics shine.',
    descriptionEs: 'Remoción de lodo, lavado de chasis y limpieza completa.',
  }
];

export const ADD_ON_SERVICES: AddOnService[] = [
  {
    id: 'pet_hair',
    name: 'Pet Hair Removal',
    nameEs: 'Remoción de Pelo de Mascota',
    price: 10,
    description: 'Specialty brush and rubber blade extraction from seats and floor mats.',
    descriptionEs: 'Extracción dedicada de pelo en alfombras y asientos con cepillo especial.',
  },
  {
    id: 'seat_shampoo',
    name: 'Seat Shampoo',
    nameEs: 'Lavado y Shampoo de Asientos',
    price: 20,
    description: 'Deep stain lifting extraction and antibacterial fabric freshening.',
    descriptionEs: 'Eliminación profunda de manchas y revitalización de tapicería.',
    popular: true
  },
  {
    id: 'engine_bay',
    name: 'Engine Bay Cleaning',
    nameEs: 'Lavado de Bahía de Motor',
    price: 20,
    description: 'Degreasing engine surfaces, careful low-pressure rinse, and protective dress.',
    descriptionEs: 'Desengrasado seguro de motor, enjuague cuidadoso y abrillantador.',
  },
  {
    id: 'wax_protection',
    name: 'Wax & Paint Protection',
    nameEs: 'Cera y Protección de Pintura',
    price: 25,
    description: 'Hydrophobic hand polymer sealant for extreme gloss and UV sun protection.',
    descriptionEs: 'Sellador hidrofóbico para brillo intenso y protección solar UV.',
    popular: true
  },
  {
    id: 'deep_interior',
    name: 'Deep Interior Cleaning',
    nameEs: 'Detallado Interior Profundo',
    price: 30,
    description: 'Steam vents, crevices, deep cup holder sanitation, and leather conditioner.',
    descriptionEs: 'Sanitización profunda de rejillas, consola, portavasos y tratamiento de piel.',
  },
  {
    id: 'headlight_restoration',
    name: 'Headlight Restoration',
    nameEs: 'Restauración de Faros',
    price: 30,
    description: 'Removal of yellow oxidation, multi-stage wet compound polish, and UV clear seal.',
    descriptionEs: 'Eliminación de paño amarillo, pulido progresivo y sellado transparente UV.',
  }
];

export const CORE_SERVICES: ServiceFeature[] = [
  {
    id: 'exterior',
    title: 'Exterior Hand Wash & Gloss',
    titleEs: 'Lavado Exterior a Mano y Brillo',
    description: 'Gentle scratch-free two-bucket hand wash, snow foam pre-soak, and spot-free filtered rinse for an effortless mirror gloss.',
    descriptionEs: 'Lavado a mano sin rayones, prelavado de espuma densa y enjuague libre de manchas para un reflejo cristalino.',
    icon: 'Sparkles'
  },
  {
    id: 'interior',
    title: 'Interior Refresh & Detailing',
    titleEs: 'Detallado y Limpieza Interior',
    description: 'Thorough vacuuming, precision crevice blow-out, dashboard UV dress, door jambs scrub, and crystal-clear streakless windows.',
    descriptionEs: 'Aspirado a fondo, limpieza detallada de tablero y molduras, marcos de puertas y vidrios sin rayas.',
    icon: 'Armchair'
  },
  {
    id: 'wheels',
    title: 'Wheel & Tire Decontamination',
    titleEs: 'Limpieza de Rines y Llantas',
    description: 'Brake dust dissolver, wheel barrel scrub, lug nut detailing, and a non-sling satin or high-gloss tire finish that lasts.',
    descriptionEs: 'Eliminación de polvo de frenos, cepillado de rines, limpieza de tuercas y abrillantador duradero para llantas.',
    icon: 'Disc'
  },
  {
    id: 'mobile',
    title: '100% Mobile Service Rig',
    titleEs: 'Servicio 100% a Domicilio',
    description: 'We bring our self-contained wash rig directly to your home, driveway, or workplace. No waiting in long car wash lines.',
    descriptionEs: 'Llegamos a tu casa o trabajo con equipo profesional. Ahorra tiempo sin salir de tu hogar ni hacer filas.',
    icon: 'Truck'
  }
];

export const SERVICE_CITIES = [
  {
    name: 'Bakersfield',
    county: 'Kern County',
    coverage: 'Central Bakersfield, Rosedale, Southwest, East, and surrounding neighborhoods',
    coverageEs: 'Centro, Rosedale, Southwest y zonas metropolitanas'
  },
  {
    name: 'Shafter',
    county: 'Kern County',
    coverage: 'Residential driveways, agricultural offices, and local businesses',
    coverageEs: 'Comunidades residenciales y negocios locales'
  },
  {
    name: 'Wasco',
    county: 'Kern County',
    coverage: 'Full city mobile coverage and outskirts',
    coverageEs: 'Cobertura completa en toda el área urbana y alrededores'
  }
];
