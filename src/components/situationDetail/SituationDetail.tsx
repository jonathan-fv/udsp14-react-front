import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Root } from "../../types/SituationTypes";

import pls from "../../assets/images/pls-1.jpg";
import "./SituationDetail.css";

type Props = {
  situation: Root;
};

const SituationDetail = (props: Props) => {
  const { situation } = props;

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="box_details">
      <h1 className="text-center uppercase text-xl m-5 font-bold ">
        {situation.situation.title}
      </h1>
      {/* <div className="img-box bg-gray-200 rounded-xl"></div> */}
      {/* <img
          src={situation.situation.image_path}
          alt={situation.situation.title}
          className=""
        /> */}
      <div className="box_details_img flex m-2 flex-col flex-nowrap items-center justify-between sm:flex-row">
        <img
          src={pls}
          alt={situation.situation.title}
          className="rounded-md m-5"
        />
        <p className="text-justify">
          {situation.situation.description}
        </p>
      </div>

      {/* INIT Q-&-A */}
      <div className="bg-cyan-400 hover:bg-cyan-700 rounded-full flex justify-center text-4xl m-10 button_situation">
        <Link to={"/audio/" + situation._id}>112</Link>
      </div>
      {/* RETURN TO THE 
      LAST PAGE */}
      {/* <div>
        <button
          onClick={handleGoBack}
          className="return-button bg-gray-200 rounded-full m-4 text-2xl flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
          Accueil
        </button>
      </div> */}
    </div>
  );
};

export default SituationDetail;
