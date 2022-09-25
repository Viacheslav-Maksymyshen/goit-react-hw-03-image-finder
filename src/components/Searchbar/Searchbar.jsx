import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FcSearch } from "react-icons/fc";
import PropTypes from "prop-types";
import st from "./Searchbar.module.css";

export class Searchbar extends Component {
  state = {
    inputSearch: "",
  };

  handleInputChange = (e) => {
    this.setState({ inputSearch: e.target.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const inputSearch = this.state.inputSearch;
    const { onSubmit } = this.props;
    if (inputSearch.trim() === "") {
      toast.warn("You should to write something to search");
      return;
    }

    onSubmit(inputSearch);
    // this.reset();
  };

  // reset = () => {
  //   this.setState({ inputSearch: "" });
  // };

  render() {
    return (
      <header className={st.Searchbar}>
        <form className={st.SearchForm} onSubmit={this.handleSubmit}>
          <button
            type="submit"
            className={st.SearchForm_button}
            style={{ fontSize: 30 }}
          >
            <FcSearch />
            <span className={st.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={st.SearchForm_input}
            type="text"
            value={this.state.inputSearch}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
        <ToastContainer />
      </header>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
