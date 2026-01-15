import 'dotenv/config'
import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

import  billingAgent  from './subAgents/billingAgent.js'
import  orderAgent  from './subAgents/orderAgent.js'
import  qaAgent  from './subAgents/qaAgent.js'

const app = new Hono()

const google = createGoogleGenerativeAI({
  apiKey: process.env.AI_API_KEY
});

app.get('/', c => c.text('Welcome to the Customer Support Routing Service!'))

app.post('/api/chat', async c => {
  try {
    const { message } = await c.req.json()

    const result = await generateText({
     
      model: google('gemini-2.5-flash'), 
      system: `
        You are a router agent.
        Your job is to decide which agents should handle the user's message.
        Options: support, order, billing.
        
        If multiple agents are needed, list them separated by commas.
        Example output: order, billing
        Do not add any other text.
      `,
      prompt: message
    })

  
    const agents = result.text.split(',').map(agent => agent.trim().toLowerCase())

    const agentMap = {
      billing: billingAgent,
      order: orderAgent,
      support: qaAgent
    }

    const responses = await Promise.all(
      agents.map(async (agentName) => {
        const agentFn = agentMap[agentName]
        if (agentFn) {
          const response = await agentFn(message)
          return { agent: agentName, response }
        }
        return null
      })
    )

    return c.json({ 
      responses: responses.filter(r => r !== null) 
    })

    
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Error processing request' }, 500)
  }
})

serve(app)
console.log('Server running at http://localhost:3000')