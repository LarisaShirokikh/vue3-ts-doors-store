import { createStore } from 'vuex';

interface Door {
    id: number;
    name: string;
    price: number;
}

export default createStore({
    state: {
        doors: [
            { id: 1, name: 'Front Door', price: 500 },
            { id: 2, name: 'Back Door', price: 400 },
            { id: 3, name: 'Patio Door', price: 600 },
        ] as Door[],
    },
    mutations: {},
    actions: {},
    modules: {},
});
