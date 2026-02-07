import { Controller, Get, Headers } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    findAll(@Headers('x-tenant-id') tenantId: string) {
        // In a real app, we'd extract this from a JWT or a proper Guard.
        // For this MVP step, we'll pass it simply to verify data flow.
        // Defaulting to our seeded seed-tenant-id if missing for ease of testing.

        // Note: In production this MUST be secured.
        const effectiveTenantId = tenantId || '30448041-333d-488c-9f5a-0edd87095870'; // The ID from our seed output
        return this.productsService.findAll(effectiveTenantId);
    }
}
