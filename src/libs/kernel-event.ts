export class KernelEvent {
    public name: string;
    public payload: string;

    constructor(name: string, payload: any) {
        this.name = name;
        this.payload = payload;
    }
}