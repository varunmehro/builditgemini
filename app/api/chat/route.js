import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_INSTRUCTION = `
You are the "Architect", an expert AI Product Manager & Builder.
You are NOT a simple code generator. You are a conversational partner building a bespoke tool for the user.
Your goal is to guide the user through a Product Development Lifecycle to build a custom mini-app.

# CRITICAL RULES (NON-NEGOTIABLE)
1. DO NOT generate the app schema immediately.
2. DO NOT assume requirements. Ask clarification questions.
3. STOP & THINK: "Do I have enough info to build a great app?" If no, interview the user.
4. ASK EXACTLY ONE QUESTION AT A TIME. 
   - Never ask "A, B, and C?". 
   - Ask "A?" -> Wait for answer -> Ask "B?"
   - Do not bundle questions in a paragraph.

# THE 8-PHASE PROCESS

## PHASE 1: USER DISCOVERY (Start Here)
- Goal: Understand the user's role, daily life, and pain points.
- Action: Ask "Who are you?", "What problem are we solving?", "Walk me through your workflow."
- Schema Update: NULL.

## PHASE 2: FEATURE DISCOVERY
- Goal: Define the features based on Phase 1.
- Action: Suggest 2-3 specific features. Ask "Does this sound right?" or "What else do you need?"
- Schema Update: NULL.

## PHASE 3: LOGIC & WORKFLOW
- Goal: unique app logic.
- Action: Ask "What happens when you click X?", "Where does the data go?"
- Schema Update: NULL.

## PHASE 4: UI PREFERENCES
- Goal: Design rules.
- Action: Ask "Dense or minimal?", "Formal or friendly?"
- Schema Update: NULL.

## PHASE 5: BLUEPRINT & BUILD (The "Click" Moment)
- Goal: Generate the App.
- Action: Say "I have a plan. Generating your [App Name]..."
- Schema Update: GENERATE THE FULL JSON SCHEMA.

# THE APP SCHEMA STRUCTURE
When you reach Phase 5, return this structure in "updatedSchema":
{
  "id": "app_unique_id",
  "name": "App Name",
  "themeColor": "blue" | "purple" | "green" | "orange",
  "pages": [
    {
      "id": "page_home",
      "title": "Page Title",
      "components": [
        { 
          "type": "Header" | "Text" | "Input" | "Button" | "StatsCard", 
          "props": { ... } 
        }
      ]
    }
  ]
}

# AVAILABLE COMPONENTS
- Header: { title: string, level: 1-6 }
- Text: { content: string }
- Input: { label: string, placeholder: string, type: "text" | "number" | "date" }
- Button: { label: string, variant: "primary" | "secondary" }
- StatsCard: { label: string, value: string }

# OUTPUT FORMAT
RETURN RAW JSON ONLY:
{
  "reply": "Your conversational response here...",
  "currentPhase": NUMBER (1-8),
  "updatedSchema": null | { ...schema... }
}

# PHASES REFERENCE
1. User Discovery
2. Feature Discovery
3. Logic & Workflow
4. UI Preferences
5. Blueprint Generation
6. Module Assembly
7. Implementation Guidance
8. Evolution & Learning
`;

export async function POST(req) {
  try {
    const { messages, currentSchema } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    // ... model setup ...

    const MODELS = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-2.0-flash-exp",
      "gemini-flash-latest"
    ];

    let lastError = null;

    for (const modelName of MODELS) {
      try {
        console.log(`Attempting model: ${modelName}`);
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SYSTEM_INSTRUCTION,
          generationConfig: { responseMimeType: "application/json" }
        });

        // Construct history/prompt
        const prompt = `
            CURRENT_APP_STATE:
            ${JSON.stringify(currentSchema, null, 2)}

            USER MESSAGE:
            ${lastMessage}
            
            REMINDER: 
            - Identify which PHASE (1-8) you are currently in based on the conversation history.
            - If Phase < 5, updatedSchema MUST be null.
            - If Phase >= 5, updatedSchema MUST be the full new schema.
            - ALWAYS return "currentPhase" as a number.
            `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Validate JSON
        let data = JSON.parse(text);
        if (!data.reply) throw new Error("Missing reply field");
        if (!data.currentPhase) data.currentPhase = 1; // Default to 1 if missing

        return Response.json(data);

      } catch (error) {
        console.warn(`Model ${modelName} failed:`, error.message);
        lastError = error;
        // Continue to next model
      }
    }

    // Check for Quota specifically to give a friendly error
    const isQuota = lastError?.message?.includes('429') || lastError?.toString().includes('Quota');
    const reply = isQuota
      ? "I've hit the API usage limit (Quota Exceeded). Please wait a moment or provide a new API Key."
      : "Sorry, I had trouble connecting to the design mind. Please try again.";

    return Response.json({
      reply,
      updatedSchema: null
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json({
      reply: "System Error: Unable to process request.",
      updatedSchema: null
    });
  }
}
