import Dispatcher from '../dispatcher/WebtagDispatcher';
import Constants from '../constants/WebtagConstants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage
let editedInode = null;

// add private functions to modify data
function setEditedInode(inode) {
    editedInode = inode;
}

// Facebook style store creation.
const EditedInodeStore = assign({}, BaseStore, {
    // public methods used by Controller-View to operate on data
    getEditedInode() {
        return editedInode;
    },

    // register store with dispatcher, allowing actions to flow through
    dispatcherIndex: Dispatcher.register((payload) => {
        const action = payload.action;
        console.log('EditedInodeStore.payload', payload);

        switch (action.actionType) {
        case Constants.ActionTypes.INODE_EDITED:

            setEditedInode(action.inode);
            EditedInodeStore.emitChange();
            break;

        }
    }),
});

export default EditedInodeStore;
