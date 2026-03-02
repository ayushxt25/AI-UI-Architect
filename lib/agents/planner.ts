import { callLLM } from './llm';
import { PLANNER_PROMPT } from '../prompts';
import { validatePlan } from '../validation/planValidator';
import { UIPlan } from '@/types/plan';

export async function runPlanner(intent: string, existingPlan: UIPlan | null = null): Promise<UIPlan> {
    const prompt = `
USER INTENT: ${intent}
EXISTING PLAN: ${existingPlan ? JSON.stringify(existingPlan) : 'null'}
`;

    const response = await callLLM(prompt, PLANNER_PROMPT, true);
    if (!response) throw new Error('Planner returned empty response');

    const plan = JSON.parse(response);
    const validation = validatePlan(plan);

    if (!validation.success) {
        console.error('Plan Validation Error:', JSON.stringify(validation.error, null, 2));
        throw new Error(`Generated plan failed validation: ${JSON.stringify(validation.error)}`);
    }

    return validation.data as UIPlan;
}
