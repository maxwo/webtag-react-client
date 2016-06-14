import React from 'react';
import ToolTip from 'react-portal-tooltip';
import OverviewedInodeStore from '../../stores/OverviewedInodeStore';
import InodeStore from '../../stores/InodeStore';
import WebtagActionCreators from '../../actions/WebtagActionCreators';

export default class InodeDetailsTooltip extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inode: null,
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        console.log('InodeDetailsTooltip.componentDidMount');
        InodeStore.addChangeListener(this.onChange);
        OverviewedInodeStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        console.log('InodeDetailsTooltip.componentWillUnmount');
        OverviewedInodeStore.removeChangeListener(this.onChange);
        InodeStore.removeChangeListener(this.onChange);
    }

    onChange() {
        console.log('InodeDetailsTooltip.onChange');

        const bit = OverviewedInodeStore.getOverviewedInode();
        let inode = null;

        if (bit !== null) {
            inode = InodeStore.get(bit.id);

            if (typeof inode === 'undefined') {
                console.log(`Inode ${bit.id} not loaded. Loading...`);
                const fetchInodeBound = WebtagActionCreators.fetchInode.bind(this, bit.id);
                setTimeout(fetchInodeBound, 0);

                inode = null;

            } else {
                this.setState({
                    inode,
                });

            }
        } else {
            this.setState({
                inode: null,
            });
        }

        this.forceUpdate();
    }

    render() {
        console.log('InodeDetailsTooltip.render');
        const active = this.state.inode !== null;
        let inodeInformations = null;
        let parentId = null;
        let div = null;

        if ( this.state.inode !== null && this.state.inode.file ) {
            parentId = `#inode-${this.state.inode.id}`;
            div = (
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
            );
        }

        return (
            <div>
                <ToolTip active={active} position="bottom" arrow="center" parent={parentId}>
                    {div}
                </ToolTip>
            </div>
            );
    }
}
