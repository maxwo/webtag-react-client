import Dispatcher from '../dispatcher/WebtagDispatcher';
import Constants from '../constants/WebtagConstants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage
let latestInode = null;

// add private functions to modify data
function setLatestInode(inode) {
    latestInode = inode;
}

// Facebook style store creation.
const LatestStore = assign({}, BaseStore, {
    // public methods used by Controller-View to operate on data
    getLatestInode() {
        return {
            inode: latestInode,
        };
    },

    // register store with dispatcher, allowing actions to flow through
    dispatcherIndex: Dispatcher.register((payload) => {
        const action = payload.action;

        switch (action.actionType) {
        case Constants.ActionTypes.INODE_SAVED:
            // NOTE: if this action needs to wait on another store:
            // Dispatcher.waitFor([OtherStore.dispatchToken]);
            // For details, see: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#why-we-need-a-dispatcher
            setLatestInode(action.inode);
            LatestStore.emitChange();
            break;

            // add more cases for other actionTypes...

            // no default
        }
    }),
});

export default LatestStore;
