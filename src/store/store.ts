import { createStore } from 'vuex';

interface User {
    id: number;
    email: string;
    token: string;
}

export default createStore({
    state: {
        data: null as User | null,
    },
    mutations: {
        setUser(state, userData: any) {
            const user: User = {
                id: userData.id,
                email: userData.email,
                token: userData.token,
            };
            state.data = user;
            console.log('Мутация setUser вызвана', state.data);
        },
        clearUser(state) {
            state.data = null;
        },
    },
    actions: {
        loginUser({ commit }, userData: any) {
            commit('loginUser', userData);
            console.log('Действие loginUser вызвано', userData);
        },
        logoutUser({ commit }) {
            commit('clearUser');
        },
    },
    getters: {
        isAuthenticated(state) {
            return !!state.data;
        },
        getUser(state) {
            return state.data;
        },
    },
});
