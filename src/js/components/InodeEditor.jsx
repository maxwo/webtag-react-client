import React from 'react';
import SkyLight from 'react-skylight';
import EditedInodeStore from '../stores/EditedInodeStore';
import InodeStore from '../stores/InodeStore';
import WebtagActionCreators from '../actions/WebtagActionCreators';
import InfiniteCalendar from 'react-infinite-calendar';

export default class InodeEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inode: props.inode,
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        console.log('InodeEditor.componentDidMount');
        InodeStore.addChangeListener(this.onChange);
        EditedInodeStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        console.log('InodeEditor.componentWillUnmount');
        EditedInodeStore.removeChangeListener(this.onChange);
        InodeStore.removeChangeListener(this.onChange);
    }

    onClose() {
        console.log('InodeEditor.onClose');
        WebtagActionCreators.editInode(null);
    }

    onChange() {
        console.log('InodeEditor.onChange');

        const bit = EditedInodeStore.getEditedInode();
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
                this.refs.editInodeDialog.show();

            }
        } else {
            this.setState({
                inode: null,
            });
        }

        this.forceUpdate();
    }

    render() {
        console.log('InodeEditor.render');
        const id = this.state.inode ? this.state.inode.id : '';
        const fileName = this.state.inode ? this.state.inode.file.filename : '';
        const url = `/api/data/${id}`;
        const title = `File ${fileName}`;

        return (
            <div>
                <SkyLight
                    hideOnOverlayClicked={true}
                    dialogStyles={{
                        'width': '800px',
                        'height': '600px',
                        'margin-top': '-250px',
                    }}
                    title={title}
                    ref="editInodeDialog"
                    afterClose={this.onClose}>

                    <div className="row">

                        <div className="col-md-6">
                            <InfiniteCalendar
                                width="100%"
                                height={300} />
                        </div>

                        <div className="col-md-6">
                            <div>{id}</div>
                            <div>{this.state.inode ? this.state.inode.file.filename : ''}</div>
                            <div>{this.state.inode ? this.state.inode.documentDate : ''}</div>
                            <div>{this.state.inode ? this.state.inode.tags : ''}</div>
                        </div>

                    </div>

                </SkyLight>
            </div>
            );
    }
}
