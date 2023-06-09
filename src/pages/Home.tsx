import api from "../services/API";
import { Root } from "../type/SituationTypes";
import { useEffect, useState } from "react";

import Situation from "../components/situation/Situation";

import "../App.css";

const Home = () => {
  const [data, setData] = useState<Root[]>([]);

  const getData = async () => {
    const results = await api.get<Root[]>("situations");
    setData(results.data);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className="box_situation flex flex-wrap items-center justify-center lg:flex-row">
      {data.map(({ situation, _id }) => {
        return (
          <div className="container_situation text-center m-5">
            <Situation _id={_id} situation={situation} />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
