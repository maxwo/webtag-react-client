import $ from 'jquery';
import WebtagActionCreators from '../actions/WebtagActionCreators';

$.ajaxSettings.traditional = true;

export function searchInodes(filters = {}) {
    return $
        .getJSON('/api/inode', filters)
        .then((inodes) => {
            const result = inodes.documents;
            result.total = inodes.total;
            WebtagActionCreators.completeInodeSearch(filters, result);
        });
}

export function fetchInode(id) {
    return $
        .getJSON(`/api/inode/${id}`)
        .then((inode) => {
            WebtagActionCreators.completeInodeFetch(inode);
        });
}

export function fetchAggregates(filters = {}) {
    return $
        .getJSON('/api/aggregates', filters)
        .then((aggregates) => {
            WebtagActionCreators.completeAggregatesFetch(filters, aggregates);
        });
}
