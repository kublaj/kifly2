import 'reflect-metadata';
import { Route } from '../../src/libs/server/route/decorator';
import { CrudServiceInterface } from './crud-service.interface';

export class CrudControllerGenerator {
    private generatorSourceService: CrudServiceInterface<any>;

    public setCrudSource(service: CrudServiceInterface<any>) {
        this.generatorSourceService = service;
    }

    @Route('get', '')
    public async listItems(req, res) {
        this.checkInitialization();

        try {
            res.status(200).json({
                payload: await this.generatorSourceService.list(req.query),
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    @Route('post', '')
    public async createItem(req, res) {
        this.checkInitialization();
        const body = req.body;

        try {
            res.status(200).json({
                payload: await this.generatorSourceService.create(body, req.query),
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    @Route('get', '/:id')
    public async getItem(req, res) {
        this.checkInitialization();
        const id = req.params.id;

        try {
            res.status(200).json({
                payload: await this.generatorSourceService.get(id, req.query),
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    @Route('put', '/:id')
    public async updateItem(req, res) {
        this.checkInitialization();
        const body = req.body;
        const id = req.params.id;

        try {
            res.status(200).json({
                payload: await this.generatorSourceService.update(id, body, req.query),
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    @Route('delete', '/:id')
    public async deleteItem(req, res) {
        this.checkInitialization();
        const id = req.params.id;

        try {
            res.status(200).json({
                payload: await this.generatorSourceService.remove(id, req.query),
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }

    private checkInitialization() {
        if (!this.generatorSourceService) {
            throw new Error('Crud generator service is must be initialized with a source service');
        }
    }
}
