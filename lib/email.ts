import nodemailer from "nodemailer";

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Hiányzó környezeti változó: ${name}`);
  }

  return value;
}

function environmentNumber(
  name: string,
  defaultValue: number,
): number {
  const value = process.env[name];

  if (!value) {
    return defaultValue;
  }

  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    throw new Error(`Hibás számérték: ${name}`);
  }

  return numberValue;
}

function environmentBoolean(
  name: string,
  defaultValue: boolean,
): boolean {
  const value = process.env[name];

  if (!value) {
    return defaultValue;
  }

  return value.toLowerCase() === "true";
}

const emailAddress = requiredEnvironmentVariable(
  "EMAIL_ADDRESS",
);

const emailUsername = requiredEnvironmentVariable(
  "EMAIL_USERNAME",
);

const emailPassword = requiredEnvironmentVariable(
  "EMAIL_PASSWORD",
);

const smtpHost = requiredEnvironmentVariable(
  "EMAIL_SMTP_HOST",
);

const smtpPort = environmentNumber(
  "EMAIL_SMTP_PORT",
  465,
);

const smtpSecure = environmentBoolean(
  "EMAIL_SMTP_SECURE",
  true,
);

export type SendEmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export const emailTransporter =
  nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: emailUsername,
      pass: emailPassword,
    },
  });

export async function sendEmail(
  input: SendEmailInput,
) {
  const to = input.to.trim();
  const subject = input.subject.trim();
  const text = input.text.trim();

  if (!to) {
    throw new Error("A címzett megadása kötelező.");
  }

  if (!subject) {
    throw new Error("A tárgy megadása kötelező.");
  }

  if (!text && !input.html) {
    throw new Error("A levél tartalma nem lehet üres.");
  }

  return emailTransporter.sendMail({
    from: {
      name: "Keszthelyi Consulting",
      address: emailAddress,
    },

    to,
    subject,
    text,
    html: input.html,

    replyTo: input.replyTo || emailAddress,
  });
}