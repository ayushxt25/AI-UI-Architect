import { callLLM } from './llm';
import { GENERATOR_PROMPT } from '../prompts';
import { UIPlan } from '@/types/plan';

export async function runGenerator(plan: UIPlan, previousCode: string = ''): Promise<string> {
    const prompt = `
STRUCTURED PLAN: ${JSON.stringify(plan)}
EXISTING CODE: ${previousCode}
`;

    const response = await callLLM(prompt, GENERATOR_PROMPT, false);
    if (!response) throw new Error('Generator returned empty response');

    // Basic cleanup of markdown code blocks if the LLM ignores the 'No markdown' rule
    return response.replace(/```(javascript|jsx|react|typescript|tsx)?/g, '').replace(/```/g, '').trim();
}
