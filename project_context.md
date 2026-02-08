Project Context generated at 02/08/2026 18:22:09

## Project Structure

```
+---apps
|   +---backend
|   |   +---prisma
|   |   |   +---schema.prisma
|   |   |   \---seed.ts
|   |   +---src
|   |   |   +---handlers
|   |   |   |   \---api.ts
|   |   |   +---products
|   |   |   |   +---products.controller.ts
|   |   |   |   +---products.module.ts
|   |   |   |   \---products.service.ts
|   |   |   +---app.controller.spec.ts
|   |   |   +---app.controller.ts
|   |   |   +---app.module.ts
|   |   |   +---app.service.ts
|   |   |   +---main.ts
|   |   |   \---prisma.service.ts
|   |   +---test
|   |   |   +---app.e2e-spec.ts
|   |   |   \---jest-e2e.json
|   |   +---.env
|   |   +---.prettierrc
|   |   +---eslint.config.mjs
|   |   +---nest-cli.json
|   |   +---package.json
|   |   +---README.md
|   |   +---tsconfig.build.json
|   |   \---tsconfig.json
|   \---web
|   |   +---public
|   |   |   \---vite.svg
|   |   +---src
|   |   |   +---assets
|   |   |   |   \---react.svg
|   |   |   +---components
|   |   |   |   \---ui
|   |   |   |   |   \---Button.tsx
|   |   |   +---features
|   |   |   |   \---pos
|   |   |   |   |   +---CartPanel.tsx
|   |   |   |   |   +---CategoryTabs.tsx
|   |   |   |   |   +---CheckoutModal.tsx
|   |   |   |   |   +---CustomerModal.tsx
|   |   |   |   |   +---NoteModal.tsx
|   |   |   |   |   +---Numpad.tsx
|   |   |   |   |   +---ProductGrid.tsx
|   |   |   |   |   +---ReceiptModal.tsx
|   |   |   |   |   +---SessionModal.tsx
|   |   |   |   |   \---Views.tsx
|   |   |   +---layout
|   |   |   |   \---POSLayout.tsx
|   |   |   +---lib
|   |   |   |   \---db.ts
|   |   |   +---services
|   |   |   |   +---api.ts
|   |   |   |   +---orderService.ts
|   |   |   |   \---syncService.ts
|   |   |   +---store
|   |   |   |   +---useCartStore.ts
|   |   |   |   \---useSessionStore.ts
|   |   |   +---types
|   |   |   |   +---index.ts
|   |   |   |   \---payment.ts
|   |   |   +---App.css
|   |   |   +---App.tsx
|   |   |   +---index.css
|   |   |   \---main.tsx
|   |   +---.gitignore
|   |   +---eslint.config.js
|   |   +---index.html
|   |   +---package.json
|   |   +---README.md
|   |   +---tsconfig.app.json
|   |   +---tsconfig.json
|   |   +---tsconfig.node.json
|   |   \---vite.config.ts
+---packages
+---.gitignore
+---generate_context.ps1
+---netlify.toml
+---package-lock.json
+---package.json
\---project_context.md
```


## .gitignore

```gitignore


node_modules
dist
build
.env
.DS_Store
coverage
.vscode


``` 

## netlify.toml

```toml


[build]
  base = "/"
  publish = "apps/web/dist"
  command = "npm run build --workspaces"

[functions]
  external_node_modules = ["@nestjs/microservices", "@nestjs/websockets", "class-transformer", "class-validator", "cache-manager"]
  node_bundler = "esbuild"
  directory = "apps/backend/src/handlers"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200


``` 

## package.json

```json


{
  "name": "kaa-pos",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev:web": "npm run dev --workspace=apps/web",
    "dev:backend": "npm run start:dev --workspace=apps/backend",
    "build": "npm run build --workspaces"
  }
}

``` 

## apps\backend\.env

```properties


# Helper: Supabase Transaction Mode (Port 6543)
DATABASE_URL="postgresql://postgres:Tuffpassword%40123@db.ehauqvrtwxdseisbynkx.supabase.co:6543/postgres?pgbouncer=true"

# Helper: Supabase Session Mode (Port 5432)
DIRECT_URL="postgresql://postgres:Tuffpassword%40123@db.ehauqvrtwxdseisbynkx.supabase.co:5432/postgres"


``` 

## apps\backend\.prettierrc

```


{
  "singleQuote": true,
  "trailingComma": "all"
}


``` 

## apps\backend\eslint.config.mjs

```


// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
);


``` 

## apps\backend\nest-cli.json

```json


{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}


``` 

## apps\backend\package.json

```json


{
  "name": "kaa-pos-backend",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "npx prisma generate && nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
  "dependencies": {
    "@nestjs/common": "^11.0.1",
    "@nestjs/core": "^11.0.1",
    "@nestjs/platform-express": "^11.0.1",
    "@prisma/client": "5.10.2",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "serverless-http": "^3.2.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.2.0",
    "@eslint/js": "^9.18.0",
    "@nestjs/cli": "^11.0.0",
    "@nestjs/schematics": "^11.0.0",
    "@nestjs/testing": "^11.0.1",
    "@types/express": "^5.0.0",
    "@types/jest": "^30.0.0",
    "@types/node": "^22.10.7",
    "@types/supertest": "^6.0.2",
    "@types/aws-lambda": "^8.10.130",
    "eslint": "^9.18.0",
    "eslint-config-prettier": "^10.0.1",
    "eslint-plugin-prettier": "^5.2.2",
    "globals": "^16.0.0",
    "jest": "^30.0.0",
    "prettier": "^3.4.2",
    "prisma": "5.10.2",
    "source-map-support": "^0.5.21",
    "supertest": "^7.0.0",
    "ts-jest": "^29.2.5",
    "ts-loader": "^9.5.2",
    "ts-node": "^10.9.2",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.7.3",
    "typescript-eslint": "^8.20.0"
  },
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node"
  }
}

``` 

## apps\backend\README.md

```markdown


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


``` 

## apps\backend\tsconfig.build.json

```json


{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts"]
}


``` 

## apps\backend\tsconfig.json

```json


{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "resolvePackageJsonExports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2023",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "noFallthroughCasesInSwitch": true
  }
}


``` 

## apps\backend\prisma\schema.prisma

```prisma


generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model Tenant {
  id        String   @id @default(uuid())
  name      String
  slug      String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  outlets   Outlet[]
  users     User[]
  products  Product[]
}

model Outlet {
  id        String   @id @default(uuid())
  name      String
  address   String?
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  
  orders    Order[]
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Product {
  id          String   @id @default(uuid())
  name        String
  description String?
  price       Decimal  @db.Decimal(10, 2)
  sku         String?
  category    String?
  taxRate     Decimal  @default(0.0) @db.Decimal(5, 2) // 0.05, 0.18
  imageUrl    String?

  tenantId    String
  tenant      Tenant   @relation(fields: [tenantId], references: [id])
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([tenantId, sku])
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  role      Role     @default(CASHIER)
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  OWNER
  MANAGER
  CASHIER
}

model Order {
  id          String      @id @default(uuid())
  outletId    String
  outlet      Outlet      @relation(fields: [outletId], references: [id])
  
  cartItems   Json        // Storing full cart snapshot for simplicity in MVP
  subtotal    Decimal     @db.Decimal(10, 2)
  taxTotal    Decimal     @db.Decimal(10, 2)
  totalAmount Decimal     @db.Decimal(10, 2)
  status      OrderStatus @default(COMPLETED)
  
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

enum OrderStatus {
  PENDING
  COMPLETED
  CANCELLED
}


``` 

