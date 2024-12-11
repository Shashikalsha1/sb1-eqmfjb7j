export const SHIP_SPARES_CATEGORIES = {
  'Main Engine Spares': [
    'Cylinder Heads',
    'Crankshafts Bearings',
    'Connecting Rods',
    'Turbochargers',
    'Fuel Injection Systems'
  ],
  'Auxiliary Engine Spares': [
    'Generator Components',
    'Heat Exchangers and Coolers',
    'Starters and Alternators'
  ],
  'Propulsion System Spares': [
    'Propellers and Shafts',
    'Thrusters',
    'Bearings and Seals'
  ],
  'Electrical System Spares': [
    'Switchboards and Panels',
    'Cables, Sensors, and Relays',
    'Lighting Systems'
  ],
  'Deck Machinery Spares': [
    'Winches and Windlasses',
    'Capstans',
    'Cranes and Davits'
  ],
  'Pump and Valve Spares': [
    'Bilge Pumps',
    'Ballast Pumps',
    'Fuel and Lubrication Pumps',
    'Valves, Fittings, and Actuators'
  ],
  'Steering Gear Spares': [
    'Rudders and Steering Systems',
    'Hydraulic Units and Power Packs'
  ],
  'Safety Equipment Spares': [
    'Firefighting Systems',
    'Lifeboat Davits and Accessories',
    'Emergency Signaling Devices'
  ],
  'HVAC System Spares': [
    'Air Conditioning Units',
    'Ventilation Fans',
    'Heating Systems'
  ]
} as const;

export const SHIP_STORE_CATEGORIES = {
  'Deck Stores': [
    'Ropes, Hawsers, and Chains',
    'Rigging Equipment (Shackles, Hooks)',
    'Paints and Coatings'
  ],
  'Engine Room Stores': [
    'Lubricants and Oils',
    'Cleaning Agents (Degreasers, Solvents)',
    'Gaskets, Seals, and Packing Materials'
  ],
  'Electrical Stores': [
    'Cables, Switches, and Connectors',
    'Batteries and Chargers',
    'Bulbs and Lighting Fixtures'
  ],
  'Safety Stores': [
    'PPE (Personal Protective Equipment)',
    'Fire Extinguishers',
    'Lifebuoys, Lifejackets',
    'First Aid Kits and Emergency Supplies'
  ],
  'Galley Stores': [
    'Kitchen Appliances and Utensils',
    'Cleaning and Sanitation Supplies',
    'Refrigeration and Freezer Parts'
  ],
  'Cabin Stores': [
    'Bedding and Linens',
    'Toiletries and Hygiene Products',
    'Furniture and Furnishings'
  ],
  'Tools and Equipment': [
    'Hand Tools (Wrenches, Hammers, Screwdrivers)',
    'Power Tools (Drills, Grinders, Saws)',
    'Testing Equipment'
  ],
  'Stationery and Navigation Supplies': [
    'Logbooks, Charts, and Plotters',
    'Compasses and GPS Units',
    'Flags, Signage, and Documentation'
  ]
} as const;

export const PRODUCT_TYPES = {
  ship_spares: {
    id: 'ship_spares',
    name: 'Ship Spares',
    description: 'Spare parts and components for ships',
    categories: SHIP_SPARES_CATEGORIES
  },
  ship_store: {
    id: 'ship_store', 
    name: 'Ship Store',
    description: 'General ship stores and supplies',
    categories: SHIP_STORE_CATEGORIES
  }
} as const;