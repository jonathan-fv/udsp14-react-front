import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import API from '../services/API';
import { Root } from '../types/SituationTypes';

import Question from '../components/question/Question';

const SimulationPage = () => {
	const { id } = useParams();

	const [data, setData] = useState<Root>();

	const getData = async () => {
		const results = await API.get<Root>(`situations/${id}`);
		setData(results.data);
	};

	useEffect(() => {
		getData().catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return <div>{data && <Question situation={data} />}</div>;
};

export default SimulationPage;
