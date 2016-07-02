import React from 'react';
import SearchResultStore from '../stores/SearchResultStore';
import WebtagActionCreators from '../actions/WebtagActionCreators';
import InodeList from './inodeList/InodeList.jsx';
import InodeDetailsTooltip from './inodeList/InodeDetailsTooltip.jsx';
import InodeEditor from './InodeEditor.jsx';
import SearchResultsCount from './SearchResultsCount.jsx';

export default class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inodes: [],
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    componentDidMount() {
        console.log('SearchResults.componentDidMount');
        WebtagActionCreators.searchInodes();
        SearchResultStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        console.log('SearchResults.componentWillUnmount');
        SearchResultStore.removeChangeListener(this.onChange);
    }

    onChange() {
        console.log('SearchResults.onChange');
        this.setState({
            inodes: SearchResultStore.getResults(),
        });
    }

    onClick(inode) {
        console.log('SearchResults.onClick');
        WebtagActionCreators.editInode(inode);
    }

    onMouseEnter(inode) {
        console.log('SearchResults.onMouseEnter');
        WebtagActionCreators.overviewInode(inode);
    }

    onMouseLeave(inode) {
        console.log('SearchResults.onMouseLeave');
        WebtagActionCreators.overviewInode(null);
    }

    render() {
        console.log('SearchResults.render');
        const inodes = this.state.inodes;
        const selectedInode = this.state.selectedInode;

        console.log(this.state);

        return (
            <div>

                <SearchResultsCount inodes={inodes} />

                <InodeDetailsTooltip />

                <InodeEditor />

                <InodeList
                    inodes={inodes}
                    onClick={this.onClick}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave} />

            </div>);
    }
}

InodeList.propTypes = {
    defaultSearch: React.PropTypes.object.isRequired,
};
InodeList.defaultProps = {
    defaultSearch: {},
};
