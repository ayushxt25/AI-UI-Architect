import { NextRequest, NextResponse } from 'next/server';
import { versionStore } from '@/lib/versioning/versionStore';

export async function POST(req: NextRequest) {
    try {
        const { versionId } = await req.json();

        const version = versionStore.rollback(versionId);

        if (!version) {
            return NextResponse.json({ error: 'Version not found' }, { status: 404 });
        }

        return NextResponse.json(version);
    } catch (error: any) {
        console.error('Rollback Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
