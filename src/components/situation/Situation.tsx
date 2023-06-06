import { Link } from "react-router-dom";
import "./Situation.css";

type Props = {
  situation: string;
};

const Situation = (props: Props) => {
  const { situation } = props;
  return (
    <Link
      to="/situation"
      className="bg-gray-100 shadow-lg shadow-black-500/50 rounded-md tracking-widest uppercase font-bold w-96 p-5 m-10 text-center link-situation hover:bg-gray-300"
    >
      {situation}
    </Link>
  );
};

Situation.defaultProps = {
  situation: "Situation par defaut",
} as Props;

export default Situation;