## apps\backend\prisma\seed.ts

```typescript


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


``` 

## apps\backend\src\app.controller.spec.ts

```typescript


import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});


``` 

## apps\backend\src\app.controller.ts

```typescript


import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}


``` 

## apps\backend\src\app.module.ts

```typescript


import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }


``` 

## apps\backend\src\app.service.ts

```typescript


import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}


``` 

## apps\backend\src\main.ts

```typescript


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();


``` 

## apps\backend\src\prisma.service.ts

```typescript


import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}


``` 

## apps\backend\src\handlers\api.ts

```typescript


import { NestFactory } from '@nestjs/core';
import serverlessExpress from 'serverless-http';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from '../app.module';

let server: Handler;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.init();

    const expressApp = app.getHttpAdapter().getInstance();
    return serverlessExpress(expressApp);
}

export const handler: Handler = async (
    event: any,
    context: Context,
    callback: Callback,
) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
};


``` 

## apps\backend\src\products\products.controller.ts

```typescript


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


``` 

## apps\backend\src\products\products.module.ts

```typescript


import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [ProductsController],
    providers: [ProductsService, PrismaService],
})
export class ProductsModule { }


``` 

## apps\backend\src\products\products.service.ts

```typescript


import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async findAll(tenantId: string) {
        return this.prisma.product.findMany({
            where: { tenantId },
        });
    }
}


``` 

## apps\backend\test\app.e2e-spec.ts

```typescript


import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});


``` 

## apps\backend\test\jest-e2e.json

```json


{
  "moduleFileExtensions": ["js", "json", "ts"],
  "rootDir": ".",
  "testEnvironment": "node",
  "testRegex": ".e2e-spec.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  }
}


``` 

## apps\web\.gitignore

```gitignore


# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?


``` 

## apps\web\eslint.config.js

```javascript


import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])


``` 

## apps\web\index.html

```html


<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>KAA POS</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>


``` 

## apps\web\package.json

```json


{
  "name": "kaa-pos-web",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "classnames": "^2.5.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.31.0",
    "idb": "^8.0.3",
    "lucide-react": "^0.562.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.12.0",
    "tailwind-merge": "^3.4.0",
    "zustand": "^5.0.11"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "^7.2.4"
  }
}

``` 

## apps\web\README.md

```markdown


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


``` 

## apps\web\tsconfig.app.json

```json


{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}


``` 

## apps\web\tsconfig.json

```json


{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}


``` 

## apps\web\tsconfig.node.json

```json


{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}


``` 

## apps\web\vite.config.ts

```typescript


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


``` 

## apps\web\src\App.css

```css


#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}


``` 

## apps\web\src\App.tsx

```tsx


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { POSLayout } from './layout/POSLayout';
import { ProductGrid } from './features/pos/ProductGrid';
import { CartPanel } from './features/pos/CartPanel';
import { OrdersView, SettingsView } from './features/pos/Views';

const POSPage = () => {
  const [ready, setReady] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'home' | 'orders' | 'settings'>('home');

  React.useEffect(() => {
    const init = async () => {
      try {
        await import('./lib/db').then(m => m.db.seedStart());
      } catch (e) {
        console.error("Seeding failed", e);
      } finally {
        setReady(true);
      }
    };
    init();
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--color-text-muted)]">Loading POS...</p>
        </div>
      </div>
    );
  }

  return (
    <POSLayout
      cartComponent={<CartPanel />}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'home' && <ProductGrid />}
      {activeTab === 'orders' && <OrdersView />}
      {activeTab === 'settings' && <SettingsView />}
    </POSLayout>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<POSPage />} />
    </Routes>
  );
};

export default App;


``` 

## apps\web\src\index.css

```css


/* Modern Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  /* Brand Colors - Modern Indigo/Blue palette */
  --primary-hue: 240;
  --primary-sat: 80%;
  --primary-lig: 58%;

  --color-primary: hsl(var(--primary-hue), var(--primary-sat), var(--primary-lig));
  --color-primary-dark: hsl(var(--primary-hue), var(--primary-sat), 48%);
  --color-primary-light: hsl(var(--primary-hue), var(--primary-sat), 68%);
  --color-primary-subtle: hsl(var(--primary-hue), 70%, 96%);

  /* Backgrounds - Clean & Minimal */
  --bg-hue: 220;
  --bg-sat: 15%;
  --bg-lig: 98%;

  --color-bg-base: hsl(var(--bg-hue), var(--bg-sat), var(--bg-lig));
  --color-bg-surface: hsl(var(--bg-hue), var(--bg-sat), 100%);
  --color-bg-subtle: hsl(var(--bg-hue), 12%, 96%);

  /* Text - Improved contrast */
  --color-text-main: hsl(var(--bg-hue), 25%, 12%);
  --color-text-muted: hsl(var(--bg-hue), 15%, 48%);
  --color-text-subtle: hsl(var(--bg-hue), 10%, 65%);

  /* Status Colors - Vibrant & Clear */
  --color-success: hsl(150, 75%, 42%);
  --color-warning: hsl(38, 92%, 55%);
  --color-danger: hsl(0, 72%, 58%);
  --color-info: hsl(200, 80%, 52%);

  /* Borders - Softer */
  --color-border: hsl(var(--bg-hue), 12%, 92%);
  --color-border-subtle: hsl(var(--bg-hue), 10%, 95%);

  /* Fonts */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --font-display: 'Outfit', var(--font-sans);

  /* Shadows - More refined */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);

  /* Radius - Modern curves */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;

  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-hue: 225;
    --bg-sat: 12%;
    --bg-lig: 8%;

    --color-bg-base: hsl(var(--bg-hue), var(--bg-sat), var(--bg-lig));
    --color-bg-surface: hsl(var(--bg-hue), var(--bg-sat), 12%);
    --color-bg-subtle: hsl(var(--bg-hue), var(--bg-sat), 16%);

    --color-text-main: hsl(var(--bg-hue), 8%, 96%);
    --color-text-muted: hsl(var(--bg-hue), 8%, 68%);
    --color-text-subtle: hsl(var(--bg-hue), 6%, 55%);

    --color-border: hsl(var(--bg-hue), 10%, 20%);
    --color-border-subtle: hsl(var(--bg-hue), 8%, 16%);
  }
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-bg-base);
  color: var(--color-text-main);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
}

/* Improved Glassmorphism */
.glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.08);
}

@media (prefers-color-scheme: dark) {
  .glass {
    background: rgba(20, 20, 25, 0.75);
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
  }
}

/* Smooth Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-scale-in {
  animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Enhanced Product Card */
.product-card {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
}

.product-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: var(--shadow-xl);
}

.product-card:active {
  transform: translateY(-2px) scale(1.01);
}

/* Utilities */
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Modern Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  border: none;
  font-family: var(--font-sans);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.btn:active::before {
  width: 300px;
  height: 300px;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  color: white;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  background-color: var(--color-bg-subtle);
  color: var(--color-text-main);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background-color: var(--color-bg-surface);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary);
  border: 1.5px solid var(--color-primary);
}

.btn-outline:hover {
  background-color: var(--color-primary-subtle);
  transform: translateY(-1px);
}

.btn-ghost {
  background-color: transparent;
  color: var(--color-text-muted);
}

.btn-ghost:hover {
  background-color: var(--color-bg-subtle);
  color: var(--color-text-main);
}

/* Focus States */
.btn:focus-visible,
button:focus-visible,
input:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Custom Scrollbar for Chrome/Safari */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-subtle);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: var(--radius-full);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-subtle);
}

/* Print Styles */
@media print {
  @page {
    size: 80mm auto;
    margin: 0;
  }

  body {
    margin: 0;
    padding: 0;
  }

  * {
    visibility: hidden;
  }

  .print\\:static,
  .print\\:static * {
    visibility: visible;
  }

  .print\\:hidden {
    display: none !important;
  }
}

``` 

