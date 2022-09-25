import PropTypes from "prop-types";

import st from "./ImageGalleryItem.module.css";

function ImageGalleryItem({ picture, onOpenPicture }) {
  return (
    <li
      className={st.ImageGalleryItem}
      onClick={() => {
        onOpenPicture(picture);
      }}
    >
      <img
        src={picture.webformatURL}
        alt={picture.tags}
        className={st.ImageGalleryItem_image}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  onOpenPicture: PropTypes.func.isRequired,
  picture: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
