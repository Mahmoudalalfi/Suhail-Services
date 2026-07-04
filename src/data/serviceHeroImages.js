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
  'cleaning-building-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782331386/Cleaning_and_Building_services_sktlvm.jpg',
  'driver-services-staffing': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782329210/Driver_Services_Staffing_xibcaw.png',
  'construction-trades': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782329210/Construction_Trades_p2wisz.png',
  'electrical-technical-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782509228/FacilityManagment_tiavdj.jpg',
  'facility-management': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1783161071/FacilityManagment_gvwsch.png',
  'inventory-control': 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1400',
  'garden-outdoor-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1783160264/Garden_Outdoor_Services_ux0mwm.png',
  'assembly-disassembly': 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1400',
  'food-service-events': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1783160442/Food_Service_Events_qrpihn.png',
  'staffing-services': 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1400',
  'hotel-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782329213/Hotel_Services_ur9iqp.jpg',
  'transportation-moving-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782513136/VanCorrection_ywi7uk.png',
  'property-management-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782329212/Property_Management_Services_nlwmvv.jpg',
  'kitchen-dishwashing-services': 'https://res.cloudinary.com/df7aiznm6/image/upload/v1782329212/Kitchen_Dishwashing_Services_kmmv1f.jpg',
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
