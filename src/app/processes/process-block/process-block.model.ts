export interface IProcess {
    name: string;
    isRunning: boolean;
    initProcess(): void;
    startProcess(): void;
    stopProcess(): void;
}