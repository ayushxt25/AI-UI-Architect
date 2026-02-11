import { COMPONENT_WHITELIST } from './componentWhitelist';

export function validateGeneratedCode(code: string): { success: boolean; error?: string } {
    // 1. Check for prohibited imports
    const importMatch = code.match(/import\s+{([^}]+)}\s+from\s+["']@\/components\/ui["']/);
    if (!importMatch) {
        return { success: false, error: 'Invalid or missing UI component imports' };
    }

    const importedComponents = importMatch[1].split(',').map(c => c.trim());
    for (const component of importedComponents) {
        if (!COMPONENT_WHITELIST.includes(component)) {
            return { success: false, error: `Unauthorized component import: ${component}` };
        }
    }

    // 2. Check for prohibited styling
    if (code.includes('className=') || code.includes('.css') || code.includes('styled-components')) {
        // Note: We allow basic style={} for layout flex/padding, but not CSS modules or Tailwind
        if (code.match(/className=["'][^"']*["']/)) {
            return { success: false, error: 'Tailwind or CSS classes are prohibited' };
        }
    }

    // 3. Simple Whitelist Usage Check (Regex-based for speed)
    // Ensures ONLY whitelisted components are used as JSX tags
    const jsxTags = code.match(/<([A-Z][a-zA-Z0-9]*)/g);
    if (jsxTags) {
        for (const tagMatch of jsxTags) {
            const tag = tagMatch.substring(1);
            if (!COMPONENT_WHITELIST.includes(tag) && tag !== 'React' && tag !== 'Fragment') {
                // Allow common React fragments and standard HTML tags (lowercased)
                if (tag[0] === tag[0].toUpperCase()) {
                    return { success: false, error: `Unauthorized component usage: ${tag}` };
                }
            }
        }
    }

    return { success: true };
}
