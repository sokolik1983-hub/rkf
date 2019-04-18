import React, {PureComponent} from 'react'
import './styles.scss'

const Item = ({image}) =>
    <div style={{backgroundImage: `url(${image})`}} className="gallery-item"/>;

export default class Gallery extends PureComponent {
    static defaultProps = {
        items: []
    };


    splitItems = (items = []) => {
        const itemsLength = items.length;
        if (itemsLength > 3) {
            const firstIndexAfterMiddle = itemsLength / 2 + 1;
            const firstRow = items.slice(0, firstIndexAfterMiddle);
            const secondRow = items.slice(firstIndexAfterMiddle, itemsLength);
            return {firstRow, secondRow}
        }
        return {firstRow: items, secondRow: null}

    };

    render() {

        const {firstRow, secondRow} = this.splitItems(this.props.items)
        return secondRow === null ?
            (
                <div className="gallery">
                    {firstRow.map(galleryItem => <Item key={galleryItem.id} {...galleryItem}/>)}
                </div>
            )
            :
            (
                <div className="gallery">
                    <div className="gallery__first-row">
                        {firstRow.map(galleryItem => <Item key={galleryItem.id} {...galleryItem}/>)}
                    </div>
                    <div className="gallery__second-row">
                        {secondRow.map(galleryItem => <Item key={galleryItem.id} {...galleryItem}/>)}
                    </div>
                </div>
            )
    }
}