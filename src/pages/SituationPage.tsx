import api from "../services/API";
import { Root } from "../types/SituationTypes";
import { useEffect, useState } from "react";
import SituationDetail from "../components/situationDetail/SituationDetail";
import "../App.css";
import { useParams } from "react-router-dom";

const SituationPage = () => {
  const { id } = useParams();

  const [data, setData] = useState<Root>();

  const getData = async () => {
    const results = await api.get<Root>(`situations/${id}`);
    setData(results.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>{data && <SituationDetail situation={data} />}</div>;
};

export default SituationPage;
