import Situation from "../components/situation/Situation"
import "../App.css"

const Home = () => {
    return (
        <div className="containt flex justify-center">
            <div className="flex flex-wrap justify-center ">
                <Situation situation={"Situation 1"} />
                <Situation situation={"Situation 1"} />
                <Situation situation={"Situation 1"} />
                <Situation situation={"Situation 1"} />
                <Situation situation={"Situation 1"} />
                <Situation situation={"Situation 1"} />
                <Situation situation={"Situation 1"} />
                <Situation situation={"Situation 1"} />
                <Situation situation={"Situation 1"} />
            </div>
            
        </div>
    )
}

export default Home