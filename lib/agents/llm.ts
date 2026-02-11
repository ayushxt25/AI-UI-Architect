import OpenAI from 'openai';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'mock-key';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // Only for demo purposes
});

export async function callLLM(prompt: string, systemPrompt: string, jsonMode: boolean = false) {
    if (OPENAI_API_KEY === 'mock-key') {
        console.warn('Using Mock LLM Mode. Set OPENAI_API_KEY for real responses.');
        await new Promise(r => setTimeout(r, 1000)); // Simulate latency

        if (jsonMode) {
            const q = prompt.toLowerCase();
            let layout: any = { type: 'root', children: [] };
            let components: string[] = ['Navbar', 'Card'];
            let reasoning = "API Key missing. Simulated response based on intent.";

            if (q.includes('flipkart') || q.includes('amazon') || q.includes('shop') || q.includes('ecommerce')) {
                layout.children = [
                    { type: 'Navbar', props: { title: 'AI Commerce Pro' } },
                    {
                        type: 'Grid', props: { columns: 4 }, children: [
                            { type: 'Card', props: { title: 'Electronics' }, children: "Latest gadgets at best prices." },
                            { type: 'Card', props: { title: 'Fashion' }, children: "Up to 50% off on top brands." },
                            { type: 'Card', props: { title: 'Home' }, children: "Decorate your sanctuary." },
                            { type: 'Card', props: { title: 'Offers' }, children: "Exclusive deals for you." }
                        ]
                    },
                    {
                        type: 'Tabs', props: { tabs: [{ label: 'Deals', id: 'deals' }, { label: 'Trending', id: 'trending' }] }, children: `(activeId) => (
            <Card title={activeId === 'deals' ? 'Special Deals' : 'Trending Now'}>
              <Table headers={['Product', 'Price']} rows={[['iPhone 15', '₹79k'], ['Galaxy S24', '₹74k']]} />
              <Button label="Add Mock Item to Cart" variant="primary" onClick={() => addNotification('Added to cart!')} />
            </Card>
          )`}
                ];
                components = ['Navbar', 'Sidebar', 'Card', 'Table', 'Button', 'Tabs', 'Grid'];
                reasoning = "Simulated a responsive e-commerce dashboard using Grid, Tabs, and Table components.";
            } else {
                layout.children = [
                    { type: 'Navbar', props: { title: 'AI UI Architect' } },
                    {
                        type: 'Grid', props: { columns: 2 }, children: [
                            { type: 'Card', props: { title: 'Analytics' }, children: [{ type: 'Chart', props: { type: 'line', data: null } }] },
                            { type: 'Card', props: { title: 'System Status' }, children: [{ type: 'Table', props: { headers: ['ID', 'Task'], rows: [['#1', 'Build UI'], ['#2', 'Deploy']] } }] }
                        ]
                    }
                ];
                components = ['Navbar', 'Card', 'Chart', 'Table', 'Grid'];
            }

            return JSON.stringify({
                layout,
                components_used: components,
                reasoning,
                constraint_notice: 'Offline Mock Mode Active'
            });
        }

        if (systemPrompt.includes('Explainer')) {
            return "I have synthesized a multi-panel layout utilizing our whitelisted components. The structure prioritizes hierarchical navigation (Sidebar) and clear data visualization (Charts/Tables).";
        }

        // Generator Mock: Build a functional component string from the plan
        try {
            const planMatch = prompt.match(/STRUCTURED PLAN: (.*)/);
            if (planMatch) {
                const plan = JSON.parse(planMatch[1]);
                const renderNode = (node: any): string => {
                    if (typeof node === 'string') {
                        // If it's a function or JS expression, don't quote it in the final JSX
                        if (node.trim().startsWith('(') || node.trim().startsWith('{')) return node;
                        return `"${node}"`;
                    }
                    const nodeType = node.type === 'root' ? 'div' : node.type;
                    const props = Object.entries(node.props || {}).map(([k, v]) => {
                        if (typeof v === 'string' && (v.trim().startsWith('(') || v.trim().startsWith('()'))) {
                            return `${k}={${v}}`;
                        }
                        return `${k}={${JSON.stringify(v)}}`;
                    }).join(' ');
                    const children = node.children
                        ? (Array.isArray(node.children) ? node.children.map((c: any) => renderNode(c)).join('') : renderNode(node.children))
                        : '';

                    if (node.type === 'root') {
                        return `<div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '0px' }}>${children}</div>`;
                    }

                    // Support unquoted functional children for render-prop components like Tabs
                    const isFunctional = typeof node.children === 'string' && (node.children.trim().startsWith('(') || node.children.trim().startsWith('{'));
                    const processedChildren = isFunctional ? `{${node.children}}` : (children.startsWith('"') ? children.slice(1, -1) : children);

                    return `<${nodeType} ${props}>${processedChildren}</${nodeType}>`;
                };
                const generatedCode = renderNode(plan.layout);
                return `() => {
  return (
    ${generatedCode}
  );
}`;
            }
        } catch (e) {
            console.error('Mock Generator failed:', e);
        }
        return "() => <div>Failed to generate mock code. Check logs.</div>";
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: prompt }
            ],
            response_format: jsonMode ? { type: 'json_object' } : undefined,
        });

        return response.choices[0].message.content;
    } catch (error: any) {
        console.error('LLM Call Failed:', error);
        throw new Error('Failed to reach AI service: ' + error.message);
    }
}
