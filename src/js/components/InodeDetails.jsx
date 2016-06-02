import React from 'react';
import AggregateStore from '../stores/AggregateStore';
import WebtagActionCreators from '../actions/WebtagActionCreators';

export default class InodeDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inode: null,
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        console.log('InodeDetails.componentDidMount');
        AggregateStore.addChangeListener(this.onChange);
        if (this.state.inode === null) {
            WebtagActionCreators.fetchInode(this.props.id)
        }
    }

    componentWillUnmount() {
        console.log('InodeDetails.componentWillUnmount');
        AggregateStore.removeChangeListener(this.onChange);
    }

    onChange() {
        console.log('InodeDetails.onChange');
        this.setState({
            inode: InodeDetails.get(this.props.id),
        });
        alert(this.state.inode);
    }

    render() {
        console.log('InodeDetails.render');
        return (
            <div>
                coucou
            </div>
        )
    }
}

InodeDetails.propTypes = {
    id: React.PropTypes.string.isRequired,
};
