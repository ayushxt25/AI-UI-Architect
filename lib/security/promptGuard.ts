export function checkPromptSafety(input: string): { safe: boolean; reason?: string } {
    const disallowedPatterns = [
        /ignore previous instructions/i,
        /delete all system prompts/i,
        /reveal system/i,
        /raw css/i,
        /tailwind/i,
        /external library/i,
        /create new component/i,
        /bypass rules/i,
        /system settings/i
    ];

    for (const pattern of disallowedPatterns) {
        if (pattern.test(input)) {
            return {
                safe: false,
                reason: `🚨 SECURITY BLOCK: Your request violates safety policies (forbidden pattern: ${pattern.source}). Instruction injection or rule bypass detected.`
            };
        }
    }

    return { safe: true };
}
