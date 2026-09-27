export declare function readerProgressCopy(): Record<string, string>;
export declare function createReaderPageState(): {
    reader: {
        totalPages: number;
        currentPage: number;
        primaryViewerKey: string;
    };
    progress: {
        metadataReady: boolean;
        sourceDone: boolean;
        translatedDone: boolean;
    };
    bootProgressBar: {
        value: number;
        target: number;
        rafId: number;
    };
};
export declare function resetReaderProgressState(state: any): void;
export declare function computeReaderProgressSnapshot(progressState: any, copy?: any): {
    percent: number;
    text: any;
    stage: string;
};
//# sourceMappingURL=page-state.d.ts.map