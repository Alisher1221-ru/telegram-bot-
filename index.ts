import env from "./config/env.config.js";
import { Bot, Context, GrammyError, HttpError, Keyboard } from "grammy";
import { sequentialize, run } from "@grammyjs/runner";
// interface BotSetings {
//   userName: string | undefined;
// }

// type MyContext = Context & {
//   settings: BotSetings;
// }
const bot = new Bot(env.TOKEN);

// bot.use(async (ctx, next) => {
//   ctx.settings = {
//     userName: "alisher"
//   }
//   await next()
// })

async function setCommands() {
  await bot.api.setMyCommands([
    {
      command: "start",
      description: `Добро пожаловать в наш бот 😊`
    },
    {
      command: "location",
      description: `где мы находимся 🚩`
    },
  ])
}
setCommands()

bot.use(
  sequentialize((ctx: any) => {
    const chat = ctx.chat?.id.toString();
    const user = ctx.from?.id.toString();
    return [chat, user].filter((con) => con !== undefined);
  })
);

bot.command("location", (ctx) => {
  ctx.api.sendLocation(ctx.chat.id, 41.560067458778754, 60.60795898367056)
})

bot.command("start", (ctx) => {
  ctx.reply("Добро пожаловать в наш бот с чем могу помочь 😃", {
    reply_markup: new Keyboard()
    .text("products")
    .text("category")
    .resized()
  })
})

bot.on("message", async (ctx: any) => {
  try {
    const message = ctx.message.text;
    const chatId = ctx.chat?.id;
    const messageId = ctx.message?.message_id;

    if (chatId && messageId) {
      await ctx.api.deleteMessage(chatId, messageId);
    }

    ctx.reply("я пока не могу поддержать диалог 😑")
  } catch (error) {
    console.log(error);
  }
});

bot.catch((err) => {
  const ctx = err.ctx
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
})

run(bot);
