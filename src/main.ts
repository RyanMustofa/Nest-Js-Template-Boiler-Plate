import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';
import { resolve } from 'path';
import { registerHelper } from './helpers/hbs.helpers';
import * as session from 'express-session';
import * as passport from 'passport';
import flash = require('connect-flash');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(resolve('./public'));
  app.setBaseViewsDir(resolve('./src/views'));
  hbs.registerPartials(resolve('./src/views/layout'));
  registerHelper(hbs);

  app.setViewEngine('hbs');

  app.use(
    session({
      secret: 'nest app',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  await app.listen(3000);
}
bootstrap();