## apps\web\src\main.tsx

```tsx


import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css'

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'red' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

console.log("Main.tsx executing...");
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)


``` 

## apps\web\src\components\ui\Button.tsx

```tsx


import React from 'react';
import '../../index.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading,
    className = '',
    ...props
}) => {
    // Base classes provided by CSS, but we can compose them here logic-wise if we moved to Utility-First.
    // Since we are using Vanilla CSS, we will map props to classes.

    const getVariantClass = () => {
        switch (variant) {
            case 'primary': return 'btn-primary';
            case 'secondary': return 'btn-secondary'; // Need to define this in global css
            case 'outline': return 'btn-outline';     // Need to define this
            case 'ghost': return 'btn-ghost';         // Need to define this
            default: return 'btn-primary';
        }
    };

    return (
        <button
            className={`btn ${getVariantClass()} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? '...' : children}
        </button>
    );
};


``` 

## apps\web\src\features\pos\CartPanel.tsx

```tsx


import { useState, useEffect } from 'react';
import { Trash2, User, StickyNote } from 'lucide-react';
import clsx from 'clsx';
import { useCartStore } from '../../store/useCartStore';
import { useSessionStore } from '../../store/useSessionStore';
import { Button } from '../../components/ui/Button';
import { Numpad } from './Numpad';
import { CheckoutModal } from './CheckoutModal';
import { CustomerModal } from './CustomerModal';
import { NoteModal } from './NoteModal';
import { ReceiptModal } from './ReceiptModal';
import type { Order } from '../../types';

