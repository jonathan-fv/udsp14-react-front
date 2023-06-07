import { get } from '../services/API';
import { Root } from "../type/SituationTypes";
import { useEffect, useState } from "react";

import Situation from '../components/situation/Situation';

import "../App.css"

const Home = () => {
    const [data, setData] = useState<Root[]>([]);

    const getData = async () => {
        const results = await get<Root[]>('http://localhost:8000/situations');
        setData(results)
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(data);

    return (
        <div className="containt flex justify-center">
            <div className="flex flex-wrap justify-center ">
                {data.map(({situation, _id}) => {
                    return(
                        <Situation _id={_id} situation={situation} />
                    );
                })}
            </div>
        </div>
    )
}

export default Home
