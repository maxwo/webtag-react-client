import React from 'react';
import AggregateStore from '../../stores/AggregateStore';
import WebtagActionCreators from '../../actions/WebtagActionCreators';
import DefaultSearchFilter from './DefaultSearchFilter.jsx';

export default class DateSearchFilter extends DefaultSearchFilter {

    renderDays(search, aggregates, date, month) {
        console.log('DateSearchFilter.renderDays');

        const inputName = `${date}_day`;
        const days = [];
        const source = aggregates[`${date}_days`].filter((d) => {
            return d.key.startsWith(month)
        });
        for (const day of source) {
            const d = day.key;
            const checked = this.isChecked(search, inputName, d);
            days.push((
                <li key={d}>
                    <input type="checkbox" name={inputName} value={d} checked={checked} />
                    {d.substr(6)}
                    <span className="badge">{day.count}</span>
                </li>
            ));
        }
        return days;

    }

    renderMonths(search, aggregates, date, year) {
        console.log('DateSearchFilter.renderMonths');

        const inputName = `${date}_month`;
        const months = [];
        const source = aggregates[`${date}_months`].filter((m) => {
            return m.key.startsWith(year)
        });
        for (const month of source) {
            const m = month.key;
            const days = this.renderDays(search, aggregates, date, m);
            const checked = this.isChecked(search, inputName, m);
            months.push((
                <li key={m}>
                    <input type="checkbox" name={inputName} value={m} checked={checked} />
                    {m.substr(4)}
                    <span className="badge">{month.count}</span>
                    <ul>
                        {days}
                    </ul>
                </li>
            ));
        }
        return months;
    }

    renderYears(search, aggregates, date) {
        console.log('DateSearchFilter.renderYears');

        const inputName = `${date}_year`;
        const years = [];
        if (aggregates) {
            for (const year of aggregates[`${date}_years`]) {
                const y = year.key;
                const months = this.renderMonths(search, aggregates, date, y);
                const checked = this.isChecked(search, inputName, y);
                console.warn(search);
                years.push((
                    <li key={y}>
                        <input type="checkbox" name={inputName} value={y} checked={checked} />
                        {y}
                        <span className="badge">{year.count}</span>
                        <ul>
                            {months}
                        </ul>
                    </li>
                ))
            }
        }

        return years;
    }

    render() {
        console.error('DateSearchFilter.render');
        console.log(this.props);

        const years = this.renderYears(this.props.search, this.props.aggregates, this.props.date);

        return (
            <div>
                ***{this.props.date}***
                <ul>
                    { years }
                </ul>
            </div>
        );
    }

}

DateSearchFilter.propTypes = {
    search: React.PropTypes.object.isRequired,
    aggregates: React.PropTypes.object.isRequired,
    date: React.PropTypes.string.isRequired,
    onFilterChange: React.PropTypes.func.isRequired,
};
