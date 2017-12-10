import * as Bluebird from 'bluebird';
import { Connector } from './libs/connector';
import { Container } from './models/container';

export class DockerPlugin {
    public connector: Connector;

    constructor(connector: Connector) {
        this.connector = connector;
    }

    public listContainers(query?: any): Bluebird<Container[]> {
        return this.connector.get('/containers/json')
            .map((container) => new Container(container));
    }

    public inspectContainer(id: string): Bluebird<Container> {
        return this.connector.get(`/containers/${id}/json`)
            .then((container) => new Container(container));

    }

    public topContainer(id: string): Bluebird<Container> {
        return this.connector.get(`/containers/${id}/top`);
        // TODO -> MODEL
    }

    public fsChangesContainer(id: string): Bluebird<Container> {
        return this.connector.get(`/containers/${id}/changes`);
        // TODO -> MODEL
    }

    public statsContainer(id: string): Bluebird<Container> {
        return this.connector.get(`/containers/${id}/stats`);
        // TODO -> MODEL
    }

    public createContainer(container: any): Bluebird<Container> {
        return this.connector.post('/containers/create', container);
    }
}
