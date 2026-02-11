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
        console.error('Plan Validation Error:', validation.error);
        throw new Error('Generated plan failed validation');
    }

    return validation.data as UIPlan;
}
