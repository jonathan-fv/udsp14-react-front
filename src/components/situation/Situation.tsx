import { Link } from 'react-router-dom';
import { SituationType } from '../../types/SituationTypes';
import './Situation.css';

type Props = {
	_id: string;
	situation: SituationType;
};

const Situation = (props: Props) => {
	const { _id, situation } = props;

	return (
			<Link
			to={'/situation/' + _id}
			className="link-situation"
			>
				{situation.title}
			</Link>
	);
};

export default Situation;
