'use server';
//import { PrismaClient } from '@prisma/client';
//import { PrismaClient } from '../generated/prisma';
//import { prisma } from '@/lib/globalPrisma';
import { prisma } from '@/db/prisma';
import { convertToPlainObject } from '../utils';

// Get the latest products
export async function getLatestProducts() {
  //const prisma = new PrismaClient();
   //console.log('Fetching latest products using prisma...', prisma);
  const data = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}