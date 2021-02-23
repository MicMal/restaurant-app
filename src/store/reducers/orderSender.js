import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    purchased: false,
    error: false
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_ORDER_START:
            return {
                ...state,
                loading: true,
                error: false
            }
        case actionTypes.PURCHASE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                purchased: true,
                error: false
            }
        case actionTypes.PURCHASE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: true
            }
        case actionTypes.PURCHASED_RESET:
            return {
                ...state,
                purchased: false,
            }
        case actionTypes.ERROR_PURCHASED_RESET:
            return {
                ...state,
                error: false
            }
        default: return state;
    }
}

export default reducer;