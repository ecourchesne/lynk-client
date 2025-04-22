import { PrismaClient } from '@prisma/client';
import { ChannelType } from 'src/utils/enums/channel-type.enum';

const prisma = new PrismaClient();

// Seed decoders
async function seedDecoders() {
  const decoders = [
    { name: 'Decoder 1', model: 'EPICO', state: 'inactive' },
    { name: 'Decoder 2', model: 'EPICO', state: 'inactive' },
    { name: 'Decoder 3', model: 'EPICO', state: 'inactive' },
    { name: 'Decoder 4', model: 'EPICO', state: 'inactive' },
    { name: 'Decoder 5', model: 'EPICO', state: 'inactive' },
    { name: 'Decoder 6', model: 'EPICO', state: 'inactive' },
    { name: 'Decoder 7', model: 'WC-100', state: 'inactive' },
    { name: 'Decoder 8', model: 'WC-100', state: 'inactive' },
    { name: 'Decoder 9', model: 'WC-100', state: 'inactive' },
    { name: 'Decoder 10', model: 'WC-100', state: 'inactive' },
    { name: 'Decoder 11', model: 'PACE', state: 'inactive' },
    { name: 'Decoder 12', model: 'PACE', state: 'inactive' },
  ];

  for (const decoder of decoders) {
    await prisma.decoder.create({
      data: {
        name: decoder.name,
        model: decoder.model,
        state: decoder.state,
      },
    });
  }

  console.log('12 decoders have been created!');
}

// Seed companies
async function seedCompanies() {
  const companies = [
    { name: 'Motel Blanchette', address: '123 Tech Street' },
    { name: 'Dauphin.', address: '456 Innovation Blvd' },
    { name: 'Best Western', address: '789 Future Lane' },
    { name: 'Delta', address: '101 Alpha Road' },
  ];

  for (const company of companies) {
    await prisma.company.create({
      data: {
        name: company.name,
        address: company.address,
      },
    });
  }

  console.log('4 companies have been created!');
}

// Seed subscription items
async function seedSubscriptionItems() {
  const apps = [
    { name: 'Netflix', type: "app" },
    { name: 'Spotify', type: "app" },
    { name: 'Disney+', type: "app" },
    { name: 'Amazon Prime Video', type: "app" },
    { name: 'YouTube Premium', type: "app" },
  ];

  const channels = [
    { name: 'CBC', type: "channel" },
    { name: 'CTV', type: "channel" },
    { name: 'Global', type: "channel" },
    { name: 'Citytv', type: "channel" },
    { name: 'TSN', type: "channel" },
    { name: 'Sportsnet', type: "channel" },
    { name: 'CP24', type: "channel" },
    { name: 'RDS', type: "channel" },
    { name: 'Teletoon', type: "channel" },
    { name: 'Treehouse', type: "channel" },
  ];

  const subscriptionItems = [...apps, ...channels];

  for (const item of subscriptionItems) {
    await prisma.subscriptionItem.create({
      data: {
        name: item.name,
        type: item.type.toString(),
      },
    });
  }

  console.log('5 apps and 10 channels have been created!');
}

// Main function to run all seeds
async function main() {
  console.log('Seeding data...');
  await seedDecoders();
  await seedCompanies();
  await seedSubscriptionItems();
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error while seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });