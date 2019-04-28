import * as types from '../constants/actionTypes';

const initialState = {
    fetching: false,
    fetched: false,
    incidents: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case types.FETCHING_INCIDENTS:
    return { ...state, fetching: true };

  case types.FETCH_INCIDENT_SUCCESS:
    let incidents = payload;
    if (incidents.length > 0) {
      incidents = incidents.sort(function(a, b) {return b.delay - a.delay;});
    }
    return {
      ...state,
      fetching: false,
      fetched: true,
      incidents
    };

  default:
    return state;
  }
}
