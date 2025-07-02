"use server";

import { db } from "@/app/_lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import Groq from "groq-sdk";
import { GenerateAiReportsSchema, generateAiReportsSchema } from "./schema";

export const generateAiReports = async ({ month }: GenerateAiReportsSchema) => {
  generateAiReportsSchema.parse({ month });

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await clerkClient().users.getUser(userId);
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === "premium";

  if (!hasPremiumPlan) {
    throw new Error("You need to have a premium plan to use this feature");
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const actDate = new Date();
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`${actDate.getFullYear()}-${month}-01`),
        lt: new Date(`${actDate.getFullYear()}-${month}-31`),
      },
    },
  });

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. Calcule sempre a movimentação de dinheiro total por cada categoria. As transações estão divididas por ponto e vírgula (;). A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas:
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(";")}`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor suas finanças.",
      },
      {
        role: "user",
        content,
      },
    ],
  });

  return completion.choices[0]?.message?.content || "";
};
