const SET_UP_WORKER = 'SET_UP_WORKER';
const SEARCH_WORKER = 'SEARCH_WORKER';
const SELECT_ALL_IN_WORKER = 'SELECT_ALL_IN_WORKER';
const DESELECT_ALL_IN_WORKER = 'DESELECT_ALL_IN_WORKER';

let stateProperties: {
    name: string;
    id: number;
    occupants: {
        name: string;
        id: number;
    }[];
    activeSearch: number[];
}[];

let occupants: {
    name: string;
    id: number;
}[];

let activeSearch: number[];

onmessage = function (e: any) {
    const { data: { data, type } } = e;
    // Pass in an array of state properties
    if (type === SET_UP_WORKER) {
        occupants = data;
    }
    // Pass in search term
    // Post results as occupant Ids
    if (type === SEARCH_WORKER) {
        if (!data) {
            activeSearch = [];
        }

        const term = data.toLowerCase();

        activeSearch = occupants.filter((o) => o.name.includes(term)).map((o) => o.id);
        // @ts-ignore
        postMessage(activeSearch);
    }
    // Return all active search items to select
    if (type === SELECT_ALL_IN_WORKER) {
        this.postMessage(activeSearch, '*');
    }
    // Return all active search items to deselect
    if (type === DESELECT_ALL_IN_WORKER) {
        this.postMessage(activeSearch, '*');
    }
};
