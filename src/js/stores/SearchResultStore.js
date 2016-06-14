import Dispatcher from '../dispatcher/WebtagDispatcher';
import Constants from '../constants/WebtagConstants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage
let inodeSearchResult = [];

function setInodeSearchResult(inodes) {
    inodeSearchResult = inodes;
}

// Facebook style store creation.
const SearchResultStore = assign({}, BaseStore, {
    // public methods used by Controller-View to operate on data
    getResults() {
        return inodeSearchResult;
    },

    // register store with dispatcher, allowing actions to flow through
    dispatcherIndex: Dispatcher.register((payload) => {
        const action = payload.action;
        console.log('SearchResultStore.payload', payload);

        switch (action.actionType) {
        case Constants.ActionTypes.INODE_SEARCH_FETCHED:
            setInodeSearchResult(action.inodes);
            SearchResultStore.emitChange();
            break;

        default:
        }
    }),
});

export default SearchResultStore;
