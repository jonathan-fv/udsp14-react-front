import SituationsPanel from '../components/SituationPanel/SituationPanel';
import axios from 'axios';
import { useState, useEffect } from 'react';

const DashboardSituations = () => {
	const [situations, setSituations] = useState(null);

	const baseURL = 'http://localhost:8000/situations';

	useEffect(() => {
		axios.get(baseURL).then((response) => {
			setSituations(response.data);
		});
	}, []);

	const deleteSituation = (id: string) => {
		axios.delete(`${baseURL}/${id}`).then(() => {
			alert('Situations Supprimée!');
			window.location.reload();
		});
	};

	const renderListSituations = (situations: any[]) => {
		return situations.map((situation) => (
			<SituationsPanel
				key={situation._id}
				id={situation._id}
				title={situation.situation.title}
				desc={situation.situation.description}
				delete={() => deleteSituation(situation._id)}
			/>
		));
	};

	if (!situations) return <p>Aucune Situation présente !</p>;

	return (
		<>
			<div className="situations-title">
				<h1>Toutes les Situations</h1>
			</div>
			<div className="situations-container">
				{renderListSituations(situations)}
			</div>
		</>
	);
};

export default DashboardSituations;
