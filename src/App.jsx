import React, { Component } from "react";

import st from "./App.module.css";
import Searchbar from "./components/Searchbar";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import fetchDataApi from "./services/fetchDataApi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class App extends Component {
  state = {
    gallery: [],
    searchQuery: "",
    page: 1,
    showModal: false,
    showLoader: false,
    showloadMore: false,
    error: null,
    largeImage: {},
  };

  // componentDidMount() {
  //   this.setState({ showLoader: true });
  //   this.fetchGallary();
  // }

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const naxtQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const naxtPage = this.state.page;

    if (prevQuery !== naxtQuery || prevPage !== naxtPage) {
      this.fetchGallary();
    }
  }

  fetchGallary = async () => {
    const { searchQuery, page } = this.state;

    this.setState({ showLoader: true });
    try {
      const data = await fetchDataApi(searchQuery, page);
      const totalPages = Math.ceil(data.totalHits / 12);

      if (data.hits.length === 0) {
        return toast.error("Sorry, we do not have any images for your request");
      }
      if (page === 1) {
        toast.success(`We found ${data.totalHits} images.`);
      }
      if (page === totalPages && page > 1) {
        this.setState({ showloadMore: false });
        toast.info("You've reached the end of search results.");
      }
      if (page < totalPages) {
        this.setState({ showloadMore: true });
      } else {
        this.setState({ showloadMore: false });
      }
      this.setState((prevState) => ({
        gallery: [...prevState.gallery, ...data.hits],
      }));
      this.scrollToDown();
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ showLoader: false });
    }
  };

  scrollToDown = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  handleFormSubmit = (searchQuery) => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.setState({ searchQuery, gallery: [], page: 1 });
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  handleOpenPicture = (largeImage) => {
    this.setState({ largeImage });
    this.toggleModal();
  };

  onLoadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  render() {
    const { error, showLoader, showModal, gallery, largeImage, showloadMore } =
      this.state;
    const { onLoadMore, handleFormSubmit, toggleModal, handleOpenPicture } =
      this;
    return (
      <div className={st.App}>
        <Searchbar onSubmit={handleFormSubmit} />

        {error && <p>{error.message}</p>}

        {gallery.length > 0 && (
          <ImageGallery gallery={gallery} onOpenPicture={handleOpenPicture} />
        )}

        {showLoader && <Loader />}
        {showloadMore && <Button onLoadMore={onLoadMore} />}
        {showModal && (
          <Modal
            largeImage={largeImage.largeImageURL}
            tags={largeImage.tags}
            onClose={toggleModal}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
