
import { Dispatcher } from 'flux';
import Constants from '../constants/WebtagConstants';
/**
 * Purpose: to create a single dispatcher instance for use throughout the
 * entire app. The two methods below are merely thin wrappers that describe
 * where the action originated from. Not mandatory, but may be helpful
 **/
class WebtagDispatcher extends Dispatcher {

    /**
     * This does nothing yet, but will come in handy if you need to respond
     * to server-originated events and treat them differently...
     **/
    handleServerAction(action) {
        console.info('handleServerAction', action);
        this.dispatch({
            source: Constants.ActionSources.SERVER_ACTION,
            action,
        });
    }

    /**
     * Very thin wrapper around the core dispatcher API, just to signify
     * that actions triggered here originated on the client-side
     **/
    handleViewAction(action) {
        console.info('handleViewAction', action);
        this.dispatch({
            source: Constants.ActionSources.VIEW_ACTION,
            action,
        });
    }
}

export default new WebtagDispatcher();
