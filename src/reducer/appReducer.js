import constants from '../constants/actionTypes'

var initialState = {
    affirmation: '',
}

export default (state = initialState, action) => {
    var updated = Object.assign({}, state);
    switch(action.type) {

        case constants.FETCH_AFFIRMATION:
            updated['affirmation'] = action.affirmation
            return updated;

        case constants.SEND_AFFIRMATION:
            return state;

        default:
            return state;
    }
}