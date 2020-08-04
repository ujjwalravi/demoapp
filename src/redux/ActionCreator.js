import * as ActionTypes from './ActionTypes';
import { baseUrl} from '../shared/baseUrl';

//POSTING TO SERVER
export const addWorkdata = (workdata) => ({
    type: ActionTypes.ADD_TODO,
    payload: workdata
});

export const postWorkdata = (workname, worktime) => (dispatch) => {
    const newWorkdata = {
        workname: workname,
        worktime: worktime
    }

    return fetch(baseUrl + 'workdata', {
        method: 'POST',
        body: JSON.stringify(newWorkdata),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(addWorkdata(response)))
        .catch(error => { console.log('Post comments', error.message)
    ;alert('Your comment could not be posted\nError: '+error.message);})
}

//FETCHING TODO
export const todoLoading = () => ({
    type: ActionTypes.TODO_LOADING
});

export const fetchWorkdata = () => (dispatch) => {

    dispatch(todoLoading(true));

    return fetch(baseUrl + 'workdata')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ':' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(workdata => dispatch(addWorkdatas(workdata)))
    .catch(error => dispatch(workdatasFailed(error.message)));
}

export const workdatasFailed = (errmess) => ({
    type: ActionTypes.TODO_FAILED,
    payload: errmess
});

export const addWorkdatas = (workdata) => ({
    type: ActionTypes.ADD_TODOS,
    payload: workdata
});