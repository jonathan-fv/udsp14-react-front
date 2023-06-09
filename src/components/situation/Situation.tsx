import { Link } from "react-router-dom";
import { SituationType } from "../../types/SituationTypes";
import "./Situation.css";

type Props = {
  _id: string;
  situation: SituationType;
};

const Situation = (props: Props) => {
  const { _id, situation } = props;

  return (
    <Link
      to={"/situation/" + _id}
      className="bg-gray-100 hover:bg-gray-300 shadow-lg shadow-black-500/50 tracking-wide uppercase font-bold text-center p-5 text-sm link-situation"
    >
      {situation.title}
    </Link>
  );
};

export default Situation;
