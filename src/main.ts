import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';
import { resolve } from 'path';
import { registerHelper } from './helpers/hbs.helpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(resolve('./public'));
  app.setBaseViewsDir(resolve('./src/views'));
  hbs.registerPartials(resolve('./src/views/layout'));
  registerHelper(hbs);

  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
