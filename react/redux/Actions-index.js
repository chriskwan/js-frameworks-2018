export const SET_ACTIVE_ACCOUNT = 'SET_ACTIVE_ACCOUNT';
export const ADD_ACCOUNTS = 'ADD_ACCOUNTS';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';
export const ADD_TRANSACTIONS = 'ADD_TRANSACTIONS';

export const setActiveAccount = (activeAccountId) => ({
    type: SET_ACTIVE_ACCOUNT,
    payload: {
        activeAccountId
    }
});
export const addAccounts = (accounts) => ({
    type: ADD_ACCOUNTS,
    payload: {
        accounts
    }
});

export const login = () => ({ type: LOGIN });
export const logout = () => ({ type: LOGOUT });

export const addTransactions = (transactions) => ({
    type: ADD_TRANSACTIONS,
    payload: { transactions }
});

export const toggleLoading = (isLoading) => ({
    type: TOGGLE_LOADING,
    payload: { isLoading }
});
