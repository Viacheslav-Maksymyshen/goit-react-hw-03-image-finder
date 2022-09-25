import st from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";

function ImageGallery({ gallery, onOpenPicture }) {
  return (
    <ul className={st.ImageGallery}>
      {gallery.map((picture) => (
        <ImageGalleryItem
          key={picture.id}
          picture={picture}
          onOpenPicture={onOpenPicture}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  onOpenPicture: PropTypes.func.isRequired,
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};

export default ImageGallery;
