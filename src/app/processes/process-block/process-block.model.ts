export interface IProcess {
    title: string;
    isRunning: boolean;
    initProcess(): void;
    startProcess(): void;
    stopProcess(): void;
}