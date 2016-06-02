import Dispatcher from '../dispatcher/WebtagDispatcher';
import Constants from '../constants/WebtagConstants';
import { searchInodes, fetchInode, fetchAggregates } from '../api/WebtagAPI';

/* eslint-disable no-console */

export default {

    saveInode(inode) {
        Dispatcher.handleServerAction({
            actionType: Constants.ActionTypes.INODE_SAVED,
            inode,
        });
    },

    searchInodes(filters = {}) {
        Dispatcher.handleViewAction({
            actionType: Constants.ActionTypes.INODE_SEARCH_REQUESTED,
            filters,
            request: searchInodes(filters),
        });
    },

    completeInodeSearch(filters, inodes) {
        Dispatcher.handleServerAction({
            actionType: Constants.ActionTypes.INODE_SEARCH_FETCHED,
            inodes,
        });
    },

    fetchAggregates(filters = {}) {
        Dispatcher.handleViewAction({
            actionType: Constants.ActionTypes.AGGREGATES_REQUESTED,
            filters,
            request: fetchAggregates(filters),
        });
    },

    completeAggregatesFetch(filters, aggregates) {
        Dispatcher.handleServerAction({
            actionType: Constants.ActionTypes.AGGREGATES_FETCHED,
            filters,
            aggregates,
        });
    },

    fetchInode(id) {
        Dispatcher.handleViewAction({
            actionType: Constants.ActionTypes.INODE_REQUESTED,
            id,
            request: fetchInode(id),
        });
    },

    completeInodeFetch(inode) {
        Dispatcher.handleServerAction({
            actionType: Constants.ActionTypes.INODE_FETCHED,
            inode,
        });
    },
};
