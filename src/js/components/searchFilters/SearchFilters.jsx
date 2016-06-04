import React from 'react';
import AggregateStore from '../../stores/AggregateStore';
import WebtagActionCreators from '../../actions/WebtagActionCreators';

export default class SearchFilters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: props.defaultSearch,
        };
        this.onChange = this.onChange.bind(this);
        this.filterClicked = this.filterClicked.bind(this);
    }

    componentDidMount() {
        console.log('SearchFilters.componentDidMount');
        WebtagActionCreators.fetchAggregates(this.state.search);
        AggregateStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        console.log('SearchFilters.componentWillUnmount');
        AggregateStore.removeChangeListener(this.onChange);
    }

    onChange() {
        console.log('SearchFilters.onChange');
        console.error(this.state);
        console.error(AggregateStore.getAggregates());
        this.setState({
            aggregates: AggregateStore.getAggregates(),
        });
        console.error(this.state);
    }

    filterClicked(event) {
        const target = event.target;
        const name = target.name;

        if (target.checked) {
            if (!this.state.search[name]) {
                this.state.search[name] = [];
            }
            this.state.search[name].push(target.value);
        } else if (this.state.search[name]) {
            this.state.search[name] = this.state.search[name].filter((t) => t !== target.value)
            if (this.state.search[name].length === 0) {
                this.state.search[name] = undefined;
            }
        }

        this.props.onFilterChange(this.state.search);
    }

    render() {
        console.log('SearchFilters.render');
        const aggregates = this.state.aggregates;
        const currentSearch = this.state.search;
        const filters = [];
        console.warn(this.state);

        if (aggregates) {
            for (const agg in aggregates) {
                filters.push(this.renderAggregateFilter(agg, aggregates[agg], currentSearch));
            }
        }

        return (
            <div id="searchFilters">
                <div className="search-title">
                    <h3>
                        Filters
                    </h3>
                </div>
                <div className="search-body">
                    { filters }
                </div>
            </div>
        );
    }

    renderAggregateFilter(filterName, aggregate, currentSearch) {
        console.log('SearchFilters.renderAggregateFilter');
        console.log(aggregate);
        console.log(currentSearch);
        const name = filterName.replace(/s$/, '');

        const inputs = aggregate.map((a) => {
            const id = `${name}-${a.key}`;
            let checked = currentSearch[name] &&
                            currentSearch[name].indexOf(a.key) !== -1 ? true : false;

            if (a.count===AggregateStore.getTotal()) {
                checked = true;
            }

            console.info(currentSearch[name]);
            console.log(a.key +'='+ checked);

            return (
                <div>
                    <input
                        id={id}
                        name={name}
                        type="checkbox"
                        value={a.key}
                        defaultChecked={checked}
                        onClick={this.filterClicked} />
                    <label for={id}>
                        {a.key}
                        <span className="badge">{a.count}</span>
                    </label>
                </div>);
        });

        return (
            <div>
                <strong>{filterName}</strong>
                {inputs}
            </div>);
    }
}

SearchFilters.propTypes = {
    defaultSearch: React.PropTypes.object.isRequired,
    onFilterChange: React.PropTypes.func,
};

SearchFilters.defaultProps = {
    defaultSearch: {},
    onFilterChange: () => {}
};
