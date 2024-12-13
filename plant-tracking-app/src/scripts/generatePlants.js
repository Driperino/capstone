import { faker } from '@faker-js/faker';
import fs from 'fs';

// Define the Plant schema for mock data
function generatePlantData() {
  return {
    common_name: faker.word.noun(),
    scientific_name: faker.science.chemicalElement().name + ' ' + faker.word.adjective(),
    family: faker.word.noun() + 'aceae',
    origin: faker.address.country(),
    description: faker.lorem.sentence(),
    care_instructions: {
      water_frequency: faker.helpers.arrayElement(['Once a week', 'Twice a week', 'Once every two weeks']),
      light_requirements: faker.helpers.arrayElement(['Bright indirect light', 'Low light', 'Direct sunlight']),
      humidity: faker.helpers.arrayElement(['High', 'Moderate', 'Low']),
      temperature: faker.helpers.arrayElement(['18-24°C', '15-21°C', '20-25°C']),
      soil: faker.helpers.arrayElement(['Well-drained potting mix', 'Peat-based soil', 'Cactus mix'])
    },
    propagation_methods: faker.helpers.arrayElements(['Stem cutting', 'Division', 'Seed'], faker.datatype.number({ min: 1, max: 3 })),
    toxicity: faker.helpers.arrayElement(['Non-toxic', 'Toxic to pets', 'Toxic to humans']),
    common_issues: faker.helpers.arrayElements(['Brown leaf tips', 'Root rot', 'Yellowing leaves'], faker.datatype.number({ min: 1, max: 3 })),
    ideal_container: faker.helpers.arrayElement(['Plastic pot', 'Ceramic pot', 'Terracotta pot']),
    growth_rate: faker.helpers.arrayElement(['Fast', 'Moderate', 'Slow']),
    fertilizer: faker.helpers.arrayElement(['Monthly with balanced fertilizer', 'Once every two months', 'Every three weeks']),
    image_url: faker.image.nature(640, 480, true)
  };
}

// Generate 500 plant records
const plants = Array.from({ length: 500 }, generatePlantData);

// Write the generated data to a JSON file
fs.writeFile('./plants.json', JSON.stringify(plants, null, 2), (err) => {
  if (err) {
    console.error('Error writing file', err);
  } else {
    console.log('Successfully wrote 500 plant records to plants.json');
  }
});
