import { fetchAccounts } from "../../services/AccountService";

export default {
    namespaced: true,
    state: {
        activeAccountId: null,
        accounts: []
    },
    mutations: {
        setAccounts (state, { accounts }) {
            state.accounts = accounts;
        },
        toggleAccountActive (state, { accountId }) {
            state.activeAccountId = accountId;
        }
    },
    actions: {
        async loadAccounts ({ commit }) {
            const accounts = await fetchAccounts();
            commit("setAccounts", { accounts });

            if (accounts.length) {
                commit("toggleAccountActive", { accountId: accounts[0].id });
            }
        }
    }
};