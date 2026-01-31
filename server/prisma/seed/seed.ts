import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '../../generated/prisma/client';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const brands = [
    {
      name: 'Toyota',
      models: ['Corolla', 'Hilux', 'Yaris', 'Etios', 'RAV4'],
    },
    {
      name: 'Honda',
      models: ['Civic', 'Fit', 'HR-V', 'City', 'CR-V'],
    },
    {
      name: 'Volkswagen',
      models: ['Gol', 'Polo', 'Virtus', 'T-Cross', 'Jetta'],
    },
    {
      name: 'Chevrolet',
      models: ['Onix', 'Prisma', 'Cruze', 'Tracker', 'S10'],
    },
    {
      name: 'Ford',
      models: ['Ka', 'Fiesta', 'Focus', 'EcoSport', 'Ranger'],
    },
    {
      name: 'Hyundai',
      models: ['HB20', 'Creta', 'Tucson', 'Elantra', 'Santa Fe'],
    },
    {
      name: 'Fiat',
      models: ['Uno', 'Palio', 'Argo', 'Cronos', 'Toro'],
    },
    {
      name: 'Nissan',
      models: ['March', 'Versa', 'Sentra', 'Kicks', 'Frontier'],
    },
    {
      name: 'Renault',
      models: ['Kwid', 'Sandero', 'Logan', 'Duster', 'Captur'],
    },
    {
      name: 'Jeep',
      models: ['Renegade', 'Compass', 'Commander'],
    },
    {
      name: 'BMW',
      models: ['320i', 'X1', 'X3', 'X5', 'iX'],
    },
    {
      name: 'Mercedes-Benz',
      models: ['A200', 'C180', 'C200', 'GLA200', 'GLC300'],
    },
    {
      name: 'Audi',
      models: ['A3', 'A4', 'Q3', 'Q5', 'Q7'],
    },
    {
      name: 'Peugeot',
      models: ['208', '2008', '3008', '308'],
    },
    {
      name: 'Citroën',
      models: ['C3', 'C4 Cactus', 'C5 Aircross'],
    },
  ];

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { name: brand.name },
      update: {},
      create: {
        name: brand.name,
        brandModels: {
          create: brand.models.map((model) => ({ name: model })),
        },
      },
    });
  }

  console.log('Seed executado com sucesso 🌱');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
