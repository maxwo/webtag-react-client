import React from 'react';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import './ServerNotification.jsx';
import Notification from './Notification.jsx';
import SearchFilters from './SearchFilters.jsx';
import InodeList from './InodeList.jsx';
import ActionCreators from '../actions/WebtagActionCreators';

let filter = {};

export default class App extends React.Component {

    filterChanged(f) {
        ActionCreators.searchInodes(f);
        ActionCreators.fetchAggregates(f);
    }

    render() {

        return (
            <div>
                <nav class="navbar navbar-default navbar-static-top">
                  <div class="container">
                    ...
                  </div>
                </nav>

                <Jumbotron>
                    <h1>Webtag</h1>
                    <p>
                        Below is a list of archived documents.
                    </p>
                </Jumbotron>

                <SearchFilters initialSearch={filter} onFilterChange={this.filterChanged} />

                <div className="col-md-9" id="searchResults">
                    <InodeList initialSearch={filter} />
                </div>

                <Notification/>

            </div>
        );
    }
}
