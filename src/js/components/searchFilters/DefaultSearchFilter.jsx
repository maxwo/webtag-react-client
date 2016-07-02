import React from 'react';
import AggregateStore from '../../stores/AggregateStore';
import WebtagActionCreators from '../../actions/WebtagActionCreators';

export default class DefaultSearchFilter extends React.Component {

    isChecked(search, key, value) {
        if (!search[key]) {
            return false;
        }
        return search[key].filter((f) => {
            return f===value;
        }).length > 0;
    }

}
