import env from "./config/env.config.js";
import { Bot, InlineKeyboard, Keyboard } from "grammy";
import { sequentialize, run } from "@grammyjs/runner";

const bot = new Bot(env.TOKEN);

bot.use(
  sequentialize((ctx: any) => {
    const chat = ctx.chat?.id.toString();
    const user = ctx.from?.id.toString();
    return [chat, user].filter((con) => con !== undefined);
  })
);

const auth = {
  signup: false,
  login: false,
};

bot.on("message", async (ctx: any) => {
  try {
    const message = ctx.message.text;
    const chatId = ctx.chat?.id;
    const messageId = ctx.message?.message_id;

    if (chatId && messageId) {
        await ctx.api.deleteMessage(chatId, messageId);
    }

    if (message.startsWith("/start")) {
      ctx.reply(`Добро пожаловать в наш бот ${ctx.from.first_name} 😊`, {
        reply_markup: new InlineKeyboard()
          .text("login", "login")
          .text("signup", "signup"),
      });
      return;
    }
    // if (message.startsWith("/start")) {
    //   await ctx.reply(`Добро пожаловать в наш бот ${ctx.from.first_name} 😊`, {
    //     reply_markup: new Keyboard().requestContact("Telefon raqam"),
    //   });
    // }

    if (auth.signup) {
        ctx.reply('signup')
        auth.signup=false
        return
    }

    if (auth.login) {
        ctx.reply('login')
        auth.login=false
        return
    }

    // const newKeyboard = new Keyboard().requestContact("Telefon raqam");

    await ctx.api.sendMessage(chatId, "<a href='http://localhost/phpMyAdmin/index.php?route=/sql&server=1&db=telegramshop&table=user&pos=0' >я пока не могу поддержать диалог 😑</a>", {parse_mode: "HTML"})
  } catch (error) {
    console.log(error);
  }
});

bot.on("callback_query:data", async (ctx) => {
  await ctx.answerCallbackQuery();
  try {
    if (ctx.callbackQuery.data === "signup") {
      ctx.reply("пишите пароль для регистрации пример");
      auth.signup = true;
      auth.login = false;
      return;
    }
    if (ctx.callbackQuery.data === "login") {
      ctx.reply("пишите пароль для входа пример");
      auth.login = true;
      auth.signup = false;
      return;
    }

    const error = new Error("comand not found");
    throw error;
  } catch (error) {
    ctx.reply("ошибка при команде");
  }
});

run(bot);
