import { NextRequest, NextResponse } from 'next/server';
import { runPlanner } from '@/lib/agents/planner';
import { runGenerator } from '@/lib/agents/generator';
import { runExplainer } from '@/lib/agents/explainer';
import { versionStore } from '@/lib/versioning/versionStore';
import { checkPromptSafety } from '@/lib/security/promptGuard';

export async function POST(req: NextRequest) {
    try {
        const { intent, versionId } = await req.json();

        if (!intent) {
            return NextResponse.json({ error: 'Intent is required' }, { status: 400 });
        }

        const safety = checkPromptSafety(intent);
        if (!safety.safe) {
            return NextResponse.json({ error: safety.reason }, { status: 403 });
        }

        const previousVersion = versionId
            ? versionStore.getHistory().find(v => v.id === versionId)
            : versionStore.getCurrent();

        if (!previousVersion) {
            return NextResponse.json({ error: 'Previous version not found' }, { status: 404 });
        }

        // 1. Plan (with modification context)
        const plan = await runPlanner(intent, previousVersion.plan);

        // 2. Generate (with incremental update logic)
        const code = await runGenerator(plan, previousVersion.code);

        // 3. Explain
        const explanation = await runExplainer(intent, plan, 'Modification requested');

        // 4. Store
        const version = versionStore.push({
            plan: { ...plan, hash: (plan as any).hash },
            code,
            explanation
        });

        return NextResponse.json(version);
    } catch (error: any) {
        console.error('Modification Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
