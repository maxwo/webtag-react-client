import Dispatcher from '../dispatcher/WebtagDispatcher';
import Constants from '../constants/WebtagConstants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage
const inodeList = {};

function addInode(inode) {
    inodeList[inode.id] = inode;
}

// Facebook style store creation.
const InodeStore = assign({}, BaseStore, {
    // public methods used by Controller-View to operate on data
    get(id) {
        return inodeList[id];
    },

    // register store with dispatcher, allowing actions to flow through
    dispatcherIndex: Dispatcher.register((payload) => {
        const action = payload.action;
        console.log('InodeStore.payload', payload);

        switch (action.actionType) {

        case Constants.ActionTypes.INODE_FETCHED:
            addInode(action.inode);
            InodeStore.emitChange();
            break;

        default:
        }
    }),
});

export default InodeStore;
