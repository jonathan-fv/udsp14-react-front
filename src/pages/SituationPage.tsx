import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";
import imgPls from "../assets/images/pls-1.jpg";

const SituationPage = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <h1 className="p-5 text-4xl uppercase">Situation page</h1>
      </div>
      <div className="content-box flex items-center">
        {/* <div className="img-box bg-gray-200 rounded-xl"></div> */}
        <img src={imgPls} alt="pls" className="img-box rounded-md" />
        <div className="text-box p-1 text-justify">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto,
            modi. Quae consequuntur laudantium tempora. Possimus necessitatibus
            rem quo consectetur non sapiente iste ab deserunt corporis natus
            quis officiis deleniti odio itaque repellendus, dolorum quibusdam
            placeat ducimus. Suscipit, quibusdam ex? Suscipit ullam delectus
            alias magnam consequatur corporis numquam, eaque molestias rem quae
            totam aspernatur quas impedit commodi animi nulla minima perferendis
            facere! Adipisci quisquam atque repellat vitae rerum iure quo
            accusantium ea maxime similique aut, dignissimos dolorum! Eaque
            quidem, fugit qui reprehenderit ab quis, sit doloribus eos cumque
            illo tempora saepe illum reiciendis quaerat praesentium pariatur hic
            cum velit blanditiis explicabo.
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
};

export default SituationPage;
