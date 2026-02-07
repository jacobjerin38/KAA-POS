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
