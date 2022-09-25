import st from "./Button.module.css";
import PropTypes from "prop-types";

export default function LoadMore({ onLoadMore }) {
  return (
    <div className="wrapper">
      <button className={st.Button} type="button" onClick={onLoadMore}>
        Load More
      </button>
    </div>
  );
}

LoadMore.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
