import { Occupant } from '../../State/Occupants/Types';
import { Property } from '../../State/Shared/Types';

export class ItemSet<T extends Occupant | Property> {
    private _itemSet: { [id: number]: T }

    private _itemSetOrder: number[];

    constructor(set: T[]) {
        this._itemSet = set.reduce((obj: { [id: number]: T }, current: T) => ({
            ...obj,
            [current.id]: current,
        }), {});

        this._itemSetOrder = set.map((setItem: Occupant | Property) => setItem.id);
    }

    get allSetItems(): T[] {
        return this._itemSetOrder.map((id: number) => this._itemSet[id]);
    }

    get numberOfItems(): number {
        return this._itemSetOrder.length;
    }

    get hasItems(): boolean {
        return this._itemSetOrder.length > 0;
    }

    item(id: number): T {
        return this._itemSet[id];
    }

    itemsByIds(ids: number[]): T[] {
        const setIds = new Set(this._itemSetOrder);

        return ids.filter((id: number) => setIds.has(id)).map((id: number) => this._itemSet[id]);
    }

    searchItems(searchTerm: string): number[] {
        const term = searchTerm.toLowerCase();

        return Object.values(this._itemSet)
            .filter((i: T) => i.name.toLowerCase().includes(term))
            .map((i: T) => i.id);
    }
}
