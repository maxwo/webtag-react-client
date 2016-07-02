import React from 'react';
import InodeOverview from './InodeOverview.jsx';
import InodeRow from './InodeRow.jsx';
import InodeImage from './InodeImage.jsx';

export default class InodeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inodes: [],
        };
        this.onClick = this.onClick.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    onClick(inode) {
        console.log('InodeList.onClick');
        if (this.props.onClick) {
            this.props.onClick(inode);
        }
    }

    onMouseEnter(inode) {
        console.log('InodeList.onMouseEnter');
        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(inode);
        }
    }

    onMouseLeave(inode) {
        console.log('InodeList.onMouseLeave');
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(inode);
        }
    }

    computeImageWidth(image, currentHeight) {
        if (typeof image.width === 'undefined') {
            return currentHeight;
        }
        const currentRatio = currentHeight / image.height;
        return currentHeight * image.width / image.height;
    }

    computeWidth(imageList, currentHeight) {
        let width = 0;

        for (const image of imageList) {
            width += this.computeImageWidth(image, currentHeight);
        }
        return width;
    }

    renderLine(inodeList) {
        let currentHeight = 100;
        const totalWidth = 1000;//document.getElementById("searchResults").offsetWidth;
        const images = [];

        // TODO Implement dicotomy
        while (this.computeWidth(inodeList, currentHeight) < totalWidth-4) {
            currentHeight += 1;
        }

        for (const image of inodeList) {
            const width = this.computeImageWidth(image, currentHeight);
            const percent = 100 * width / totalWidth;
            const percentString = `${percent}%`;
            const key = `inode-key-${image.id}`;
            images.push(
                <InodeImage
                    key={key}
                    image={image}
                    width={percentString}
                    onClick={this.onClick}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave} />
            );
        }

        return images;
    }

    renderLines(inodeList) {
        const il = [];
        const inodeLines = [];
        let counter = 0;

        for (let i=0 ; i<inodeList.length ; i++) {
            il.push(inodeList[i])
        }

        while (il.length > 0) {
            const currentInodeList = [];
            for (let i=0 ; i<3 ; i++) {
                if (il.length > 0) {
                    currentInodeList.push(il.pop());
                }
            }
            const lineKey = `row-${counter}`;
            inodeLines.push((
                <div key={lineKey}>
                    {this.renderLine(currentInodeList)}
                </div>));
            counter++;
        }
        return inodeLines;
    }

    render() {
        console.log('InodeList.render');
        const inodes = this.props.inodes;

        return (
            <div>
                { this.renderLines(inodes) }
            </div>);
    }
}

InodeList.propTypes = {
    inodes: React.PropTypes.object.isRequired,
    onMouseEnter: React.PropTypes.function,
    onMouseLeave: React.PropTypes.function,
    onClick: React.PropTypes.function,
};
