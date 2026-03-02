import { z } from 'zod';
import { createHash } from 'crypto';
import { COMPONENT_WHITELIST } from './componentWhitelist';

// Strict Component Schema
export const UIComponentSchema: z.ZodType<any> = z.lazy(() => z.object({
    type: z.string(), // Allow all strings, but we'll still check whitelist later in code validation
    props: z.record(z.string(), z.any()).optional().nullable(),
    children: z.any().optional(), // Extremely relaxed for the internal tree
}));

// The ultimate source of truth for the entire application layout
export const UIPlanSchema = z.object({
    layout: UIComponentSchema,
    components_used: z.array(z.string()),
    reasoning: z.string(),
    constraint_notice: z.string().optional(),
    modifications: z.object({
        add: z.array(z.any()),
        update: z.array(z.any()),
        remove: z.array(z.any()),
    }).nullable().optional(),
});

export const validatePlan = (plan: any) => {
    const result = UIPlanSchema.safeParse(plan);
    if (!result.success) {
        return { success: false, error: result.error, data: null, hash: null };
    }

    // Generate Plan Hash for reproducibility
    const hash = createHash('sha256')
        .update(JSON.stringify(result.data))
        .digest('hex');

    return { success: true, data: { ...result.data, hash }, hash };
};
