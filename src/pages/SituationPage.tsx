import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";

const SituationPage = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  }
  return (
    <div>
      <div className="flex justify-center">
        <button onClick={handleGoBack} className="return-button w-10 bg-gray-200 rounded-full m-4 p-1 text-2xl">
          &#706;
        </button>
        <h1 className="p-5">Situation page</h1>
      </div>
      <div className="img-box bg-gray-200 rounded-xl"></div>
      <div className="text-box p-1 text-justify">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
          optio exercitationem autem, ut ducimus aspernatur fugiat sapiente
          provident eius molestiae praesentium. Molestias atque, cum impedit
          reiciendis et ullam distinctio provident error perspiciatis est alias
          culpa perferendis, obcaecati repellendus! Provident doloremque ea
          delectus perspiciatis, quasi fugiat odio sapiente rem rerum officia!
        </p>
      </div>
      <div className="cta-box flex justify-center mt-10">
        <Link
          to="/audio"
          className="cta-btn rounded-full bg-blue-500 hover:bg-blue-600"
        >
          112
        </Link>
      </div>
    </div>
  );
};

export default SituationPage;
