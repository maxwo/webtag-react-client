import React from 'react';
import InodeOverview from './InodeOverview.jsx';
import WebtagActionCreators from '../../actions/WebtagActionCreators';

export default class InodeImage extends React.Component {

    constructor(props) {
        super(props);

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this); 
    }

    onMouseEnter(event) {
        event.preventDefault();
        console.log('InodeImage.onMouseEnter');
        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(this.props.image);
        }
    }

    onMouseLeave(event) {
        event.preventDefault();
        console.log('InodeImage.onMouseLeave');
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(this.props.image);
        }
    }

    onClick(event) {
        event.preventDefault();
        console.log('InodeImage.onClick');
        if (this.props.onClick) {
            this.props.onClick(this.props.image);
        }
    }

    render() {
        console.log('InodeImage.render');
        const image = this.props.image;
        const width = this.props.width;
        const url = `/api/data/${image.id}?thumb=300x300`;
        const id = `inode-${image.id}`;

        return (
            <div id={id} className="imageContainer" style={{
                width,
            }}>
                <a href="#"
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    onClick={this.onClick}>
                    <img
                        src={url}
                        role='presentation'
                        style={{
                            width: '100%',
                        }} />
                </a>
            </div>);
    }
}

InodeImage.propTypes = {
    image: React.PropTypes.object.isRequired,
    width: React.PropTypes.string.isRequired,
    onMouseEnter: React.PropTypes.function,
    onMouseLeave: React.PropTypes.function,
    onClick: React.PropTypes.function,
};
