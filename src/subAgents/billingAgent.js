import 'dotenv/config'
import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

const google = createGoogleGenerativeAI({
  apiKey: process.env.AI_API_KEY
});

async function billingAgent(userMessage) {
  try {
    const result = await generateText({
      model: google('gemini-2.5-flash-lite'), 
      system: `
        You are a specialized Billing Support Agent.
        
        Your Capabilities:
        - issuing refunds
        - explaining charges and invoices
        - updating payment methods
        
        Tone: Professional, reassuring, and precise.
        
        If the user asks about something unrelated to billing (like shipping or technical bugs),
        you should only help with billing-related queries, NOTHING ELSE.
      `,
      prompt: userMessage
    })

    return result.text;

  } catch (error) {
    console.error("Billing Agent Error:", error);
    return "I am having trouble accessing billing records right now.";
  }
}

export default billingAgent;