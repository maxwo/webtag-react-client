import Dispatcher from '../dispatcher/WebtagDispatcher';
import Constants from '../constants/WebtagConstants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage
let overviewedInode = null;

// add private functions to modify data
function setOverviewedInode(inode) {
    overviewedInode = inode;
}

// Facebook style store creation.
const OverviewedInodeStore = assign({}, BaseStore, {
    // public methods used by Controller-View to operate on data
    getOverviewedInode() {
        return overviewedInode;
    },

    // register store with dispatcher, allowing actions to flow through
    dispatcherIndex: Dispatcher.register((payload) => {
        const action = payload.action;
        console.log('OverviewedInodeStore.payload', payload);

        switch (action.actionType) {
        case Constants.ActionTypes.INODE_OVERVIEWED:

            setOverviewedInode(action.inode);
            OverviewedInodeStore.emitChange();
            break;

        }
    }),
});

export default OverviewedInodeStore;
