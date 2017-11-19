export interface CrudServiceInterface<T> {
    list(query: any): Promise<T>;

    get(id: string, query: any): Promise<T>;

    create(body: any, query: any): Promise<T>;

    update(id: string, body: any, query: any): Promise<T>;

    remove(id: string, query: any): Promise<T>;
}
