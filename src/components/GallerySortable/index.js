import React, { useState } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import './styles.scss';

let defaultItems = [1, 2, 3, 4, 5].map((val, index) => ({
    title: 'Item ' + index,
    index: index,
    id: index,
    imageSrc: `/media/exhibition_image_plug_${val}.jpg`
}));

const SortableGallery = () => {
    const [items, setItems] = useState(defaultItems);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        setItems(arrayMove(items, oldIndex, newIndex));
    };

    const SortableItem = SortableElement(({ item }) => (
        <div className="item">
            <div className="inner-item" style={{ backgroundImage: `url(${item.imageSrc})` }} />
        </div>
    ));

    const SortableList = SortableContainer(({ items }) => (
        <div className="container">
            {items.map((item, index) => (
                <SortableItem
                    key={`${item.id}`}
                    index={index}
                    item={item}
                />
            ))}
        </div>
    ));

    return (
        <SortableList
            items={items}
            onSortEnd={onSortEnd}
            axis="xy"
            helperClass="SortableHelper"
        />
    );
};

export default SortableGallery;
