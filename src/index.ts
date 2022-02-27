import 'dotenv/config';
import 'module-alias/register';

import App from './app';

import validateEnv from '@/utils/validateEnv';
import MessageController from '@/resources/message/message.controller';

validateEnv();

const app = new App([new MessageController()], Number(process.env.PORT));

app.listen();
