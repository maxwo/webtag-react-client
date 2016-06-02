export default {
    // event name triggered from store, listened to by views
    CHANGE_EVENT: 'change',

    // Each time you add an action, add it here... They should be past-tense
    ActionTypes: {
        INODE_SAVED: 'INODE_SAVED',
        INODE_REQUESTED: 'INODE_REQUESTED',
        INODE_FETCHED: 'INODE_FETCHED',
        INODE_SEARCH_REQUESTED: 'INODE_SEARCH_REQUESTED',
        INODE_SEARCH_FETCHED: 'INODE_SEARCH_FETCHED',
        AGGREGATES_REQUESTED: 'AGGREGATES_REQUESTED',
        AGGREGATES_FETCHED: 'AGGREGATES_FETCHED',
    },

    ActionSources: {
        SERVER_ACTION: 'SERVER_ACTION',
        VIEW_ACTION: 'VIEW_ACTION',
    },
};
