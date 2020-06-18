import React, { useState, useEffect } from 'react';
import Loading from "components/Loading";
import Gallery from 'react-grid-gallery';
import './styles.scss';

const GalleryComponent = ({ items, ...rest }) => {
    const [loaded, setLoaded] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        calculatedArray(items)
    }, [items]);

    const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {

        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return { width: srcWidth * ratio, height: srcHeight * ratio };
    }

    const getImgSize = (imgSrc) => { // Experimental
        return new Promise((resolve, reject) => {
            let img = new Image()
            img.onload = () => resolve(img)
            img.onerror = reject
            img.src = imgSrc
        })
    }

    const calculateDimensions = (item) => {
        return new Promise((resolve, reject) => {
            getImgSize(item.src)
                .then(img => {
                    let obj = calculateAspectRatioFit(img.width, img.height, 320, 320);
                    resolve({
                        ...item,
                        thumbnailWidth: obj.width,
                        thumbnailHeight: obj.height
                    })
                })
        })


    }

    const calculatedArray = (array) => {
        Promise.all(array.map(item => calculateDimensions(item)))
            .then(result => {
                setImages(result);
                setLoaded(true);
            });
    };

    return <div className="ReactGridGallery__wrap">
        {loaded
            ? <Gallery
                images={images}
                {...rest}
            />
            : null
            // : <Loading centered={false} />
        }
    </div>
};

export default GalleryComponent;