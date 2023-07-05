import './SituationPanel.css';
import { useNavigate } from 'react-router-dom';

const SituationPanel = (props: {
	id: string;
	title: string;
	desc: string;
	delete: any;
}) => {
	const navigate = useNavigate();

	return (
		<div className="p-3 bg-white rounded-lg flex flex-col gap-3 w-full h-full">
			<div className="text-center text-2xl font-bold text-[#051949]">
				<p>{props.title}</p>
			</div>
			<div className="h-0.5 bg-[#051949] rounded" /> {/* divider */}
			<div className="panel-description h-full">
				<p>{props.desc}</p>
			</div>
			<div className="flex justify-end gap-3">
				<button
					className="px-3 py-1 bg-[#051949] text-white rounded hover:bg-white hover:text-[#051949] hover:outline hover:outline-[#051949]"
					onClick={() => navigate(`/administration/edit-situation/${props.id}`)}
				>
					Éditer
				</button>
				<button
					className="px-3 py-1 bg-red-600 text-white rounded hover:bg-white hover:text-red-600 hover:outline hover:outline-red-600"
					onClick={props.delete}
				>
					Supprimer
				</button>
			</div>
		</div>
	);
};

export default SituationPanel;
