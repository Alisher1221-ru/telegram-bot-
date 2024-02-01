import { freeStorage } from "@grammyjs/storage-free";
import { Context, SessionFlavor, session } from "grammy";
import { ConversationFlavor } from "@grammyjs/conversations";

export interface BotSetings {
  userName: string;
}

export type MyContext = Context &
  ConversationFlavor &
  SessionFlavor<BotSetings>;

export const SessionSetup = (token: string) => {
  return session({
    initial: () => ({
      userName: "alisher",
    }),
    // storage: freeStorage<BotSetings>(token),
  });
  // await next()
};
