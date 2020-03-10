import { Injectable } from "@angular/core";
import { IProcess } from '../process-block/process-block.model';

@Injectable({
    providedIn: 'root'
})
export class ZombieService implements IProcess {

    public title: string = 'Zombie Mode';
    public isRunning: boolean = false;

    constructor() { }

    public initProcess(): void {

    }

    public startProcess(): void {

    }

    public stopProcess(): void {

    }
}