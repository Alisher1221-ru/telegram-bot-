import env from "./config/env.config.js";
import { Bot, GrammyError, HttpError, Keyboard } from "grammy";
import { sequentialize, run } from "@grammyjs/runner";
import axios from "axios";
import { Menu, MenuRange } from "@grammyjs/menu";

const bot = new Bot(env.TOKEN);
const menu = new Menu("dynamic");

bot.use(menu);
let data: any = [];

menu
  .dynamic(() => {
    const range = new MenuRange();
    data.map((el: any) => {
      for (let i = 0; i < el.length; i++) {
        range.text('ads', (ctx) => ctx.reply(`You chose ${i}`)).row();
      }
    })
    return range;
  })
  .text("Cancel", (ctx) => ctx.deleteMessage());

bot.use(
  sequentialize((ctx: any) => {
    const chat = ctx.chat?.id.toString();
    const user = ctx.from?.id.toString();
    return [chat, user].filter((con) => con !== undefined);
  })
);

export async function setCommands(bot: any) {
  await bot.api.setMyCommands([
    {
      command: "start",
      description: `Добро пожаловать в наш бот 😊`,
    },
    {
      command: "location",
      description: `где мы находимся 🚩`,
    },
    {
      command: "shopping_pay",
      description: `наш сайт 🍱`,
    },
  ]);
}
setCommands(bot);

bot.command("location", (ctx) => {
  ctx.api.sendLocation(ctx.chat.id, 41.560067458778754, 60.60795898367056);
});

bot.command("shopping_pay", (ctx) => {
  ctx.reply("наш сайт 🍱", {
    reply_markup: new Keyboard()
      .webApp("shopping-pay", "https://shopping-pay.netlify.app/")
      .resized(),
  });
});

bot.command("start", async (ctx) => {
  ctx.reply("Добро пожаловать в наш бот с чем могу помочь 😃", {
    reply_markup: new Keyboard()
      .text("популярные товары")
      .text("категории")
      .resized(),
  });
  // await ctx.conversation.enter("greetingConvesation");
});

bot.on("message", async (ctx: any) => {
  try {
    const message = ctx.message.text;
    const chatId = ctx.chat?.id;
    const messageId = ctx.message?.message_id;

    if (chatId && messageId) {
      await ctx.api.deleteMessage(chatId, messageId);
    }
    if (message === "категории") {
      await axios
        .get("http://localhost:3006/categorys")
        .then((res) => console.log(data.push(res.data)))
        .catch((error) => console.log(error));

      ctx.reply("категории", {
        reply_markup: menu,
      });
      return;
    }

    ctx.reply("я пока не могу поддержать диалог 😑");
  } catch (error) {
    console.log(error);
  }
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

run(bot);

// bot.use(SessionSetup(env.TOKEN));
// bot.use(conversations());
// bot.use(createConversation(greetingConvesation));
