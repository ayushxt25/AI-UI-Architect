import { callLLM } from './llm';
import { EXPLAINER_PROMPT } from '../prompts';
import { UIPlan } from '@/types/plan';

export async function runExplainer(intent: string, plan: UIPlan, changes: string = ''): Promise<string> {
    const prompt = `
USER INTENT: ${intent}
FINAL PLAN: ${JSON.stringify(plan)}
MODIFICATION_CONTEXT: ${changes}
`;

    const response = await callLLM(prompt, EXPLAINER_PROMPT, false);
    return response || 'No explanation provided.';
}
