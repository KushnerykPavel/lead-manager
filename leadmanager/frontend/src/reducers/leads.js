import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from '../actions/types';

const initiaState = {
    leads: []
}

export default function (state = initiaState, action) {
    switch (action.type) {
        case GET_LEADS:
            return {
                ...state,
                leads: action.payload
            };
        case DELETE_LEAD:
            return {
                ...state,
                leads: state.leads.filter(lead => lead.id != action.payload)
            }
        case ADD_LEAD:
            return {
                ...state,
                leads: [...state.leads, action.payload]
            }
        default:
            return state;
    }
}