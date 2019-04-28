import * as types from '../constants/actionTypes';
import incidents from '../api/incidents.json';

/**
 * fetchIncidents(): Action creator to fetch recipes from json file.
 */
export const fetchIncidents = (dispatch) => {
  return (dispatch) => {
    dispatch({ type: types.FETCHING_INCIDENTS });
    /**
     * Mock timer to show the delay from API
     */
    setTimeout(() => {
      dispatch({ type:  types.FETCH_INCIDENT_SUCCESS, payload: incidents });
    }, 1000);
  }
};
