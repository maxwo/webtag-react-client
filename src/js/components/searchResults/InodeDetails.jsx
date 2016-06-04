import React from 'react';
import ToolTip from 'react-portal-tooltip'
import InodeListStore from '../../stores/InodeListStore';
import WebtagActionCreators from '../../actions/WebtagActionCreators';

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
        InodeListStore.addChangeListener(this.onChange);
        if (this.state.inode === null) {
            WebtagActionCreators.fetchInode(this.props.id);
        }
    }

    componentWillUnmount() {
        console.log('InodeDetails.componentWillUnmount');
        InodeListStore.removeChangeListener(this.onChange);
    }

    onChange() {
        console.log('InodeDetails.onChange');
        const inode = InodeListStore.get(this.props.id);
        this.setState({
            inode,
        });
    }

    render() {
        console.log('InodeDetails.render');
        const id = this.props.id;
        const parentId = `#inode-${id} .thumbnail`;
        let inodeInformations = null;

        if (this.state.inode !== null) {
            inodeInformations = (
                <ToolTip active={true} position="bottom" arrow="center" parent={parentId}>
                    <div>
                        <dl>
                            <dt>Name</dt>
                            <dd>{this.state.inode.file.filename}</dd>
                            <dt>Size</dt>
                            <dd>{this.state.inode.file.size}</dd>
                            <dt>Tags</dt>
                            <dd>{this.state.inode.tags.join(', ')}</dd>
                        </dl>
                    </div>
                </ToolTip>
            );
        }

        return (
            <div>
                {inodeInformations}
            </div>);
    }
}

InodeDetails.propTypes = {
    id: React.PropTypes.string.isRequired,
};
