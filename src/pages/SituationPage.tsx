import API from '../services/API';
import { Root } from '../types/SituationTypes';
import { useEffect, useState } from 'react';
import SituationDetail from '../components/situationDetail/SituationDetail';
import '../App.css';
import { useParams } from 'react-router-dom';

const SituationPage = () => {
	const { id } = useParams();

	const [data, setData] = useState<Root>();

	const getData = async () => {
		const results = await API.get<Root>(`situations/${id}`);
		setData(results.data);
	};

	useEffect(() => {
		getData().catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <div className="box-situation text-white">{data && <SituationDetail situation={data} />}</div>;
};

export default SituationPage;
