export interface IProcess {
    name: string;
    initProcess(): void;
    destroyProcess(): void;
}