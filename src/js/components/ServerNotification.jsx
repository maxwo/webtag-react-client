import io from 'socket.io-client';
import WebtagActionCreators from '../actions/WebtagActionCreators';

const socket = io();
socket.on('inodeSaved', (inode) => {
    WebtagActionCreators.saveInode(inode);
});
