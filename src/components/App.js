import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchIncidents } from '../actions';

import '../css/index.css';

import MarkerIcon from '../img/marker.png';
import DownArrow from '../img/caret-down-512.png';
import LoadingIcon from '../img/loading.gif';

export class App extends Component {
  constructor() {
    super();
    this.showIncident = this.showIncident.bind(this);
    this.state = {
      incidentSelected: ''
    };
  }

  componentDidMount() {
    this.props.fetchIncidents();
  }
  
  render() {
    const { incidents, fetching } = this.props;
    const incidentsCount = incidents.length;

    return (
      <div>
        <div className="App-header">
          Traffic Information
        </div>
        <div className="Map-area">
          {
            incidents.map((incident) => (
              <img src={MarkerIcon} className="Location-marker" />
            ))
          }
          {
            fetching &&
            <div className="Loading-overlay">
              <img src={LoadingIcon} className="Loading-icon" />
            </div>
          }
        </div>
        {
          (!fetching && incidentsCount === 0) &&
          <div className="No-incidents">
            There are no incidents happening right now. Try after some time.
          </div>
        }
        <div className="Incident-list">
          {
            incidents.map((incident) => {
              const {id, details, delay, from, to} = incident;
              const { incidentSelected } = this.state;
              const displayStyle = (id === incidentSelected) ? 'block' : 'none';
              return (
                <div key={id} className="Incident-row">
                  <div className="Incident-row-head clearfix" onClick={this.showIncident} data-incident-id={id}>
                    {details}, since {delay} seconds
                    <img src={DownArrow} className="Down-arrow" />
                  </div>
                  <div className="Incident-row-body" style={{display: displayStyle}}>
                    From: {from}<br/>To: {to}
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }

  showIncident(event) {
    let currentIncident = event.target.getAttribute('data-incident-id');
    const { incidentSelected } = this.state;
    let nextIncident = (incidentSelected === currentIncident && incidentSelected !== '') ? '' : currentIncident;
    this.setState({ incidentSelected: nextIncident });
  }
}

const mapStateToProps = (state) => ({
  incidents: state.incidents,
  fetching: state.fetching
});

const mapDispatchToProps = (dispatch) => ({
  fetchIncidents: bindActionCreators(fetchIncidents, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(App);

