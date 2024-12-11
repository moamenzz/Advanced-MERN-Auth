import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN_SECRET,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};