export const CartPanel = () => {
    const { items, removeItem: _removeItem, updateItemField, totals, clearCart } = useCartStore();
    const { subtotal, tax, total: finalTotal } = totals();
    const { addSale, checkSession } = useSessionStore();

    // UI State
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isCustomerOpen, setIsCustomerOpen] = useState(false);
    const [isNoteOpen, setIsNoteOpen] = useState(false);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
    const [lastOrder, setLastOrder] = useState<Order | null>(null);

    // Customer State
    const [customer, setCustomer] = useState({ id: 'walk-in', name: 'Walk-in Customer' });

    // Selection & Numpad State
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [activeMode, setActiveMode] = useState<'QTY' | 'DISC' | 'PRICE'>('QTY');

    // Auto-select last added item
    useEffect(() => {
        if (items.length > 0 && !selectedItemId) {
            setSelectedItemId(items[items.length - 1].cartItemId);
        }
    }, [items.length, selectedItemId]);

    const handleNumpadInput = (value: string) => {
        if (!selectedItemId) return;
        const item = items.find(i => i.cartItemId === selectedItemId);
        if (!item) return;

        if (activeMode === 'QTY') {
            const currentQtyStr = Math.abs(item.quantity).toString();
            if (currentQtyStr.length >= 4) return;
            const newQty = parseInt(`${currentQtyStr}${value}`);
            updateItemField(selectedItemId, 'quantity', item.quantity < 0 ? -newQty : newQty);
        } else if (activeMode === 'DISC') {
            const currentDiscStr = (item.discount || 0).toString();
            if (currentDiscStr.length >= 2) return;
            const newDisc = parseInt(`${currentDiscStr}${value}`);
            updateItemField(selectedItemId, 'discount', Math.min(newDisc, 100));
        } else if (activeMode === 'PRICE') {
            const currentPriceStr = item.price.toString().replace('.', '');
            const newPriceRaw = parseInt(`${currentPriceStr}${value}`);
            updateItemField(selectedItemId, 'price', newPriceRaw);
        }
    };

    const handleBackspace = () => {
        if (!selectedItemId) return;
        const item = items.find(i => i.cartItemId === selectedItemId);
        if (!item) return;

        if (activeMode === 'QTY') {
            const currentQtyStr = Math.abs(item.quantity).toString();
            if (currentQtyStr.length <= 1) {
                updateItemField(selectedItemId, 'quantity', 0);
            } else {
                const newQty = parseInt(currentQtyStr.slice(0, -1));
                updateItemField(selectedItemId, 'quantity', item.quantity < 0 ? -newQty : newQty);
            }
        } else if (activeMode === 'DISC') {
            const currentDiscStr = (item.discount || 0).toString();
            if (currentDiscStr.length <= 1) {
                updateItemField(selectedItemId, 'discount', 0);
            } else {
                updateItemField(selectedItemId, 'discount', parseInt(currentDiscStr.slice(0, -1)));
            }
        } else if (activeMode === 'PRICE') {
            const currentPriceStr = item.price.toString();
            if (currentPriceStr.length <= 1) {
                updateItemField(selectedItemId, 'price', 0);
            } else {
                updateItemField(selectedItemId, 'price', parseInt(currentPriceStr.slice(0, -1)));
            }
        }
    };

    const handleClearInput = () => {
        if (!selectedItemId) return;
        if (activeMode === 'QTY') updateItemField(selectedItemId, 'quantity', 0);
    };

    const handleRefundToggle = () => {
        if (!selectedItemId) return;
        const item = items.find(i => i.cartItemId === selectedItemId);
        if (!item) return;
        updateItemField(selectedItemId, 'quantity', item.quantity * -1);
    };

    const getSelectedNote = () => {
        if (!selectedItemId) return '';
        const item = items.find(i => i.cartItemId === selectedItemId);
        return item?.note || '';
    };

    const saveNote = (note: string) => {
        if (selectedItemId) {
            updateItemField(selectedItemId, 'note', note);
        }
    };

    const handlePaymentComplete = () => {
        if (checkSession()) {
            const newOrder: Order = {
                id: crypto.randomUUID(),
                timestamp: Date.now(),
                items: [...items],
                subtotal,
                taxTotal: tax,
                total: finalTotal,
                status: 'synced'
            };

            addSale(finalTotal);
            setLastOrder(newOrder);
            setIsCheckoutOpen(false);
            setIsReceiptOpen(true);
            clearCart();
        } else {
            alert("Please Open a Session first!");
        }
    };

    return (
        <div className="flex flex-col h-full bg-[var(--color-bg-surface)] border-l border-[var(--color-border)] shadow-xl">
            {/* 1. Header & Customer */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-[var(--color-border-subtle)] bg-[var(--color-bg-subtle)]">
                <div
                    onClick={() => setIsCustomerOpen(true)}
                    className="flex items-center gap-2.5 text-[var(--color-primary)] font-semibold cursor-pointer hover:bg-white/60 px-3 py-2 rounded-lg transition-all border border-transparent hover:border-[var(--color-border)] hover:shadow-sm"
                >
                    <User size={18} />
                    <span className="text-sm">{customer.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500 hover:bg-red-50">
                    <Trash2 size={18} />
                </Button>
            </div>

            {/* 2. Scrollable Items List */}
            <div className="flex-1 overflow-y-auto px-3 py-2">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-muted)]">
                        <div className="w-20 h-20 rounded-full bg-[var(--color-bg-subtle)] flex items-center justify-center mb-3">
                            <svg className="w-10 h-10 text-[var(--color-text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <p className="text-sm font-medium">Cart is Empty</p>
                        <p className="text-xs mt-1">Add items to get started</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {items.map((item) => {
                            const isSelected = item.cartItemId === selectedItemId;
                            return (
                                <div
                                    key={item.cartItemId}
                                    onClick={() => setSelectedItemId(item.cartItemId)}
                                    className={clsx(
                                        "p-3 rounded-lg cursor-pointer transition-all border",
                                        isSelected
                                            ? "bg-[var(--color-primary-subtle)] border-[var(--color-primary)] shadow-sm"
                                            : "bg-white border-[var(--color-border-subtle)] hover:border-[var(--color-border)] hover:shadow-sm",
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-semibold text-sm w-2/3 truncate text-[var(--color-text-main)]">{item.name}</span>
                                        <span className="font-bold text-[var(--color-primary)]">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-[var(--color-text-muted)]">₹{item.price} × {Math.abs(item.quantity)}</span>
                                        <div className="flex gap-2 items-center">
                                            {item.quantity < 0 && (
                                                <span className="text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded">REFUND</span>
                                            )}
                                            {item.discount && item.discount > 0 ? (
                                                <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded font-medium border border-green-100">
                                                    -{item.discount}%
                                                </span>
                                            ) : null}
                                            {item.note && (
                                                <span
                                                    className="text-[var(--color-primary)] bg-blue-50 px-2 py-0.5 rounded border border-blue-100 flex items-center gap-1"
                                                    title={item.note}
                                                >
                                                    <StickyNote size={10} /> Note
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* 3. Totals Summary */}
            <div className="px-4 py-3 border-t border-[var(--color-border-subtle)] bg-gradient-to-br from-[var(--color-bg-subtle)] to-white">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-[var(--color-text-muted)]">Total</span>
                    <span className="text-3xl font-extrabold text-[var(--color-primary)]">₹{finalTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
                    <span>Tax: ₹{tax.toFixed(2)}</span>
                    <span>Items: {items.length}</span>
                </div>
            </div>

            {/* 4. Numpad & Actions */}
            <div className="h-[320px] bg-[var(--color-bg-subtle)] border-t border-[var(--color-border)] flex flex-col">
                <div className="flex-1 flex">
                    <div className="flex-1">
                        <Numpad
                            onInput={handleNumpadInput}
                            onDelete={handleBackspace}
                            onClear={handleClearInput}
                            onModeChange={setActiveMode}
                            activeMode={activeMode}
                        />
                    </div>
                    <div className="w-1/4 flex flex-col border-l border-[var(--color-border)]">
                        <button
                            className="flex-1 bg-white border-b border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-main)] hover:bg-[var(--color-primary-subtle)] hover:text-[var(--color-primary)] transition-colors"
                            onClick={() => setIsNoteOpen(true)}
                            title="Add Note"
                        >
                            Note
                        </button>
                        <button
                            className="flex-1 bg-white border-b border-[var(--color-border)] text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                            onClick={handleRefundToggle}
                            title="Refund / Return"
                        >
                            Refund
                        </button>
                        <button
                            className="flex-[2] bg-gradient-to-br from-[var(--color-success)] to-green-600 text-white font-bold text-lg hover:brightness-110 active:scale-[0.98] transition-all flex flex-col items-center justify-center gap-1 shadow-md"
                            onClick={() => setIsCheckoutOpen(true)}
                        >
                            <span>Pay</span>
                            <span className="text-xs font-normal opacity-90">Enter ⏎</span>
                        </button>
                    </div>
                </div>
            </div>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                onSuccess={handlePaymentComplete}
            />

            <CustomerModal
                isOpen={isCustomerOpen}
                onClose={() => setIsCustomerOpen(false)}
                onSelect={(c) => setCustomer(c)}
                activeCustomerId={customer.id}
            />

            <NoteModal
                isOpen={isNoteOpen}
                onClose={() => setIsNoteOpen(false)}
                onSave={saveNote}
                initialNote={getSelectedNote()}
            />

            <ReceiptModal
                isOpen={isReceiptOpen}
                onClose={() => setIsReceiptOpen(false)}
                order={lastOrder}
            />
        </div>
    );
};


``` 

## apps\web\src\features\pos\CategoryTabs.tsx

```tsx


import React from 'react';

interface CategoryTabsProps {
    categories: string[];
    activeCategory: string;
    onSelect: (category: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategory, onSelect }) => {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide px-1">
            {categories.map(cat => (
                <button
                    key={cat}
                    onClick={() => onSelect(cat)}
                    className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-all shadow-sm ${activeCategory === cat
                            ? 'bg-[var(--color-primary)] text-white shadow-md transform scale-105'
                            : 'bg-white text-[var(--color-text-muted)] hover:bg-gray-100 border border-transparent'
                        }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};


``` 

## apps\web\src\features\pos\CheckoutModal.tsx

```tsx


import React, { useState } from 'react';
import { X, CreditCard, Banknote, QrCode } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { Button } from '../../components/ui/Button';
import { orderService } from '../../services/orderService';
import type { PaymentMethod } from '../../types/payment';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const { totals } = useCartStore();
    const { total } = totals();
    const [method, setMethod] = useState<PaymentMethod | null>(null);
    const [processing, setProcessing] = useState(false);

    if (!isOpen) return null;

    const handlePayment = async () => {
        if (!method) return;
        setProcessing(true);
        try {
            await orderService.createOrder({
                method,
                amount: total
            });
            // alert('Order Placed Successfully!'); // Removed alert for smoother flow
            onClose();
            if (onSuccess) onSuccess();
        } catch (e) {
            console.error(e);
            alert('Failed to place order');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-[var(--color-bg-base)] w-full max-w-md rounded-lg shadow-2xl overflow-hidden glass border border-[var(--color-border)]">
                <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-bg-surface)]">
                    <h2 className="text-xl font-bold">Checkout</h2>
                    <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6">
                    <div className="text-center mb-8">
                        <p className="text-[var(--color-text-muted)] mb-1">Total Amount</p>
                        <h1 className="text-4xl font-extrabold text-[var(--color-primary)]">
                            ₹{total.toFixed(2)}
                        </h1>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {[
                            { id: 'CASH', label: 'Cash', icon: Banknote },
                            { id: 'UPI', label: 'UPI', icon: QrCode },
                            { id: 'CARD', label: 'Card', icon: CreditCard },
                        ].map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMethod(m.id as PaymentMethod)}
                                className={`flex flex-col items-center justify-center p-4 rounded-md border-2 transition-all ${method === m.id
                                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                                    : 'border-transparent bg-[var(--color-bg-surface)] hover:bg-gray-100'
                                    }`}
                            >
                                <m.icon size={28} className="mb-2" />
                                <span className="font-semibold text-sm">{m.label}</span>
                            </button>
                        ))}
                    </div>

                    <Button
                        className="w-full text-lg py-6"
                        disabled={!method || processing}
                        onClick={handlePayment}
                    >
                        {processing ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
                    </Button>
                </div>
            </div>
        </div>
    );
};


``` 

## apps\web\src\features\pos\CustomerModal.tsx

```tsx


import React, { useState } from 'react';
import { X, User, Search, Check } from 'lucide-react';

interface Customer {
    id: string;
    name: string;
    phone: string;
    email: string;
}

// Mock Customers
const MOCK_CUSTOMERS: Customer[] = [
    { id: 'walk-in', name: 'Walk-in Customer', phone: '', email: '' },
    { id: 'c1', name: 'Rahul Dravid', phone: '9876543210', email: 'rahul@example.com' },
    { id: 'c2', name: 'Priya Sharma', phone: '9876500000', email: 'priya@example.com' },
    { id: 'c3', name: 'Amit Patel', phone: '8888888888', email: 'amit@example.com' },
    { id: 'c4', name: 'Sneha Gupta', phone: '7777777777', email: 'sneha@example.com' },
];

interface CustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (customer: Customer) => void;
    activeCustomerId: string;
}

export const CustomerModal: React.FC<CustomerModalProps> = ({ isOpen, onClose, onSelect, activeCustomerId }) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (!isOpen) return null;

    const filtered = MOCK_CUSTOMERS.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-[var(--color-bg-base)] w-full max-w-lg rounded-lg shadow-2xl overflow-hidden glass border border-[var(--color-border)] flex flex-col max-h-[80vh]">
                <div className="p-4 border-b border-[var(--color-border)] flex justify-between items-center bg-[var(--color-bg-surface)]">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <User size={20} /> Select Customer
                    </h2>
                    <button onClick={onClose} className="text-[var(--color-text-muted)] hover:text-[var(--color-text-base)]">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-4 border-b border-[var(--color-border)]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Name or Phone..."
                            className="w-full pl-10 pr-4 py-3 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-base)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                <div className="overflow-y-auto flex-1 p-2">
                    {filtered.map(c => (
                        <div
                            key={c.id}
                            onClick={() => { onSelect(c); onClose(); }}
                            className={`flex items-center justify-between p-4 rounded-md cursor-pointer mb-1 transition-colors ${activeCustomerId === c.id
                                    ? 'bg-[var(--color-primary)]/10 border border-[var(--color-primary)]'
                                    : 'hover:bg-[var(--color-bg-subtle)] border border-transparent'
                                }`}
                        >
                            <div>
                                <h3 className="font-bold text-[var(--color-text-main)]">{c.name}</h3>
                                {c.phone && <p className="text-sm text-[var(--color-text-muted)]">{c.phone}</p>}
                            </div>
                            {activeCustomerId === c.id && <Check size={20} className="text-[var(--color-primary)]" />}
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="p-8 text-center text-[var(--color-text-muted)]">
                            No customers found.
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg-surface)]">
                    <button className="w-full py-3 rounded-md bg-[var(--color-bg-subtle)] hover:bg-[var(--color-bg-base)] text-[var(--color-primary)] font-semibold">
                        + Create New Customer
                    </button>
                </div>
            </div>
        </div>
    );
};


``` 

## apps\web\src\features\pos\NoteModal.tsx

```tsx


import React, { useState } from 'react';
import { X, StickyNote } from 'lucide-react';
import { Button } from '../../components/ui/Button';

interface NoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (note: string) => void;
    initialNote?: string;
}

export const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose, onSave, initialNote = '' }) => {
    const [note, setNote] = useState(initialNote);

    // Reset note when opening logic might be needed if modal is reused without unmounting,
    // but for now simpler is fine.
    React.useEffect(() => {
        setNote(initialNote);
    }, [initialNote, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-sm rounded-lg shadow-xl overflow-hidden animate-scale-in">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold flex items-center gap-2 text-gray-800">
                        <StickyNote size={18} /> Item Note
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4">
                    <textarea
                        className="w-full h-32 p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none text-sm"
                        placeholder="Add kitchen instructions (e.g., Less spicy, No sugar)..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="p-4 flex gap-3 border-t border-gray-100">
                    <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
                    <Button
                        className="flex-1"
                        onClick={() => { onSave(note); onClose(); }}
                    >
                        Save Note
                    </Button>
                </div>
            </div>
        </div>
    );
};


``` 

## apps\web\src\features\pos\Numpad.tsx

```tsx


import React from 'react';
import { Delete } from 'lucide-react';

interface NumpadProps {
    onInput: (value: string) => void;
    onDelete: () => void;
    onClear: () => void;
    onModeChange: (mode: 'QTY' | 'DISC' | 'PRICE') => void;
    activeMode: 'QTY' | 'DISC' | 'PRICE';
}

export const Numpad: React.FC<NumpadProps> = ({ onInput, onDelete, onClear: _onClear, onModeChange, activeMode }) => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Mode Toggles */}
            <div className="flex gap-1 p-2 bg-[var(--color-bg-subtle)]">
                {['QTY', 'DISC', 'PRICE'].map((mode) => (
                    <button
                        key={mode}
                        onClick={() => onModeChange(mode as any)}
                        className={`flex-1 py-2.5 text-xs font-bold rounded-md transition-all ${activeMode === mode
                            ? 'bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white shadow-md'
                            : 'bg-white text-[var(--color-text-muted)] hover:bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)]'
                            }`}
                    >
                        {mode === 'DISC' ? '% Disc' : mode}
                    </button>
                ))}
            </div>

            {/* Keys Grid */}
            <div className="grid grid-cols-3 gap-1 p-2 flex-1">
                {keys.map((key) => (
                    <button
                        key={key}
                        onClick={() => onInput(key)}
                        className="text-xl font-semibold bg-[var(--color-bg-surface)] hover:bg-[var(--color-primary-subtle)] hover:text-[var(--color-primary)] active:scale-95 transition-all rounded-md border border-[var(--color-border-subtle)] shadow-sm"
                    >
                        {key}
                    </button>
                ))}

                {/* Backspace Key */}
                <button
                    onClick={onDelete}
                    className="flex items-center justify-center bg-red-50 hover:bg-red-100 active:scale-95 text-red-600 rounded-md border border-red-100 shadow-sm transition-all"
                >
                    <Delete size={20} />
                </button>
            </div>
        </div>
    );
};


