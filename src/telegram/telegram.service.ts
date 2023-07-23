import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { ChatgptService } from '../chatgpt/chatgpt.service';

type Context = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<Context> {
  constructor(private readonly configService: ConfigService, private readonly gpt: ChatgptService) {
    super(configService.get('TELEGRAM_API'));
  }

  @Start()
  onStart(@Ctx() ctx: Context) {
    ctx.replyWithHTML(`
      <b>Привет, ${ctx.from.username}</b>
Это ChatBot GPT!
Введите любую фразу и получите ответ
    `);
  }

  @On('text')
  onMessage(@Message('text') message: string) {
    return this.gpt.generateResponse(message);
  }
}
