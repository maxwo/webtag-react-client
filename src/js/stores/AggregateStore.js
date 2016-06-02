import Dispatcher from '../dispatcher/WebtagDispatcher';
import Constants from '../constants/WebtagConstants';
import BaseStore from './BaseStore';
import assign from 'object-assign';

// data storage
let aggregates = {};

function setAggregates(aggs) {
    console.warn(aggs);
    aggregates = aggs;
}

// Facebook style store creation.
const AggregateStore = assign({}, BaseStore, {
    // public methods used by Controller-View to operate on data
    getAggregates() {
        return aggregates.aggregations;
    },

    getTotal() {
        return aggregates.total;
    },

    // register store with dispatcher, allowing actions to flow through
    dispatcherIndex: Dispatcher.register((payload) => {
        const action = payload.action;

        switch (action.actionType) {
        case Constants.ActionTypes.AGGREGATES_FETCHED:
            console.log('AggregateStore.payload', payload);
            setAggregates(action.aggregates);
            AggregateStore.emitChange();
            break;

        default:
        }
    }),
});

export default AggregateStore;
