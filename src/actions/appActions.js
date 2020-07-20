import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';


function affirmationFetched(affirm){
    return {
        type: actionTypes.FETCH_AFFIRMATION,
        affirmation: affirm.affirmation
    }
}

export function fetchAffirmation(){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/affirmations`, {
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
    // console.log(JSON.stringify(data))
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/affirmations`, {
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