``` 

## apps\web\src\features\pos\ProductGrid.tsx

```tsx


import React, { useEffect, useState } from 'react';
import { db } from '../../lib/db';
import type { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';

export const ProductGrid: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [category, setCategory] = useState<string>('All');
    const addItem = useCartStore(state => state.addItem);

    useEffect(() => {
        const loadProducts = async () => {
            const localData = await db.getProducts();
            setProducts(localData);
        };
        loadProducts();
    }, []);

    const categories = ['All', ...new Set(products.map(p => p.category))];
    const filteredProducts = category === 'All'
        ? products
        : products.filter(p => p.category === category);

    return (
        <div className="product-grid-container">
            {/* Header with Store Name & Category Tabs */}
            <div className="grid-header">
                <h1 className="store-title">India Retail Store</h1>

                {/* Category Pills */}
                <div className="category-pills">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`category-pill ${category === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="products-grid">
                {filteredProducts.length === 0 ? (
                    <div className="empty-products">
                        <div className="empty-icon">📦</div>
                        <p>No products available</p>
                        <span className="text-xs text-[var(--color-text-muted)]">Products will appear here once loaded</span>
                    </div>
                ) : (
                    filteredProducts.map((product, idx) => (
                        <div
                            key={product.id}
                            onClick={() => addItem(product)}
                            className="product-card-modern"
                            style={{ animationDelay: `${idx * 30}ms` }}
                        >
                            {/* Product Image */}
                            <div className="product-image">
                                {product.imageUrl ? (
                                    <img src={product.imageUrl} alt={product.name} />
                                ) : (
                                    <div className="no-image">
                                        <span className="text-4xl">🛍️</span>
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-category">{product.category}</p>
                                <div className="product-price">₹{Number(product.price).toFixed(0)}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <style>{`
                .product-grid-container {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    background: #f8f9fa;
                }

                .grid-header {
                    padding: 2rem 2rem 1.5rem 2rem;
                    background: white;
                    border-bottom: 1px solid #e9ecef;
                }

                .store-title {
                    font-size: 2rem;
                    font-weight: 800;
                    color: #111;
                    margin-bottom: 1.25rem;
                    letter-spacing: -0.03em;
                }

                .category-pills {
                    display: flex;
                    gap: 0.75rem;
                    overflow-x: auto;
                    padding-bottom: 0.5rem;
                }

                .category-pills::-webkit-scrollbar {
                    height: 0;
                }

                .category-pill {
                    padding: 0.625rem 1.5rem;
                    border-radius: 999px;
                    font-size: 0.9375rem;
                    font-weight: 700;
                    white-space: nowrap;
                    cursor: pointer;
                    border: 2px solid #dee2e6;
                    background: white;
                    color: #212529;
                    transition: all 0.2s;
                }

                .category-pill:hover {
                    border-color: var(--color-primary);
                    color: var(--color-primary);
                    transform: translateY(-2px);
                }

                .category-pill.active {
                    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
                    color: white;
                    border-color: transparent;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .products-grid {
                    flex: 1;
                    padding: 1.5rem;
                    overflow-y: auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 1.25rem;
                    align-content: start;
                }

                .product-card-modern {
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    cursor: pointer;
                    border: 1px solid #e9ecef;
                    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
                    animation: fadeInUp 0.4s ease-out forwards;
                    opacity: 0;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .product-card-modern:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
                    border-color: var(--color-primary);
                }

                .product-image {
                    height: 160px;
                    overflow: hidden;
                    background: #f8f9fa;
                    position: relative;
                }

                .product-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s;
                }

                .product-card-modern:hover .product-image img {
                    transform: scale(1.1);
                }

                .no-image {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                }

                .product-info {
                    padding: 1.25rem;
                }

                .product-name {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #111;
                    margin-bottom: 0.375rem;
                    line-height: 1.4;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .product-category {
                    font-size: 0.8125rem;
                    font-weight: 500;
                    color: #6c757d;
                    margin-bottom: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.03em;
                }

                .product-price {
                    font-size: 1.375rem;
                    font-weight: 800;
                    color: var(--color-primary);
                    letter-spacing: -0.02em;
                }

                .empty-products {
                    grid-column: 1 / -1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 4rem 2rem;
                    text-align: center;
                    color: #495057;
                }

                .empty-icon {
                    font-size: 5rem;
                    margin-bottom: 1.5rem;
                    opacity: 0.3;
                }

                .empty-products p {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }

                .empty-products span {
                    font-size: 0.875rem;
                }
            `}</style>
        </div>
    );
};


``` 

## apps\web\src\features\pos\ReceiptModal.tsx

```tsx


import React from 'react';
import { X, Printer, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import type { Order } from '../../types';

interface ReceiptModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, order }) => {
    if (!isOpen || !order) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in print:static print:bg-white print:p-0">
            <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-scale-in print:shadow-none print:w-full print:max-w-none">

                {/* Screen Header (Hidden in Print) */}
                <div className="p-4 bg-green-600 text-white flex justify-between items-center print:hidden">
                    <h3 className="font-bold flex items-center gap-2">
                        <CheckCircle size={20} /> Order Success
                    </h3>
                    <button onClick={onClose} className="text-white/80 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Receipt Content (Visible in Print) */}
                <div className="p-8 print:p-0 font-mono text-sm">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-bold uppercase tracking-wider mb-1">India Retail Store</h2>
                        <p className="text-gray-500">123, Market Road, Mumbai</p>
                        <p className="text-gray-500">GST: 27ABCDE1234F1Z5</p>
                        <p className="text-gray-500 mt-2">Ph: +91 98765 43210</p>
                    </div>

                    <div className="border-b-2 border-dashed border-gray-300 my-4"></div>

                    <div className="flex justify-between mb-2">
                        <span>Date: {new Date(order.timestamp).toLocaleString()}</span>
                        <span>#{order.id.slice(-6).toUpperCase()}</span>
                    </div>

                    <table className="w-full text-left mb-4">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="py-2">Item</th>
                                <th className="py-2 text-right">Qty</th>
                                <th className="py-2 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, idx) => (
                                <tr key={idx} className="border-b border-gray-100">
                                    <td className="py-2">
                                        <div>{item.name}</div>
                                        {item.discount && item.discount > 0 && (
                                            <div className="text-xs text-gray-500">Disc: {item.discount}%</div>
                                        )}
                                        {item.quantity < 0 && (
                                            <div className="text-xs text-red-500 font-bold">REFUND</div>
                                        )}
                                    </td>
                                    <td className="py-2 text-right">{item.quantity}</td>
                                    <td className="py-2 text-right">
                                        ₹{((item.price * item.quantity) - (item.price * item.quantity * (item.discount || 0) / 100)).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="border-b-2 border-dashed border-gray-300 my-4"></div>

                    <div className="space-y-1">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax</span>
                            <span>₹{order.taxTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold mt-2">
                            <span>Total</span>
                            <span>₹{order.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="border-b-2 border-dashed border-gray-300 my-6"></div>

                    <div className="text-center text-gray-500 text-xs">
                        <p>Thank you for shopping with us!</p>
                        <p className="mt-1">Visit Again</p>
                    </div>
                </div>

                {/* Footer Actions (Hidden in Print) */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-3 print:hidden">
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                        New Order
                    </Button>
                    <Button className="flex-1 gap-2" onClick={handlePrint}>
                        <Printer size={18} /> Print Check
                    </Button>
                </div>
            </div>
        </div>
    );
};


``` 

## apps\web\src\features\pos\SessionModal.tsx

```tsx


import { useState } from 'react';
import { useSessionStore } from '../../store/useSessionStore';
import { Button } from '../../components/ui/Button';
import { ShieldAlert, LogOut, Banknote } from 'lucide-react';

export const SessionModal = () => {
    const { currentSession, openSession } = useSessionStore();
    const [amount, setAmount] = useState('');

    // If no session is open, force "Open Session" screen (acting as a blocker)
    if (!currentSession || currentSession.status === 'CLOSED') {
        const handleOpen = () => {
            const val = parseFloat(amount || '0');
            openSession(val);
        };

        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/90 backdrop-blur-md">
                <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center animate-scale-in">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                        <Banknote size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Open POS Session</h2>
                    <p className="text-gray-600 mb-6">Enter opening cash float to start selling.</p>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Opening Cash</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400">₹</span>
                            <input
                                type="number"
                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg font-bold"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                autoFocus
                            />
                        </div>
                    </div>

                    <Button className="w-full py-6 text-lg" onClick={handleOpen}>
                        Start Session
                    </Button>
                </div>
            </div>
        );
    }

    // Checking if we want to render the "Close Session" modal (triggered often by a button elsewhere, 
    // but for now let's expose a small trigger or rely on parent passing a prop. 
    // Actually, to make it 'self-contained' and annoying (as per Cash Control requirements), 
    // we usually put the triggering button in the UI. 
    // For this implementation, I'll export a separate `SessionControl` component or similar.
    // BUT, the prompt asked for "Session & Cash Control". 
    // Let's make this component JUST the Blocker for Opening. 
    // And I will add a `CloseSessionButton` separately or handle it here if passed a prop?
    // Let's stick to the BLOCKED view handle here.

    return null;
};

// Separate component for the Close Button/Modal to be placed in Settings or Header
export const SessionControlWidget = () => {
    const { currentSession, closeSession } = useSessionStore();
    const [isClosing, setIsClosing] = useState(false);

    if (!currentSession) return null;

    const handleClose = () => {
        closeSession(0); // In real app, we'd input counted cash.
        setIsClosing(false);
    };

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                className="text-gray-600 border-gray-300"
                onClick={() => setIsClosing(true)}
            >
                <LogOut size={16} className="mr-2" />
                Close Session
            </Button>

            {isClosing && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-lg w-full max-w-sm shadow-xl animate-scale-in">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <ShieldAlert className="text-orange-500" /> Close Session?
                        </h3>

                        <div className="bg-gray-50 p-4 rounded mb-4 text-sm space-y-2">
                            <div className="flex justify-between">
                                <span>Opening Cash</span>
                                <span className="font-mono">₹{currentSession.openingBalance.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold">
                                <span>Total Sales</span>
                                <span className="font-mono text-green-600">+ ₹{currentSession.totalSales.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-gray-200 pt-2 flex justify-between font-extrabold text-base">
                                <span>Expected Cash</span>
                                <span>₹{(currentSession.openingBalance + currentSession.totalSales).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setIsClosing(false)}>Cancel</Button>
                            <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={handleClose}>
                                Confirm Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


``` 

## apps\web\src\features\pos\Views.tsx

```tsx


import React from 'react';
import { db } from '../../lib/db';
import type { Order } from '../../types';
import { SessionControlWidget } from './SessionModal';

export const OrdersView = () => {
    const [orders, setOrders] = React.useState<Order[]>([]);

    React.useEffect(() => {
        db.getAllOrders().then(setOrders);
    }, []);

    if (orders.length === 0) return <div className="p-8 text-center text-[var(--color-text-muted)]">No orders placed yet.</div>;

    return (
        <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            {orders.slice().reverse().map(order => (
                <div key={order.id} className="p-4 bg-[var(--color-bg-surface)] rounded-md border border-[var(--color-border)] flex justify-between items-center glass">
                    <div>
                        <p className="font-bold">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-[var(--color-text-muted)]">{new Date(order.timestamp).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-[var(--color-primary)]">₹{Number(order.total).toFixed(2)}</p>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">{order.status}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const SettingsView = () => {
    return (
        <div className="p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>

            <div className="space-y-6">
                <div className="p-4 border border-[var(--color-border)] rounded-md">
                    <h3 className="font-semibold mb-2">Sync Status</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">Backend URL: http://localhost:3000</p>
                    <p className="text-sm text-red-500 mt-2">Status: Offline (DB Connection Failed)</p>
                </div>

                <div className="p-4 border border-[var(--color-border)] rounded-md">
                    <h3 className="font-semibold mb-2">Device Info</h3>
                    <p className="text-sm text-[var(--color-text-muted)]">Terminal ID: T-800</p>
                    <p className="text-sm text-[var(--color-text-muted)]">Version: 1.0.0 (MVP)</p>
                </div>
                <div className="p-4 border border-[var(--color-border)] rounded-md flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold mb-1">Session Control</h3>
                        <p className="text-sm text-[var(--color-text-muted)]">Manage opening/closing of daily register.</p>
                    </div>
                    <SessionControlWidget />
                </div>
            </div>
        </div>
    );
};


``` 

## apps\web\src\layout\POSLayout.tsx

```tsx


import React from 'react';
import { Home, Receipt, Settings } from 'lucide-react';

interface POSLayoutProps {
  children: React.ReactNode;
  cartComponent?: React.ReactNode;
  activeTab?: 'home' | 'orders' | 'settings';
  onTabChange?: (tab: 'home' | 'orders' | 'settings') => void;
}

export const POSLayout: React.FC<POSLayoutProps> = ({
  children,
  cartComponent,
  activeTab = 'home',
  onTabChange
}) => {
  return (
    <div className="pos-shell">
      {/* Left Sidebar - Minimal Navigation */}
      <aside className="pos-sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">💰</div>
        </div>
        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => onTabChange?.('home')}
            title="Home"
          >
            <Home size={22} />
          </button>
          <button
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => onTabChange?.('orders')}
            title="Orders"
          >
            <Receipt size={22} />
          </button>
          <button
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => onTabChange?.('settings')}
            title="Settings"
          >
            <Settings size={22} />
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="pos-main">
        {children}
      </main>

      {/* Right Cart Panel */}
      {cartComponent}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .pos-shell {
          display: grid;
          grid-template-columns: 72px 1fr 420px;
          height: 100vh;
          width: 100vw;
          background: #f8f9fa;
          overflow: hidden;
        }

        .pos-sidebar {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 0;
          background: white;
          border-right: 1px solid #e9ecef;
        }

        .sidebar-logo {
          margin-bottom: 2rem;
        }

        .logo-icon {
          font-size: 2.5rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
          padding: 0 0.75rem;
        }

        .nav-item {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          cursor: pointer;
          color: #495057;
          background: transparent;
          border: none;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-item:hover {
          background: #f1f3f5;
          color: var(--color-primary);
        }

        .nav-item.active {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .pos-main {
          display: flex;
          flex-direction: column;
          background: white;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};


``` 

## apps\web\src\lib\db.ts

```typescript


import { openDB, type DBSchema } from 'idb';
import type { Product, Order } from '../types';

interface POSDB extends DBSchema {
    products: {
        key: string;
        value: Product;
        indexes: { 'by-category': string };
    };
    orders: {
        key: string;
        value: Order;
        indexes: { 'by-status': string, 'by-timestamp': number };
    };
    syncQueue: {
        key: string;
        value: { id: string; payload: any; type: 'ORDER' | 'UPDATE'; timestamp: number };
    };
}

const dbPromise = openDB<POSDB>('pos-db', 1, {
    upgrade(db) {
        // Products Store
        const productStore = db.createObjectStore('products', { keyPath: 'id' });
        productStore.createIndex('by-category', 'category');

        // Orders Store
        const orderStore = db.createObjectStore('orders', { keyPath: 'id' });
        orderStore.createIndex('by-status', 'status');
        orderStore.createIndex('by-timestamp', 'timestamp');

        // Sync Queue
        db.createObjectStore('syncQueue', { keyPath: 'id' });
    },
});

export const db = {
    getProducts: async () => (await dbPromise).getAll('products'),
    addProduct: async (product: Product) => (await dbPromise).put('products', product),

    saveOrder: async (order: Order) => {
        const d = await dbPromise;
        await d.put('orders', order);
        // Add to sync queue if offline (this logic usually in service layer, but safe to add here for now)
        if (!navigator.onLine) {
            await d.put('syncQueue', {
                id: crypto.randomUUID(),
                payload: order,
                type: 'ORDER',
                timestamp: Date.now()
            });
        }
    },

    getAllOrders: async () => (await dbPromise).getAll('orders'),

    seedStart: async () => {
        const count = await (await dbPromise).count('products');
        if (count === 0) {
            // Seed dummy data
            const dummy: Product[] = [
                {
                    id: '1', name: 'Masala Chai', price: 20, category: 'Beverages', sku: 'BV001', taxRate: 0.05,
                    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400'
                },
                {
                    id: '2', name: 'Samosa', price: 15, category: 'Snacks', sku: 'SN001', taxRate: 0.05,
                    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=400'
                },
                {
                    id: '3', name: 'Veg Sandwich', price: 80, category: 'Food', sku: 'fd001', taxRate: 0.05,
                    imageUrl: 'https://images.unsplash.com/photo-1554433607-66b5efe9d304?auto=format&fit=crop&q=80&w=400'
                },
                {
                    id: '4', name: 'Cold Coffee', price: 120, category: 'Beverages', sku: 'BV002', taxRate: 0.18,
                    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=400'
                },
                {
                    id: '5', name: 'Paneer Wrap', price: 150, category: 'Food', sku: 'FD002', taxRate: 0.05,
                    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400'
                },
                {
                    id: '6', name: 'Lassi', price: 60, category: 'Beverages', sku: 'BV003', taxRate: 0.05,
                    imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=400'
                },
            ];
            const d = await dbPromise;
            const tx = d.transaction('products', 'readwrite');
            await Promise.all(dummy.map(p => tx.store.put(p)));
            await tx.done;
            console.log('Database seeded!');
        }
    }
};


``` 

## apps\web\src\services\api.ts

```typescript


const API_URL = 'http://localhost:3000';

// In a real app, this would handle Auth headers, etc.
export const api = {
    get: async (endpoint: string) => {
        const res = await fetch(`${API_URL}${endpoint}`);
        if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
        return res.json();
    },

    post: async (endpoint: string, body: any) => {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
        return res.json();
    }
};


``` 

## apps\web\src\services\orderService.ts

```typescript


import { db } from '../lib/db';
import { useCartStore } from '../store/useCartStore';
import type { Order } from '../types';
import type { PaymentDetails } from '../types/payment';

export const orderService = {
    createOrder: async (_payment: PaymentDetails) => {
        const store = useCartStore.getState();
        const { items, totals } = store;
        const { subtotal, tax, total } = totals();

        if (items.length === 0) throw new Error("Cart is empty");

        const order: Order = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            items: [...items],
            subtotal,
            taxTotal: tax,
            total,
            status: 'pending', // Pending sync to backend
            // In a real app we'd store payment info too
        };

        // 1. Save to Offline DB
        await db.saveOrder(order);

        // 2. Clear Cart
        store.clearCart();

        // 3. Trigger Sync (Background)
        // syncService.pushOrders(); 

        return order;
    }
};


``` 

## apps\web\src\services\syncService.ts

```typescript


import { api } from './api';
import { db } from '../lib/db';
import type { Product } from '../types';

export const syncService = {
    // Pull products from Backend -> IndexedDB
    pullProducts: async () => {
        try {
            console.log('Syncing products...');
            const products = await api.get('/products') as Product[];

            // Upsert into IDB
            // In a real optimized app, we'd use a transaction or bulk put.
            // idb 'put' is efficient enough for small datasets.
            for (const p of products) {
                await db.addProduct(p);
            }

            console.log(`Synced ${products.length} products to offline DB.`);
            return products.length;
        } catch (error) {
            console.error('Sync failed:', error);
            throw error;
        }
    },

    // Push offline orders Backend -> Sync
    pushOrders: async () => {
        // TODO: Implement order push
    }
};


``` 

## apps\web\src\store\useCartStore.ts

```typescript


import { create } from 'zustand';
import type { Product, CartItem } from '../types';

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (cartItemId: string) => void;
    updateItemField: (cartItemId: string, field: 'quantity' | 'discount' | 'price' | 'note', value: number | string) => void;
    clearCart: () => void;
    totals: () => { subtotal: number; tax: number; total: number };
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    addItem: (product) => set((state) => {
        const existing = state.items.find(i => i.id === product.id);
        if (existing) {
            return {
                items: state.items.map(i =>
                    i.id === product.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
            };
        }
        return {
            // Default discount 0
            items: [...state.items, { ...product, cartItemId: crypto.randomUUID(), quantity: 1, discount: 0 }]
        };
    }),
    removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.cartItemId !== id)
    })),
    updateQuantity: (id: string, delta: number) => set((state) => ({
        items: state.items.map(i => {
            if (i.cartItemId === id) {
                const newQty = Math.max(0, i.quantity + delta);
                return { ...i, quantity: newQty };
            }
            return i;
        }).filter(i => i.quantity > 0)
    })),
    updateItemField: (id, field, value) => set((state) => ({
        items: state.items.map(i => {
            if (i.cartItemId === id) {
                // If quantity becomes 0, we can filter it out later or keep it as 0? 
                // Let's filter out if QTY is explicitly 0, but for field update let's keeps it simple
                const updated = { ...i, [field]: value };
                if (field === 'quantity' && typeof value === 'number' && value <= 0) return null; // Logic to remove
                return updated;
            }
            return i;
        }).filter(Boolean) as CartItem[]
    })),
    clearCart: () => set({ items: [] }),
    totals: () => {
        const { items } = get();
        // Subtotal = sum of (Price - Discount) * Qty
        const subtotal = items.reduce((acc, item) => {
            const price = item.price;
            const discountAmount = (price * (item.discount || 0) / 100);
            const finalPrice = price - discountAmount;
            return acc + (finalPrice * item.quantity);
        }, 0);

        const tax = items.reduce((acc, item) => {
            const price = item.price;
            const discountAmount = (price * (item.discount || 0) / 100);
            const taxableAmount = (price - discountAmount) * item.quantity;
            return acc + (taxableAmount * item.taxRate);
        }, 0);

        return {
            subtotal,
            tax,
            total: subtotal + tax
        };
    }
}));


``` 

## apps\web\src\store\useSessionStore.ts

```typescript


import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Session {
    id: string;
    openedAt: number;
    closedAt?: number;
    openingBalance: number;
    closingBalance?: number;
    totalSales: number;
    status: 'OPEN' | 'CLOSED';
}

interface SessionState {
    currentSession: Session | null;
    openSession: (openingBalance: number) => void;
    closeSession: (closingBalance: number) => void;
    addSale: (amount: number) => void;
    checkSession: () => boolean; // Returns true if open
}

export const useSessionStore = create<SessionState>()(
    persist(
        (set, get) => ({
            currentSession: null,
            openSession: (openingBalance) => set({
                currentSession: {
                    id: crypto.randomUUID(),
                    openedAt: Date.now(),
                    openingBalance,
                    totalSales: 0,
                    status: 'OPEN'
                }
            }),
            closeSession: (_closingBalance) => set((state) => {
                if (!state.currentSession) return {};
                return {
                    currentSession: null, // Logic might vary: keep history? For now, reset current.
                    // In real app, we'd append to a history array or sync to DB.
                };
            }),
            addSale: (amount) => set((state) => {
                if (!state.currentSession) return {};
                return {
                    currentSession: {
                        ...state.currentSession,
                        totalSales: state.currentSession.totalSales + amount
                    }
                };
            }),
            checkSession: () => {
                const { currentSession } = get();
                return currentSession?.status === 'OPEN';
            }
        }),
        {
            name: 'pos-session-storage',
        }
    )
);


``` 

## apps\web\src\types\index.ts

```typescript


export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    sku: string;
    taxRate: number; // e.g. 0.05, 0.18
    imageUrl?: string;
}

export interface CartItem extends Product {
    cartItemId: string;
    quantity: number;
    discount?: number; // 0-100%
    note?: string;
}

export interface Order {
    id: string;
    timestamp: number;
    items: CartItem[];
    subtotal: number;
    taxTotal: number;
    total: number;
    status: 'pending' | 'synced';
}


``` 

## apps\web\src\types\payment.ts

```typescript


export type PaymentMethod = 'CASH' | 'UPI' | 'CARD';

export interface PaymentDetails {
    method: PaymentMethod;
    amount: number;
    transactionId?: string; // For UPI/Card
}


``` 

