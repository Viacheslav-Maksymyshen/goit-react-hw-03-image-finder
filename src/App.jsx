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
    error: null,
    largeImage: {},
    total: 0,
  };

  // componentDidMount() {
  //   this.setState({ showLoader: true });
  //   this.fetchGallary();
  // }

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const naxtQuery = this.state.searchQuery;
    if (prevQuery !== naxtQuery) {
      this.fetchGallary();
    }
  }

  fetchGallary = async () => {
    const { searchQuery, page } = this.state;
    const perPage = 12;
    this.setState({ showLoader: true });
    try {
      const data = await fetchDataApi(searchQuery, page);
      const totalPages = Math.ceil(data.totalHits / perPage);

      if (data.hits.length === 0) {
        return toast.error("Sorry, we do not have any images for your request");
      }
      if (page === 1) {
        toast.success(`We found ${data.totalHits} images.`);
      }
      if (page === totalPages) {
        toast.info("You've reached the end of search results.");
      }
      this.setState((prevState) => ({
        gallery: [...prevState.gallery, ...data.hits],
        page: prevState.page + 1,
        total: data.total,
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

  showLoadMore = () => {
    const { total, page } = this.state;
    return Math.ceil(total / 12) !== page - 1;
  };

  render() {
    const { error, showLoader, showModal, gallery, largeImage } = this.state;
    const showLoadMore = this.showLoadMore();
    return (
      <div className={st.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {error && <p>{error.message}</p>}

        {gallery.length > 0 && (
          <ImageGallery
            gallery={gallery}
            onOpenPicture={this.handleOpenPicture}
          />
        )}

        {showLoader && <Loader />}

        {gallery.length > 0 && !showLoader && showLoadMore && (
          <Button onLoadMore={this.fetchGallary} />
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImage.largeImageURL} alt={largeImage.tags} />
          </Modal>
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
