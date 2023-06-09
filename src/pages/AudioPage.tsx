import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from "../services/API";
import { Root } from "../type/SituationTypes";

import Question from '../components/question/Question';
import "../App.css";

const AudioPage = () => {
  const { id } = useParams();
  //console.log("id = " + id);

  const [data, setData] = useState<Root>();

  const getData = async () => {
    const results = await api.get<Root>(`situations/${id}`);
    setData(results.data);
    //console.log(results);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  // log output of axios api
  //console.log("API id = " + data);

  return (
    <div>
      {data && <Question situation={data} />}
    </div>
  );
};

export default AudioPage;
