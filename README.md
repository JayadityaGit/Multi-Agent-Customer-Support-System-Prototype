# Multi-Agent Customer Support System Prototype

This project is a **Customer Support Routing Service** powered by the **Gemini API** (via Google Generative AI). It intelligently routes user queries to specialized sub-agents.

## Key Features
*   **Gemini API Integration:** Utilizes Google's `gemini-2.5-flash` model for high-speed, accurate intent classification.
*   **Multi-Agent Architecture:** distinct agents for Billing, Orders, and General Support.
*   **Parallel Processing:** Handles complex queries requiring multiple agents simultaneously.

## Tech Stack
*   **AI:** Google Gemini API (via Vercel AI SDK)
*   **Backend:** Node.js, Hono
