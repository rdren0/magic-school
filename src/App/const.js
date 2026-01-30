export const gameSessionOptions = ["Main Campaign", "DEVELOPMENT"];

export const gameSessionGroups = {
  campaign: ["Main Campaign"],
  development: ["DEVELOPMENT"],
};

export const DISCORD_WEBHOOKS = {
  "Main Campaign": process.env.REACT_APP_DISCORD_WEBHOOK_MAIN_CAMPAIGN,
  DEVELOPMENT: process.env.REACT_APP_DISCORD_WEBHOOK_DEVELOPMENT,
  FALLBACK: process.env.REACT_APP_DISCORD_WEBHOOK_FALLBACK,
};

export const getDiscordWebhook = (gameSession) =>
  gameSession
    ? DISCORD_WEBHOOKS[gameSession] ?? DISCORD_WEBHOOKS.FALLBACK
    : DISCORD_WEBHOOKS.FALLBACK;

export const LOCAL_HOST = "http://localhost:3000";
export const WEBSITE = "https://college-of-magic.netlify.app";

export const RULE_BOOK_URL =
  "https://docs.google.com/document/d/1BY7U9mYLQD_p9O9e42AYLHG2Xr6ZCsR8Ye07MaGXfVw/edit?tab=t.0#heading=h.frfwms2htyde";
