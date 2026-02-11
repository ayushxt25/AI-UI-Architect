export interface UIPlan {
    layout: {
        type: string;
        props?: Record<string, any>;
        children?: UIPlan[] | string | string[];
    };
    components_used: string[];
    reasoning: string;
    constraint_notice: string;
    hash?: string;
    modifications?: {
        add: any[];
        update: any[];
        remove: any[];
    } | null;
}

export interface Version {
    id: number;
    plan: UIPlan;
    code: string;
    explanation: string;
    timestamp: string;
}
