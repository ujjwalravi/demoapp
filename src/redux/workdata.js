import * as ActionTypes from './ActionTypes';

export const Workdata = (state = {
        isLoading: true,
        errMess: null,
        workdata:[]
    }, action) => {
        switch(action.type) {
            case ActionTypes.TODO_LOADING:
                return {...state, isLoading: true, errMess: null, workdata: []}
            case ActionTypes.ADD_TODOS:
                return {...state, isLoading: false, errMess: null, workdata: action.payload};
            case ActionTypes.TODO_FAILED:
                return {...state, isLoading: false, errMess: action.payload, workdata: []};
        
            case ActionTypes.ADD_TODO:
                var wd = action.payload;
                return {...state, workdata: state.workdata.concat(wd)};
            default: 
                return state;
        }
}