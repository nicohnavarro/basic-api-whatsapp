import { Router, Request, Response, NextFunction } from 'express';

import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/message/message.validation';
import MessageService from '@/resources/message/message.svc';
import { client as whatsappService, getQr } from '@/utils/initWhatsapp';
import Message from './message.interface';

type MessageType = {
  phone: string;
  text: string;
};

class MessageController implements Controller {
  public path = '/message';
  public router = Router();

  private MessageService = new MessageService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.initializeWA);

    this.router.post(
      `${this.path}/send`,
      validationMiddleware(validate.create),
      this.create
    );

    this.router.post(`${this.path}/massive`, this.sendMassive);
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { phone, text } = req.body;
      const number = '+5491123870018';
      const chatId = phone.substring(1) + '@c.us';
      whatsappService.sendMessage(chatId, text);
      const message = await this.MessageService.create(phone, text);
      res.status(201).json({ message });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private sendMassive = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { list } = req.body;
      let listSended = Array<Message>();
      await list.forEach(async (message: MessageType) => {
        const chatId = message.phone.substring(1) + '@c.us';
        whatsappService.sendMessage(chatId, message.text);
        const messageSended = await this.MessageService.create(
          message.phone,
          message.text
        );
        listSended.push(messageSended);
      });
      res.status(201).json({ listSended });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private initializeWA = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const QR = getQr();
      res.status(201).json({ QR });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default MessageController;
