import API from '../services/API';
import { Root } from '../types/SituationTypes';
import { useEffect, useState } from 'react';

import Situation from '../components/situation/Situation';

import '../App.css';

const Home = () => {
	const [data, setData] = useState<Root[]>([]);

	const getData = async () => {
		const results = await API.get<Root[]>('situations');
		setData(results.data);
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="box_situation flex flex-wrap items-center justify-center lg:flex-row">
			<h2 className="text-[2.8rem] m-5 text-[#061849] uppercase font-medium tracking-wide text-center">Liste de toutes les situations</h2>
			{data.map(({ situation, _id }) => {
				return (
					<div className="container_situation text-center m-5" key={_id}>
						<Situation _id={_id} situation={situation} />
					</div>
				);
			})}
		</div>
	);
};

export default Home;
