import * as actionTypes from '../actions/actionTypes';

const initialState = {
    meals: null,
    orderedMeals: {},
    totalPrice: 0,
    error: false,
    building: false
};

const  reducer = (state=initialState, action) => {
    let updatedMealAmount, updatedMeal, updatedMeals;
    let isInOrdered, updatedOrderedMeals, updatedOrdered={};
    switch ( action.type ) {
        case actionTypes.SET_MEALS:
            return {
                ...state,
                meals: action.meals,
                orderedMeals: {},
                totalPrice: 0,
                error: false,
                building: false
            }
        case actionTypes.FETCH_MEALS_FAILED:
            return {
                ...state,
                error: true,
                building: false
            }
        case actionTypes.ADD_MEAL:
            updatedMealAmount = state.meals[action.mealName]['amount'] + 1;
            updatedMeal = {
                ...state.meals[action.mealName],
                amount:updatedMealAmount
            }
            updatedMeals = {
                ...state.meals,
                [action.mealName]:updatedMeal
            }
            isInOrdered = false;
            for (let mealName in state.orderedMeals) {
                if(mealName === action.mealName) {
                    isInOrdered = true;
                }
            }
            if (isInOrdered) {
                updatedOrderedMeals= {
                    ...state.orderedMeals,
                    [action.mealName]: state.orderedMeals[action.mealName] + 1
                }
            }
            else {
                updatedOrderedMeals = {
                    ...state.orderedMeals,
                    [action.mealName]: 1
                }
            }
            return {
                ...state,
                meals: updatedMeals,
                totalPrice: state.totalPrice + Number(state.meals[action.mealName]['price']),
                orderedMeals: updatedOrderedMeals,
                building:true
            }
        case actionTypes.REMOVE_MEAL:
            updatedMealAmount = state.meals[action.mealName]['amount'] - 1;
            updatedMeal = {
                ...state.meals[action.mealName],
                amount:updatedMealAmount
            }
            updatedMeals = {
                ...state.meals,
                [action.mealName]:updatedMeal
            }
            isInOrdered = false;
            for (let mealName in state.orderedMeals) {
                if(mealName === action.mealName) {
                    isInOrdered = true;
                }
            }
            if (isInOrdered) {
                updatedOrderedMeals= {
                    ...state.orderedMeals,
                    [action.mealName]: state.orderedMeals[action.mealName] - 1
                }
            }
            for(let mealName in updatedOrderedMeals) {
                console.log(mealName);
                console.log(updatedOrderedMeals[mealName]);
                console.log(updatedOrdered);
                if(updatedOrderedMeals[mealName]) {
                    updatedOrdered = {
                        ...updatedOrdered,
                        [mealName]: updatedOrderedMeals[mealName]
                    }
                }
            }
            const buildingState = Object.keys(updatedOrdered).length ? true : false;
            return {
                ...state,
                meals: updatedMeals,
                totalPrice: state.totalPrice - Number(state.meals[action.mealName]['price']),
                orderedMeals: updatedOrdered,
                building: buildingState
            }
        default: return state;
    }
};

export default reducer;