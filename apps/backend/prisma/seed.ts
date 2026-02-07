import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding initial data...');

    // 1. Create Tenant (Demo Retail Store)
    const tenant = await prisma.tenant.upsert({
        where: { slug: 'demo-retail-india' },
        update: {},
        create: {
            name: 'Demo Retail India',
            slug: 'demo-retail-india',
        },
    });

    console.log({ tenant });

    // 2. Create Outlet (Main Branch)
    const outlet = await prisma.outlet.create({
        data: {
            name: 'Mumbai Main Branch',
            address: 'Bandra West, Mumbai',
            tenantId: tenant.id,
        },
    });

    console.log({ outlet });

    // 3. Create Basic Products
    const products = [
        { name: 'Masala Chai', price: 20, category: 'Beverages', sku: 'BV001', taxRate: 0.05 },
        { name: 'Samosa', price: 15, category: 'Snacks', sku: 'SN001', taxRate: 0.05 },
        { name: 'Vada Pav', price: 25, category: 'Snacks', sku: 'SN002', taxRate: 0.05 },
        { name: 'Mineral Water', price: 20, category: 'Beverages', sku: 'BV002', taxRate: 0.18 },
    ];

    for (const p of products) {
        await prisma.product.upsert({
            where: { tenantId_sku: { tenantId: tenant.id, sku: p.sku } },
            update: {},
            create: {
                ...p,
                tenantId: tenant.id
            }
        })
    }

    console.log('Seeding complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
