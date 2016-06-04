import React from 'react';
import InodeListStore from '../../stores/InodeListStore';
import InodeOverview from './InodeOverview.jsx';
import WebtagActionCreators from '../../actions/WebtagActionCreators';

export default class InodeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inodes: [],
        };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        console.log('InodeList.componentDidMount');
        WebtagActionCreators.searchInodes();
        InodeListStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        console.log('InodeList.componentWillUnmount');
        InodeListStore.removeChangeListener(this.onChange);
    }

    onChange() {
        console.log('InodeList._onChange');
        this.setState({
            inodes: InodeListStore.getAll(),
        });
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
            const w = this.computeImageWidth(image, currentHeight);
            width += w;
        }

        return width;
    }

    renderLine(inodeList) {
        let currentHeight = 1000;
        const totalWidth = 1000;//document.getElementById("searchResults").offsetWidth;
        const images = [];
        while (this.computeWidth(inodeList, currentHeight) > totalWidth) {
            currentHeight -= 10;
        }
        for (const image of inodeList) {
            console.warn(image);
            const width = this.computeImageWidth(image, currentHeight);
            const percent = 100 * width / totalWidth;
            const percentString = `${percent}%`;
            const url = `/api/data/${image.id}?thumb=500x500`;
            images.push(
                <img src={url} width={percentString} />
            );
        }
        return images;
    }

    renderLines(inodeList) {
        const inodeLines = [];
        let counter = 0;
        while (inodeList.length > 0) {
            const currentInodeList = [];
            for (let i=0 ; i<3 ; i++) {
                if (inodeList.length > 0) {
                    currentInodeList.push(inodeList.pop());
                }
            }
            const lineKey = `row-${counter}`;
            inodeLines.push((
                <div key={lineKey}>
                    {this.renderLine(currentInodeList)}
                </div>));
            counter++;
        }
        console.log(inodeLines);
        return inodeLines;
    }

    render() {
        console.log('InodeList.render');
        const inodes = this.state.inodes;

        return (
            <div>
                { this.renderLines(inodes) }
            </div>);

        return (
            <div className="searchResults">
                { inodes.map((inode) => {
                    return (
                        <InodeOverview key={inode.id} inode={inode} />);
                }) }
            </div>);
    }
}

InodeList.propTypes = {
    defaultSearch: React.PropTypes.object.isRequired,
};
InodeList.defaultProps = {
    defaultSearch: {},
};
