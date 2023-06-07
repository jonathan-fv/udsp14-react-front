import { Link } from "react-router-dom";
import { SituationType } from "../../type/SituationTypes";



type Props = {
    _id: string;
    situation:  SituationType;
};

const Situation = (props: Props) => {
    const { _id, situation } = props;

    return (
        <Link
            to={"/situation/" + _id}
            className="bg-gray-100 shadow-lg shadow-black-500/50 rounded-md tracking-widest uppercase font-bold w-96 p-5 m-10 text-center link-situation hover:bg-gray-300"
            >
            {situation.title}
        </Link>
    );
};

export default Situation;