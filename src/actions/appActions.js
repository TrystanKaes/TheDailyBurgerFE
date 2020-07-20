import actionTypes from '../constants/actionTypes';


function affirmationFetched(affirm){
    return {
        type: actionTypes.FETCH_AFFIRMATION,
        affirmation: affirm.affirmation
    }
}

export function fetchAffirmation(){

    return dispatch => {
        return fetch(`http://localhost:8080/affirmations`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                dispatch(affirmationFetched(res));
                return res;
            })
            .catch( (e) => console.log(e) )
    }
}

export function sendAffirmation(data){
    console.log(JSON.stringify(data))
    return dispatch => {
        return fetch(`http://localhost:8080/affirmations`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                // dispatch(affirmationFetched(res));
                return res;
            })
            .catch( (e) => console.log(e) )
    }
}
