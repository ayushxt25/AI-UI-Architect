import { Version } from '@/types/plan';

class VersionStore {
    private versions: Version[] = [];
    private currentVersionIndex: number = -1;

    push(version: Omit<Version, 'id' | 'timestamp'>) {
        const newVersion: Version = {
            ...version,
            id: this.versions.length + 1,
            timestamp: new Date().toISOString()
        };
        this.versions.push(newVersion);
        this.currentVersionIndex = this.versions.length - 1;
        return newVersion;
    }

    getCurrent() {
        return this.currentVersionIndex >= 0 ? this.versions[this.currentVersionIndex] : null;
    }

    getHistory() {
        return [...this.versions];
    }

    rollback(id: number) {
        const index = this.versions.findIndex(v => v.id === id);
        if (index !== -1) {
            this.currentVersionIndex = index;
            return this.versions[index];
        }
        return null;
    }
}

// Singleton for in-memory storage
declare global {
    var versionStoreInstance: VersionStore | undefined;
}

export const versionStore = global.versionStoreInstance || new VersionStore();

if (process.env.NODE_ENV !== 'production') {
    global.versionStoreInstance = versionStore;
}
