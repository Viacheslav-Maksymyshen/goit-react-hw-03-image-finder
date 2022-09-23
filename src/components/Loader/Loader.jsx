import { Dna } from "react-loader-spinner";
import st from "./Loader.module.css";

export default function Preloader() {
  return (
    <div className={st.Loader}>
      <Dna
        visible={true}
        height="300"
        width="300"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}
