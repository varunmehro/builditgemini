import { INITIAL_APP_SCHEMA, COMPONENT_TYPES } from './schema';

/**
 * Simulates the AI "Architect" processing a user message.
 * @param {string} userMessage 
 * @param {AppSchema} currentSchema 
 * @returns {Promise<{ reply: string, updatedSchema: AppSchema | null }>} 
 */
export async function processUserMessage(userMessage, currentSchema) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const lowerMsg = userMessage.toLowerCase();

    // Clone schema to avoid mutation
    let nextSchema = JSON.parse(JSON.stringify(currentSchema));
    const currentPage = nextSchema.pages[0]; // operate on first page for MVP

    let reply = "";
    let updated = false;

    // Simple keyword matching logic for MVP
    if (lowerMsg.includes('header') || lowerMsg.includes('title')) {
        currentPage.components.push({
            id: `header_${Date.now()}`,
            type: COMPONENT_TYPES.HEADER,
            props: { title: "New Section" }
        });
        reply = "I've added a header for you. What should it say?";
        updated = true;
    } else if (lowerMsg.includes('input') || lowerMsg.includes('field')) {
        currentPage.components.push({
            id: `input_${Date.now()}`,
            type: COMPONENT_TYPES.INPUT,
            props: { label: "Project Name", placeholder: "Enter project..." }
        });
        reply = "Added an input field. Let me know if you want to change the label.";
        updated = true;
    } else if (lowerMsg.includes('button')) {
        currentPage.components.push({
            id: `btn_${Date.now()}`,
            type: COMPONENT_TYPES.BUTTON,
            props: { label: "Submit", variant: 'primary' } // default
        });
        reply = "I've placed a button. Access functionality is not yet wired up.";
        updated = true;
    } else if (lowerMsg.includes('stats') || lowerMsg.includes('card')) {
        currentPage.components.push({
            id: `stats_${Date.now()}`,
            type: COMPONENT_TYPES.STATS_CARD,
            props: { label: "Total Revenue", value: "$4,200" }
        });
        reply = "Added a statistics card to the dashboard.";
        updated = true;
    } else if (lowerMsg.includes('reset') || lowerMsg.includes('clear')) {
        nextSchema = JSON.parse(JSON.stringify(INITIAL_APP_SCHEMA));
        reply = "I've reset the app to the initial state. What shall we build now?";
        updated = true;
    } else {
        reply = "I'm listening. You can ask me to add headers, inputs, buttons, or stats cards.";
    }

    return {
        reply,
        updatedSchema: updated ? nextSchema : null
    };
}
