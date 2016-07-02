import React from 'react';
import SearchResultStore from '../stores/SearchResultStore';
import WebtagActionCreators from '../actions/WebtagActionCreators';
import InodeList from './inodeList/InodeList.jsx';
import InodeDetailsTooltip from './inodeList/InodeDetailsTooltip.jsx';

export default class SearchResultsCount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inodes: [],
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        console.log('SearchResults.componentDidMount');
        SearchResultStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        console.log('SearchResults.componentWillUnmount');
        SearchResultStore.removeChangeListener(this.onChange);
    }

    onChange() {
        console.log('SearchResults.onChange');
        this.setState({
            inodeCount: SearchResultStore.getResults().length,
        });
    }

    render() {
        console.log('InodeList.render');
        const inodes = this.state.inodes;
        const selectedInode = this.state.selectedInode;

        return (
            <div className="searchResults">
                { this.state.inodeCount } documents found.
            </div>);
    }
}
