import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from "../services/API";
import { Root } from "../types/SituationTypes";

import Question from '../components/question/Question';
import "../App.css";

const AudioPage = () => {
  const { id } = useParams();

  const [data, setData] = useState<Root>();

  const getData = async () => {
    const results = await api.get<Root>(`situations/${id}`);
    setData(results.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {data && <Question situation={data} />}
    </div>
  );
};

export default AudioPage;
