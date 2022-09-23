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
  picture: PropTypes.object,
  onOpenPicture: PropTypes.func,
};

export default ImageGalleryItem;
