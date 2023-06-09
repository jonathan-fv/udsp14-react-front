import SituationFlow from "../components/ManageSituation/SituationFlow";
// ger params from url :id
import { useParams } from 'react-router-dom';

const EditSituationPage = () => {

	const { id } = useParams()

	return (
		<div className='h-[90vh]'>
			{/*<h1 className='text-xl uppercase'>Créer une situation</h1>*/}
			{/*  <CreateSituationForm />*/}
			<SituationFlow situationId={id} />
		</div>
	)
};

export default EditSituationPage;