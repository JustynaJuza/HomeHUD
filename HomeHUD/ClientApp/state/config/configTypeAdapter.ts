import { IListItem } from '../../components/admin/listPanel';
import { entityMap } from '../config/configState';

export class ConfigTypeAdapter {
    public type: IListItem;

    constructor(configName: string) {
        this.type = entityMap[configName];
    }

    public getPrototype(): any {
        return Object.getPrototypeOf(this.type);
    }

    public getApiUrl(): string {
        return this.type.listApi;
    }

    public getListColumns(): any[] {
        return this.type.getListColumns();
    }
}