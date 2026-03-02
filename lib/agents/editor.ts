import { callLLM } from './llm';
import { EDITOR_PROMPT } from '../prompts';
import { validatePlan } from '../validation/planValidator';
import { UIPlan } from '@/types/plan';

export async function runEditor(intent: string, existingPlan: UIPlan): Promise<UIPlan> {
    const prompt = `
    EXISTING PLAN:
    ${JSON.stringify(existingPlan, null, 2)}
    
    USER MODIFICATION INTENT:
    ${intent}
    `;

    const response = await callLLM(prompt, EDITOR_PROMPT, true);
    if (!response) throw new Error('Editor returned empty response');

    let newPlan;
    try {
        newPlan = JSON.parse(response);
    } catch (e) {
        throw new Error('Editor failed to return valid JSON');
    }

    const validation = validatePlan(newPlan);
    if (!validation.success) {
        throw new Error('Edited plan failed structural Zod validation');
    }

    return validation.data as UIPlan;
}
