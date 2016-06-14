import React from 'react';
import InodeListStore from '../../stores/SearchResultStore';
import InodeOverview from './InodeOverview.jsx';
import WebtagActionCreators from '../../actions/WebtagActionCreators';

export default class InodeRow extends React.Component {

    computeImageWidth(image, currentHeight) {
        if (typeof image.width === 'undefined') {
            return currentHeight;
        }
        const currentRatio = currentHeight / image.height;
        return currentHeight * image.width / image.height;
    }

    computeTotalWidth(inodeList) {
        return inodeList.reduce((l, r) => l + r);
    }

    computePercentWidth(imageWidth, totalWidth) {
        const percent = 100 * width / totalWidth;
        return percentString = `${percent}%`;
    }

    renderLine(inodeList) {
        const totalWidth = computeTotalWidth(inodeList);
        for (const image of inodeList) {
            const percentWidth = this.computePercentWidth(image.width, totalWidth);
            const key = `inode-key-${image.id}`;
            images.push(
                <InodeImage key={key} image={image} width={percentString} />
            );
        }
        return images;
    }

    render() {
        console.log('InodeList.render');
        const inodes = this.props.inodes;

        return (
            <div>
                { this.renderLine(inodes) }
            </div>);
    }
}

InodeRow.propTypes = {
    inodes: React.PropTypes.array.isRequired,
};
