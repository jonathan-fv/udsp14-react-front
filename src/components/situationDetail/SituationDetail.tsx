import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Root } from "../../types/SituationTypes";

import './SituationDetail.css';

type Props = {
    situation:  Root;
};

const SituationDetail = (props: Props) => {
    const { situation } = props;

    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };

    return(
        <div>
            <div className="flex justify-center items-center">
                <h1 className="p-5 text-4xl uppercase">{situation.situation.title}</h1>
            </div>
            <div className="content-box flex items-center">
                {/* <div className="img-box bg-gray-200 rounded-xl"></div> */}
                <img src={situation.situation.image_path} alt={situation.situation.title} className="img-box rounded-md" />
                <div className="text-box p-1 text-justify">
                <p>
                    {situation.situation.description}
                </p>
                </div>
            </div>

            <div className="cta-box flex justify-center m-10">
                <Link
                to="/audio"
                className="cta-btn rounded-full bg-blue-500 hover:bg-blue-600"
                >
                112
                </Link>
            </div>
            <div>
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
            </div>
        </div>
    );

}

export default SituationDetail;