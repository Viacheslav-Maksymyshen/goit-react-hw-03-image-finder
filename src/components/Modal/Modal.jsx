import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import st from "./Modal.module.css";

const rootModal = document.querySelector("#rootModal");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImage, tags } = this.props;
    return createPortal(
      <div className={st.Overlay} onClick={this.handleOverlayClick}>
        <div className={st.Modal}>
          {this.props.children}
          <img src={largeImage} alt={tags} />
        </div>
      </div>,
      rootModal
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;
