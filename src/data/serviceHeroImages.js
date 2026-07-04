const ALL_SLUGS = [
  'retail-supermarket-service',
  'cleaning-building-services',
  'driver-services-staffing',
  'construction-trades',
  'electrical-technical-services',
  'facility-management',
  'inventory-control',
  'garden-outdoor-services',
  'assembly-disassembly',
  'food-service-events',
  'staffing-services',
  'hotel-services',
  'transportation-moving-services',
  'property-management-services',
  'kitchen-dishwashing-services',
]

const DEDICATED = {
  'retail-supermarket-service': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782512227/SupermarketEmployee_goteeo.jpg',
  'cleaning-building-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1783163176/Cleaning_zplqdy.png',
  'driver-services-staffing': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782329210/Driver_Services_Staffing_xibcaw.png',
  'construction-trades': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782329210/Construction_Trades_p2wisz.png',
  'electrical-technical-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782509228/FacilityManagment_tiavdj.jpg',
  'facility-management': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1783161071/FacilityManagment_gvwsch.png',
  'inventory-control': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1783163270/Inventory_bbdg8o.png',
  'garden-outdoor-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1783160264/Garden_Outdoor_Services_ux0mwm.png',
  'assembly-disassembly': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1783162964/Assembly_hk1wx8.png',
  'food-service-events': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1783160442/Food_Service_Events_qrpihn.png',
  'staffing-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1783163087/PersonnalService_dpc4r0.png',
  'hotel-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1783165343/HotelService_z3qlhm.png',
  'transportation-moving-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782513136/VanCorrection_ywi7uk.png',
  'property-management-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1783165118/PropertyManagement_hvsoo5.png',
  'kitchen-dishwashing-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1783165524/DishWashers_jrkx7r.png',
}

const OBJECT_POSITION = {
  'retail-supermarket-service': 'center top',
}

export const SERVICE_HERO_IMAGES = Object.fromEntries(ALL_SLUGS.map((slug) => [slug, DEDICATED[slug]]))

export function getServiceHeroImage(slug) {
  if (!slug) return undefined
  return DEDICATED[slug]
}

export function getServiceHeroPosition(slug) {
  return OBJECT_POSITION[slug] || 'center center'
}
