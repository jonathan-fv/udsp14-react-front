import SituationsPanel from '../components/SituationPanel/SituationPanel';
import axios from 'axios';
import { useState, useEffect } from 'react';
import API from '../services/API';

const DashboardSituations = () => {
	const [situations, setSituations] = useState<any[]>([]);

	useEffect(() => {
		API.get('situations')
			.then((res) => {
				setSituations(res.data);
			})
			.catch((e) => console.error(e));
	}, []);

	const deleteSituation = (id: string) => {
		API.delete(`situations/${id}`)
			.then(() => {
				alert('Situations Supprimée!');
				window.location.reload();
			})
			.catch((e) => console.error(e));
	};

	return (
		<div className="container mx-auto px-4 h-[80vh]">
			<h1 className="text-4xl font-bold text-center my-5 text-white">
				Liste des situations
			</h1>
			<div className="h-0.5 bg-white rounded-lg mb-10" /> {/* divider */}
			{situations && situations.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3 justify-items-center overflow-y-scroll h-fit max-h-[70vh]">
					{situations.map((situation) => (
						<SituationsPanel
							key={situation._id}
							id={situation._id}
							title={situation.situation.title}
							desc={situation.situation.description}
							delete={() => deleteSituation(situation._id)}
						/>
					))}
				</div>
			) : (
				<>
					<p className="text-center text-xl mx-auto font-bold mb-10">
						Aucune situation n'a été trouvée.
					</p>
					<p className="text-center text-xl mx-auto font-bold">
						Vous pouvez en créer une en cliquant
						<br />
						sur le bouton &nbsp;
						<span className="text-amber-600 font-bold underline underline-offset-4">
							"Nouvelle situation"
						</span>
						&nbsp; situé dans la barre de navigation.
					</p>
				</>
			)}
		</div>
	);
};

export default DashboardSituations;
