import { Link } from "react-router-dom"

type props = {
    situation: string;
}


const Situation = ({ situation }: props) => {
    return (
        <Link to="/" className="bg-gray-100 shadow-lg shadow-black-500/50 rounded-md tracking-widest uppercase font-bold w-96 p-5 m-10 text-center">
            { situation }
        </Link>
        
    )
}

export default Situation