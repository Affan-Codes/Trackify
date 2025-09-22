import { GoogleGenerativeAI } from "@google/generative-ai";

interface RawInsight {
  type?: string;
  title?: string;
  message?: string;
  action?: string;
  confidence?: number;
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export interface ExpenseRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface AIInsight {
  id: string;
  type: "warning" | "info" | "success" | "tip";
  title: string;
  message: string;
  action?: string;
  confidence: number;
}

export async function generateExpenseInsights(
  expenses: ExpenseRecord[]
): Promise<AIInsight[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const expensesSummary = expenses.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    }));

    const prompt = `Analyze the following expense data and provide 3-5 actionable financial insights in JSON format:

    Expense Data:
    ${JSON.stringify(expensesSummary, null, 2)}

    Return insights as a JSON array with this exact structure:
    [
      {
        "type": "warning" | "info" | "success" | "tip",
        "title": "Brief insight title",
        "message": "Detailed explanation with specific data",
        "action": "Actionable recommendation (optional)",
        "confidence": 0.8
      }
    ]

    Focus on spending patterns, budget recommendations, and financial optimization. Use actual numbers from the data.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const insights: RawInsight[] = JSON.parse(jsonMatch[0]);
      return insights.map((insight, index) => ({
        id: `insight-${Date.now()}-${index}`,
        type: (insight.type as AIInsight["type"]) || "info",
        title: insight.title || "Financial Insight",
        message: insight.message || "No message provided",
        action: insight.action,
        confidence: insight.confidence || 0.7,
      }));
    }

    throw new Error("Invalid JSON response from AI");
  } catch (error) {
    console.error("❌ Error generating insights:", error);
    return [
      {
        id: `fallback-${Date.now()}`,
        type: "info",
        title: "Insights Unavailable",
        message:
          "Unable to generate insights at the moment. Please try again later.",
        confidence: 0.5,
      },
    ];
  }
}

export async function categorizeExpense(description: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `Categorize this expense into one of these categories: Food, Transportation, Entertainment, Shopping, Bills, Healthcare, Other.
    Expense description: "${description}"
    Respond with only the category name.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const category = response.text().trim();

    const validCategories = [
      "Food",
      "Transportation",
      "Entertainment",
      "Shopping",
      "Bills",
      "Healthcare",
      "Other",
    ];

    const finalCategory = validCategories.includes(category)
      ? category
      : "Other";

    return finalCategory;
  } catch (error) {
    console.error("❌ Error categorizing expense:", error);
    return "Other";
  }
}

export async function generateAIAnswer(
  question: string,
  context: ExpenseRecord[]
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const expensesSummary = context.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    }));

    const prompt = `Based on the following expense data, provide a detailed and actionable answer to this question: "${question}"

    Expense Data:
    ${JSON.stringify(expensesSummary, null, 2)}

    Provide a comprehensive answer that:
    1. Addresses the specific question directly
    2. Uses concrete data from the expenses when possible
    3. Offers actionable advice
    4. Keeps the response concise but informative (2-3 sentences)

    Return only the answer text, no additional formatting.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new Error("No response from AI");
    }

    return text.trim();
  } catch (error) {
    console.error("❌ Error generating AI answer:", error);
    return "I'm unable to provide a detailed answer at the moment. Please try refreshing the insights or check your connection.";
  }
}
