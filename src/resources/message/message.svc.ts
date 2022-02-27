import MessageModel from '@/resources/message/message.model';
import Message from '@/resources/message/message.interface';

class MessageService {
  private message = MessageModel;

  /**
   * Create a new post
   */
  public async create(phone: string, text: string): Promise<Message> {
    // try {
    //   const message = await this.message.create({ phone, text });

    //   return message;
    // } catch (error) {
    //   console.log(error);
    //   throw new Error('Unable to create message');
    // }
    return new Promise<Message>((resolve, reject) => {
      const response = { phone: 'ok', text: 'OK' };
      return response;
    });
  }
}

export default MessageService;
