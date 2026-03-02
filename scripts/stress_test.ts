import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// 1. The Prompt Bank (Targeting specific model vulnerabilities)
const PROMPT_BANK = [
    "Build a SaaS dashboard for an analytics company",
    "Create a beautiful glassmorphism landing page for a web3 startup",
    "Design an e-commerce product checkout form",
    "Generate a dark mode pricing tier section",
    "Build an internal tool for managing user bans with a data table",
    "Create a complex settings page with tabs and form inputs",
    "Design a mobile-first social media feed with cards",
    "Build a minimal login page with an email and password field",
    "Create a developer documentation layout with a sidebar and grid",
    "Design a generic corporate hero section with a primary CTA"
    // Scaled up dynamically in production loops
];

interface TestStats {
    total: number;
    firstTrySuccess: number;
    healedSuccess: number;
    criticalFailures: number;
    avgLatencyMs: number;
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function runStressTest() {
    console.log("🚀 Starting AI Pipeline Stress Test Framework...");
    console.log(`📡 Target Endpoint: http://localhost:3000/api/generate`);
    console.log(`📂 Total Scenarios: ${PROMPT_BANK.length}`);

    const stats: TestStats = {
        total: PROMPT_BANK.length,
        firstTrySuccess: 0,
        healedSuccess: 0,
        criticalFailures: 0,
        avgLatencyMs: 0
    };

    let totalTime = 0;
    const failures = [];

    for (let i = 0; i < PROMPT_BANK.length; i++) {
        const intent = PROMPT_BANK[i];
        console.log(`\n▶ [${i + 1}/${PROMPT_BANK.length}] Testing: "${intent}"`);

        const startTimestamp = Date.now();

        try {
            const res = await fetch('http://localhost:3000/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ intent })
            });

            const latency = Date.now() - startTimestamp;
            totalTime += latency;

            if (!res.ok) {
                const errorData = await res.json() as any;
                throw new Error(errorData.error || 'Unknown HTTP Failure');
            }

            const data = await res.json() as any;

            // In future metric implementations, we can have the API header inject the 'retry count'
            // For now, if it succeeds under 8000ms, it's generally a first-try success on Flash.
            if (latency > 8500) {
                console.log(`  ✅ Healed Success (Latency: ${latency}ms)`);
                stats.healedSuccess++;
            } else {
                console.log(`  ✅ First Try Success (Latency: ${latency}ms)`);
                stats.firstTrySuccess++;
            }

        } catch (error: any) {
            const latency = Date.now() - startTimestamp;
            totalTime += latency;
            console.error(`  ❌ Critical Failure (Latency: ${latency}ms) - Expected 0 retries to fail.`);
            console.error(`     Reason: ${error.message}`);
            stats.criticalFailures++;
            failures.push({ intent, error: error.message });
        }

        // Throttle to avoid generic 429 quota bans from AI Studio during rapid tests
        await sleep(1500);
    }

    stats.avgLatencyMs = Math.round(totalTime / PROMPT_BANK.length);

    // Save report
    console.log("\n📊 STRESS TEST RESULTS:");
    console.log(`Total Prompts Executed: ${stats.total}`);
    console.log(`First-Try Successes: ${stats.firstTrySuccess}`);
    console.log(`Self-Healed Successes: ${stats.healedSuccess}`);
    console.log(`Critical Drop-dead Failures: ${stats.criticalFailures}`);
    console.log(`Average Latency: ${stats.avgLatencyMs}ms`);

    const reportPath = path.join(process.cwd(), 'stress_test_report.json');
    fs.writeFileSync(reportPath, JSON.stringify({ stats, failures }, null, 2));
    console.log(`\nReport saved to: ${reportPath}`);
}

runStressTest().catch(console.error);
