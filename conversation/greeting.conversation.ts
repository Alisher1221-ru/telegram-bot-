import { Conversation } from "@grammyjs/conversations"
import { MyContext } from "../session"

export type MyConversation = Conversation<MyContext>

export async function greetingConvesation(
    conversation: MyConversation,
    ctx: MyContext
) {
    await ctx.reply("Wassap broo")
}