import 'dotenv/config'
import { generateText } from 'ai'
import { readMemory, writeMemory } from '../utils/memoryUtils.js'
import google from '../utils/googleUtil.js';


async function billingAgent(userMessage) {
  try {
    const memory = await readMemory('billingAgent');

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

        Past Conversations:
        ${memory}
      `,
      prompt: userMessage
    })

    await writeMemory('billingAgent', userMessage, result.text);

    return result.text;

  } catch (error) {
    console.error("Billing Agent Error:", error);
    return "I am having trouble accessing billing records right now.";
  }
}

export default billingAgent;