import { NextRequest, NextResponse } from 'next/server';
import { runPlanner } from '@/lib/agents/planner';
import { runGenerator } from '@/lib/agents/generator';
import { runExplainer } from '@/lib/agents/explainer';
import { versionStore } from '@/lib/versioning/versionStore';
import { checkPromptSafety } from '@/lib/security/promptGuard';

export async function POST(req: NextRequest) {
    try {
        const { intent } = await req.json();

        if (!intent) {
            return NextResponse.json({ error: 'Intent is required' }, { status: 400 });
        }

        const safety = checkPromptSafety(intent);
        if (!safety.safe) {
            return NextResponse.json({ error: safety.reason }, { status: 403 });
        }

        // 1. Plan
        const plan = await runPlanner(intent);

        // 2. Generate
        const code = await runGenerator(plan);

        // 3. Explain
        const explanation = await runExplainer(intent, plan);

        // 4. Store
        const version = versionStore.push({
            plan,
            code,
            explanation
        });

        return NextResponse.json(version);
    } catch (error: any) {
        console.error('Generation Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
