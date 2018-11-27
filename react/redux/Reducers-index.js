import { combineReducers } from 'redux';
import {
    LOGIN,
    LOGOUT,
    TOGGLE_LOADING,
    SET_ACTIVE_ACCOUNT,
    ADD_ACCOUNTS,
    ADD_TRANSACTIONS
} from '../actions';

const uiReducer = (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            };
        case TOGGLE_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            };
        default:
            return state;
    }
}

const accountReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_ACTIVE_ACCOUNT:
            return {
                ...state,
                activeAccountId: action.payload.activeAccountId
            };
        case ADD_ACCOUNTS:
            return {
                ...state,
                accounts: [...action.payload.accounts]
            };
        default:
            return state;
    }
};

const transactionReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TRANSACTIONS:
            return {
                ...state,
                transactions: [...action.payload.transactions]
            };
        default:
            return state;
    }
};

const appReducer = combineReducers({
    ui: uiReducer,
    account: accountReducer,
    transaction: transactionReducer
});

export default appReducer;