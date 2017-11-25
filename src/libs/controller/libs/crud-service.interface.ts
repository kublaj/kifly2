export interface CrudServiceInterface<T> {
    listItems(query: any): Promise<T[]>;

    getItem(id: string, query: any): Promise<T>;

    createItem(body: any, query: any): Promise<T>;

    updateItem(id: string, body: any, query: any): Promise<any>;

    deleteItem(id: string, query: any): Promise<any>;
}
