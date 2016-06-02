import React from 'react';
import InodeListStore from '../stores/InodeListStore';
import InodeDetails from './InodeDetails.jsx';
import WebtagActionCreators from '../actions/WebtagActionCreators';

export default class InodeOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inode: this.props.inode,
        };
        this.onChange = this.onChange.bind(this);
        this.visibleDetails = false;
    }

    onChange() {
        console.log('InodeOverview.onChange');
        this.setState(InodeListStore.get(this.props.inode.id));
    }

    onClick() {
        this.visibleDetails = !this.visibleDetails;
        if (this.visibleDetails) {
            InodeListStore.addChangeListener(this.onChange);
            WebtagActionCreators.fetchInode(this.props.inode.id);
        } else {
            InodeListStore.removeChangeListener(this.onChange);
        }
        this.forceUpdate();
    }

    render() {
        const image = `/api/data/${this.props.inode.id}?thumb=250x250`;
        const inode = this.state;
        const onClickBound = this.onClick.bind(this);
        let details = this.visibleDetails ? (
            <InodeDetails id={this.props.inode.id} />
        ) : null;
        const component = (
            <div className="inodeOverview">
                <div className="thumbnail" onMouseOver={onClickBound} onMouseOut={onClickBound}>
                    <img src={image} role="presentation" alt={this.props.inode.id} />
                    {details}
                </div>
            </div>
        );

        return component;
    }
}

InodeOverview.propTypes = {
    inode: React.PropTypes.object.isRequired,
};
