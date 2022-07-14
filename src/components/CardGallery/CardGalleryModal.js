import React, {memo} from "react";
import Slider from "react-slick";
import Modal from "../Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardGalleryModal = ({images, activeIndex, isOpen, onClose}) => {

    return (
        <Modal
            className="card-gallery__modal"
            showModal={isOpen}
            handleClose={onClose}
            withCloseBtn={true}
        >
            {isOpen &&
                <Slider
                    initialSlide={activeIndex}
                    infinite={true}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    nextArrow={<img className="slick-next" src="/static/icons/chevron_right.svg" alt="next"/>}
                    prevArrow={<img className="slick-prev" src="/static/icons/chevron_left.svg" alt="prev"/>}
                    touchThreshold={20}
                    adaptiveHeight={true}
                    lazyLoad="progressive"
                >
                    {images.map((item, i) =>
                        <img key={i} className="card-gallery__modal-img" src={item.src} alt="" loading="eager"/>
                    )}
                </Slider>
            }
        </Modal>
    )
};

export default memo(CardGalleryModal);