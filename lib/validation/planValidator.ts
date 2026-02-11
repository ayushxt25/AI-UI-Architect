import { z } from 'zod';
import { createHash } from 'crypto';

export const UIPlanSchema = z.object({
    layout: z.object({
        type: z.string(),
        props: z.record(z.string(), z.any()).optional(),
        children: z.any().optional(),
    }),
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
    if (result.success) {
        // Generate Plan Hash for reproducibility (Bonus Point)
        const hash = createHash('sha256')
            .update(JSON.stringify(result.data))
            .digest('hex');
        return { ...result, hash };
    }
    return result;
};
