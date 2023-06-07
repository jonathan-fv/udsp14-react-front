import Situation from "../components/situation/Situation"
import "../App.css"

import data from '../data/data.json';

const Home = () => {
    const listItems = data.map(item => 
        <Situation buttonId={item.id} situation={item.title} />
    );
    return (
        <div className="containt flex justify-center">
            <div className="flex flex-wrap justify-center ">
                {listItems}
            </div>
        </div>
    )
}

export default Home