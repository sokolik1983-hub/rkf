import React, {memo, useCallback, useState} from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CardGalleryModal from "./CardGalleryModal";
import "./index.scss";


const CardGallery = ({images}) => {
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const srcset = useCallback((image, size, rows = 1, cols = 1) => {
        return {
            src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${size * cols}&h=${
                size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
        };
    }, []);

    const modifiedImages = images.map((img, i, arr) => {
        let cols = 1;
        let rows = 1;

        if(arr.length === 4 && (i === 0 || i === 1)) {
            cols = 2;
            if (i === 0) {
                rows = 2;
            }
        } else

        if(arr.length !== 1 && arr.length !== 5 && i === 0) {
            cols = 3;
            rows = 2;
        } else  if(arr.length === 2 && i === 1) {
            cols = 3;
            rows = 2;
        } else if (arr.length === 3 && (i === 1||i === 2)) {
            cols = 3;
            rows = 1;
        } else if (arr.length === 1) {
            cols = 6;
            rows = 2;
        } else if (arr.length === 5) {
            if (i === 0 || i === 1) {
                cols = 3;
                rows = 1;
            } else {
                cols = 2;
                rows = 1;
            }
        }

        return {
            ...img,
            cols,
            rows
        }
    });

    return (
        <div className="card-gallery">
            <ImageList
                variant="quilted"
                cols={images.length !== 4 ? 6 : 4}
                // rowHeight={220}
                gap={2}
            >
                {modifiedImages.map((item, i) =>
                    <ImageListItem key={i} cols={item.cols || 1} rows={item.rows || 1}>
                        <img
                            {...srcset(item.thumbnail, 150, item.rows, item.cols)}
                            alt=""
                            loading="lazy"
                            onClick={() => {
                                setActiveImgIndex(i);
                                setIsModalOpen(true);
                            }}
                        />
                    </ImageListItem>
                )}
            </ImageList>
            <CardGalleryModal
                images={images}
                activeIndex={activeImgIndex}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default memo(CardGallery);