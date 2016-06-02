import Dispatcher from '../dispatcher/WebtagDispatcher';
import Constants from '../constants/WebtagConstants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage
let inodeSearchResult = [];
const inodeList = {};

function setInodeSearchResult(inodes) {
    inodeSearchResult = inodes;
}

function addInode(inode) {
    inodeList[inode.id] = inode;
}

// Facebook style store creation.
const InodeListStore = assign({}, BaseStore, {
    // public methods used by Controller-View to operate on data
    getAll() {
        return inodeSearchResult;
    },

    get(id) {
        return inodeList[id];
    },

    // register store with dispatcher, allowing actions to flow through
    dispatcherIndex: Dispatcher.register((payload) => {
        const action = payload.action;
        console.log('InodeListStore.payload', payload);

        switch (action.actionType) {
        case Constants.ActionTypes.INODE_SEARCH_FETCHED:
            setInodeSearchResult(action.inodes);
            InodeListStore.emitChange();
            break;

        case Constants.ActionTypes.INODE_FETCHED:
            addInode(action.inode);
            InodeListStore.emitChange();
            break;

        default:
        }
    }),
});

export default InodeListStore;
