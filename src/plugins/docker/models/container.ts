export class Container {
    public Id: string;
    public Names: string;
    public Image: string;
    public ImageID: string;
    public Command: string;
    public Created: string;
    public Ports: any; // TODO -> PORTS
    public Labels: any; // TODO -> LABELS
    public State: string; // TODO -> STATES ENUM
    public Status: string;
    public HostConfig: any; // TODO -> HOST CONFIG
    public NetworkSettings: any; // TODO -> NETS
    public Mounts: any;

    constructor(options: any = {}) {
        this.Id = options.Id;
        this.Names = options.Names;
        this.Image = options.Image;
        this.ImageID = options.ImageID;
        this.Command = options.Command;
        this.Created = options.Created;
        this.Ports = options.Ports;
        this.Labels = options.Labels;
        this.State = options.State;
        this.Status = options.Status;
        this.HostConfig = options.HostConfig;
        this.NetworkSettings = options.NetworkSettings;
        this.Mounts = options.Mounts;
    }
}
