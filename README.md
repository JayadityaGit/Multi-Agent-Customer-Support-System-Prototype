![RoughDesign](https://github.com/user-attachments/assets/476e5e70-3e27-43f5-8ff7-1746c33bb6c5)


# Multi-Agent Customer Support System Prototype

This project is a **Customer Support Routing Service** powered by the **Gemini API** (via Google Generative AI). It intelligently routes user queries to specialized sub-agents based on the detected intent.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A Google Gemini API Key

## Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JayadityaGit/Multi-Agent-Customer-Support-System-Prototype.git
   cd Multi-Agent-Customer-Support-System-Prototype
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a file named `.env` in the root directory and add your Gemini API key:
   ```env
   AI_API_KEY=your_gemini_api_key_here
   ```

## Running the Application

To start the server with hot-reloading:
```bash
npm run dev
```

The server will run at `http://localhost:3000`.

## Testing the API

You can use this Frontend Prototype `https://github.com/JayadityaGit/-Multi-Agent-Customer-Support-System-Prototype-Frontend-?tab=readme-ov-file`

OR

We use **Postman** to test the endpoints.

1. Create a new **POST** request to `http://localhost:3000/api/chat`.
2. In the **Body** tab, select **raw** and **JSON**.
3. Send a message like this:
   ```json
   {
     "message": "I canceled my order last week but I still got charged and the order still shows active in my account."
   }
   ```
4. The system will return responses from the appropriate sub-agents (e.g., Billing and Order agents).

**Example Response:**
```json
{
    "responses": [
        {
            "agent": "order",
            "response": "I understand you're experiencing issues with a return, a delayed refund, and a locked account. I can certainly help you with the order fulfillment aspect of this.\n\nTo assist you further, please provide me with the following information:\n\n*   **Your Order Number:**\n*   **Your Tracking Number for the Return Shipment:**\n*   **The Date You Shipped the Return:**\n\nOnce I have these details, I will be able to investigate the status of your return and the refund process.\n\nRegarding your locked account, I am unable to directly assist with account access issues. You will need to contact our Customer Support team for assistance with account-related matters. They will be able to help you unlock your account."
        },
        {
            "agent": "billing",
            "response": "I understand you're concerned about your refund and that your account has been locked. I can certainly help you with the refund status and any billing-related issues.\n\nTo assist you with the refund, could you please provide me with your order number or any relevant account information? Once I have that, I can investigate the status of your return and the refund process.\n\nRegarding your account being locked, I can also look into that from a billing perspective. Please confirm if this is related to a payment issue on your account."
        }
    ]
}
```
