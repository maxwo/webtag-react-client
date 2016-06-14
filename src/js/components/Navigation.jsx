import React from 'react';

export default class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.newSearch = this.newSearch.bind(this);
    }

    newSearch(event) {
        event.preventDefault();
        this.props.onFilterChange({
            text: document.getElementById('navigationSearch').value,
        })
        return false;
    }

    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">Brand</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <form className="navbar-form navbar-left" role="search">
                            <div className="form-group">
                                <input type="text" id="navigationSearch" className="form-control" placeholder="Search" />
                                <button type="submit" className="btn btn-default" onClick={this.newSearch}>Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}

Navigation.propTypes = {
    onFilterChange: React.PropTypes.func.isRequired,
};

Navigation.propTypes = {
    onFilterChange: () => {},
};
