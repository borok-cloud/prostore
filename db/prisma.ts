import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
//import { PrismaClient } from '../lib/generated/prisma';
//import { PrismaClientOptions } from '@/lib/generated/prisma/runtime/library';
import ws from 'ws';

//console.log(">> Loaded DATABASE_URL:", process.env.DATABASE_URL);
// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

// Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
const pool = new Pool({ connectionString });

//console.log("ConnectionString:", connectionString);
// console.log("Pool:", pool);

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
const adapter = new PrismaNeon(pool);
//console.log("Adapter:", adapter);
//console.log("Adapter Connect:", adapter.connect); // Add this line
// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
 const prisma = new PrismaClient({ adapter });

const extendedPrisma = prisma.$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});

export { extendedPrisma as prisma };

// // Test the connection
// async function testConnection() {
//     try {
//       await prisma.$queryRaw`SELECT 1`;
//       console.log('Database connected successfully');
//     } catch (error) {
//       console.error('Connection error:', error);
//     }
//   }
  
//   testConnection();