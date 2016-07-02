import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import './ServerNotification.jsx';
import Notification from './Notification.jsx';
import Navigation from './Navigation.jsx';
import SearchFilters from './SearchFilters.jsx';
import SearchResults from './SearchResults.jsx';
import ActionCreators from '../actions/WebtagActionCreators';

let filter = {};

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.filterChanged = this.filterChanged.bind(this);
    }

    filterChanged(filter) {
        this.executeSearch(filter)
    }

    executeSearch(filter) {
        ActionCreators.searchInodes(filter);
        ActionCreators.fetchAggregates(filter);
    }

    render() {

        return (
            <div>
                <Navigation onFilterChange={this.filterChanged} />

                <Jumbotron>
                    <h1>Webtag</h1>
                    <p>
                        Below is a list of archived documents.
                    </p>
                </Jumbotron>

                <SearchFilters initialSearch={filter} onFilterChange={this.filterChanged} />

                <div className="col-md-9" id="searchResults">
                    <SearchResults initialSearch={filter} />
                </div>

                <Notification/>

            </div>
        );
    }
}
