import 'dotenv/config'
import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

// 1. Setup the Google Provider
const google = createGoogleGenerativeAI({
  apiKey: process.env.AI_API_KEY
});

// 2. The Main Function
export async function orderAgent(userMessage) {
  try {
    const result = await generateText({
      model: google('gemini-2.5-flash-lite'),
      system: `
        You are a specialized Order Fulfillment Agent.
        
        Your Capabilities:
        - checking order status and tracking numbers
        - handling shipping delays
        - processing returns and exchanges
        - resolving issues with damaged or missing items
        
        Tone: Helpful, efficient, and logistics-focused.
        
        If the user asks about anything other then order related queries, politely decline and say you can only help with order-related queries.
      `,
      prompt: userMessage
    })

    return result.text;

  } catch (error) {
    console.error("Order Agent Error:", error);
    return "I am unable to retrieve order details at this moment.";
  }
}

export default orderAgent;