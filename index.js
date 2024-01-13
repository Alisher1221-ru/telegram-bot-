import express from "express";
import env from "./config/env.config.js";
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(env.TOKEN, { polling: true });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    
    // Respond to any message
    if (messageText === '/start') {
        bot.sendMessage(chatId, 'Добро пожаловать в бот ;)');
        return
    }
    if (messageText === '/audio') {
        bot.sendMessage(chatId, 'твой audio готовится :)');
        return
    }
    if (messageText.slice()[0] === '/') {
        bot.sendMessage(chatId, 'Была допущена ошибка :|');
        return
    }
    bot.sendMessage(chatId, 'Я пока не могу тебе ответить :(')
});
