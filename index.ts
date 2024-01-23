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

let signup = false

bot.on('message', async (ctx: any) => {
    try { 
        const message = ctx.message.text;
        const chatId = ctx.chat?.id;
        const messageId = ctx.message?.message_id;

        if (chatId && messageId) {
            await ctx.api.deleteMessage(chatId, messageId);
        }

        if (message.startsWith("/start")) {
            ctx.reply(`Добро пожаловать в наш бот ${ctx.from.first_name} 😊`, {
                reply_markup: new InlineKeyboard().text('login', 'stay').text('signup', 'signup'),
            });
            return;
        }
    
        if (message.startsWith("/audio")) {
            ctx.reply('аудио не найдено 🙄')
            return;
        }

        if (signup) {
            
        }

        ctx.reply('я пока не могу поддержать диалог 😑');
    } catch (error) {
        console.log(error);
    }
});


bot.on("callback_query:data", async (ctx) => {
    if (ctx.callbackQuery.data === 'signup') {
        ctx.reply('пишите имя')
        signup = true
        await ctx.answerCallbackQuery();
        return
    }
    
    await ctx.answerCallbackQuery();
});

run(bot);
