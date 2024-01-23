import env from "./config/env.config.js";
import { Bot, InlineKeyboard } from "grammy";
import { sequentialize, run } from "@grammyjs/runner";

const bot = new Bot(env.TOKEN);

bot.use(
    sequentialize((ctx: any) => {
        const chat = ctx.chat?.id.toString();
        const user = ctx.from?.id.toString();
        return [chat, user].filter((con) => con !== undefined);
    })
);

bot.on('message', async (ctx: any) => {
    try { 
        const message = ctx.message.text;
        const chatId = ctx.chat?.id;
        const messageId = ctx.message?.message_id;

        if (chatId && messageId) {
            await ctx.api.deleteMessage(chatId, messageId);
        }

        if (message.startsWith("/start")) {
            ctx.reply(`Добро пожаловать ${ctx.from.first_name} в наш бот 😊
    
что может бот:  скачать музыку по названию`, {
                reply_markup: new InlineKeyboard().text('OK', 'stay'),
            });
            return;
        }
    
        if (message.startsWith("/audio")) {
            ctx.reply('аудио не найдено 🙄')
            return;
        }

        ctx.reply('я пока не могу поддержать диалог 😑');
    } catch (error) {
        console.log(error.message);
    }
});


bot.callbackQuery("ok")

bot.on("callback_query:data", async (ctx) => {
    ctx.reply('если что-то понадобится, пишите 😊')
    await ctx.answerCallbackQuery();
});

run(bot);
