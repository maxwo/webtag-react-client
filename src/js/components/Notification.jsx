import React from 'react';
import LatestInodeStore from '../stores/LatestInodeStore';
import InodeOverview from './inodeList/InodeOverview.jsx';

export default React.createClass({

    getInitialState() {
        console.log('getInitialState');
        return LatestInodeStore.getLatestInode();
    },

    componentDidMount() {
        console.log('componentDidMount');
        LatestInodeStore.addChangeListener(this.onChange);
    },

    componentWillUnmount() {
        console.log('componentWillUnmount');
        LatestInodeStore.removeChangeListener(this.onChange);
    },

    onChange() {
        console.log('_onChange');
        this.setState(LatestInodeStore.getLatestInode());
    },

    render() {
        console.log('render');
        console.log(this.state);
        let { inode } = this.state;
        let view;

        if (inode) {
            view = (
                <div>
                    Latest inode : <InodeOverview inode={inode.id} />
                </div>
            );
        } else {
            view = 'Here come the notifications.';
        }

        return (
            <div className="notificationList">
                {view}
            </div>
        );
    }
});
