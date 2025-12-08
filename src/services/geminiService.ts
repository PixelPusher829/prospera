import { GoogleGenAI } from "@google/genai";
import { FinancialSummary, ChartDataPoint, ExpenseCategory } from "../types/types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getFinancialAdvice = async (
  summary: FinancialSummary,
  expenses: ExpenseCategory[],
  history: ChartDataPoint[]
): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please provide a valid Gemini API Key to receive insights.";
  }

  try {
    const context = `
      Current Balance: $${summary.balance} (+${summary.balanceGrowth}%)
      Monthly Income: $${summary.income} (+${summary.incomeGrowth}%)
      Monthly Expense: $${summary.expense} (+${summary.expenseGrowth}%)
      
      Top Expense Categories:
      ${expenses.map(e => `- ${e.name}: ${e.value}%`).join('\n')}
      
      Recent Balance Trends (Last 10 points):
      ${history.map(h => `${h.name}: $${h.value}`).join(', ')}
    `;

    const prompt = `
      Act as a senior financial advisor for a CRM dashboard. 
      Analyze the following financial snapshot of a small business or freelancer:
      ${context}

      Provide a concise, 3-sentence actionable insight. 
      Focus on cash flow health, potential savings based on the expense categories, and a suggestion for the upcoming month.
      Do not use markdown formatting (bolding etc), just plain text.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to generate insights at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI service is temporarily unavailable.";
  }
};
