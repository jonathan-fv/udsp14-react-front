import { get } from '../services/API';
import { Root } from "../type/SituationTypes";
import { useEffect, useState } from "react";
import SituationDetail from '../components/situationDetail/SituationDetail';
import "../App.css";
import { useParams } from 'react-router-dom';

const SituationPage = () => {
  const { id } = useParams()
  //console.log("id = " + id);

  const [data, setData] = useState<Root>();


    const getData = async () => {
        const results = await get<Root>(`http://localhost:8000/situations/${id}`);
        setData(results)
        //console.log(results);
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(data);

  return (
    <div>

      {data && <SituationDetail situation={data} />}

    </div>
  );
};

export default SituationPage;
