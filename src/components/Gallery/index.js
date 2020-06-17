import React, { useState, useEffect } from 'react';
import Gallery from 'react-grid-gallery';
import Container from "components/Layouts/Container";
import Card from "components/Card";
import './styles.scss';

const IMAGES =
    [{
        src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
        caption: "After Rain (Jeshu John - designerspics.com)"
    },
    {
        src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
        caption: "Boats (Jeshu John - designerspics.com)"
    },
    {
        src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
        caption: "Color Pencils (Jeshu John - designerspics.com)"
    },
    {
        src: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8546/28354329294_bb45ba31fa_b.jpg",
        caption: "Red Apples with other Red Fruit (foodiesfeed.com)"
    },
    {
        src: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8890/28897154101_a8f55be225_b.jpg",
        caption: "37H (gratispgraphy.com)"
    },
    {
        src: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
        thumbnail: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
        caption: "8H (gratisography.com)"
    },
    {
        src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
        thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
        caption: "286H (gratisography.com)"
    },
    {
        src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
        caption: "315H (gratisography.com)"
    },
    {
        src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
        caption: "201H (gratisography.com)"
    },
    {
        src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
        thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
        caption: "Big Ben (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8785/28687743710_3580fcb5f0_b.jpg",
        caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
        caption: "Wood Glass (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
        thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
        caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8562/28897228731_ff4447ef5f_b.jpg",
        caption: "Old Barn (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg",
        alt: "Cosmos Flower",
        thumbnail: "https://c2.staticflickr.com/8/7577/28973580825_d8f541ba3f_b.jpg",
        caption: "Cosmos Flower Macro (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
        caption: "Orange Macro (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg",
        thumbnail: "https://c1.staticflickr.com/9/8330/28941240416_71d2a7af8e_b.jpg",
        caption: "Surfer Sunset (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
        thumbnail: "https://c1.staticflickr.com/9/8707/28868704912_cba5c6600e_b.jpg",
        caption: "Man on BMX (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
        thumbnail: "https://c4.staticflickr.com/9/8578/28357117603_97a8233cf5_b.jpg",
        caption: "Ropeman - Thailand (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg",
        thumbnail: "https://c4.staticflickr.com/8/7476/28973628875_069e938525_b.jpg",
        caption: "Time to Think (Tom Eversley - isorepublic.com)"
    },
    {
        src: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8593/28357129133_f04c73bf1e_b.jpg",
        caption: "Untitled (Jan Vasek - jeshoots.com)"
    },
    {
        src: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg",
        thumbnail: "https://c6.staticflickr.com/9/8893/28897116141_641b88e342_b.jpg",
        caption: "Untitled (moveast.me)"
    },
    {
        src: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
        thumbnail: "https://c1.staticflickr.com/9/8056/28354485944_148d6a5fc1_b.jpg",
        caption: "A photo by 贝莉儿 NG. (unsplash.com)"
    },
    {
        src: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg",
        thumbnail: "https://c7.staticflickr.com/9/8824/28868764222_19f3b30773_b.jpg",
        caption: "A photo by Matthew Wiebe. (unsplash.com)"
    }]

const GalleryComponent = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(() => {
        calculatedArray(IMAGES)
    }, []);

    /**
    * Conserve aspect ratio of the original region. Useful when shrinking/enlarging
    * images to fit into a certain area.
    *
    * @param {Number} srcWidth width of source image
    * @param {Number} srcHeight height of source image
    * @param {Number} maxWidth maximum available width
    * @param {Number} maxHeight maximum available height
    * @return {Object} { width, height }
    */
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


    function shuffleArray(array) { // Temp
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return <Container>
        <h3 className="ReactGridGallery__title">Фотогалерея</h3>
        <Card className="ReactGridGallery__wrap">
            {loaded && <Gallery images={images} {...props} />}
        </Card>
    </Container>
};

export default GalleryComponent;