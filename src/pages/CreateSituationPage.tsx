import SituationFlow from "../components/CreateSituation/SituationFlow";
import CreateSituationForm from "../components/CreateSituation/CreateSituationForm";

const CreateSituationPage = () => {
  return (
    <div className='h-[90vh]'>
      {/*<h1 className='text-xl uppercase'>Créer une situation</h1>*/}
      {/*  <CreateSituationForm />*/}
      <SituationFlow />
    </div>
  )
};

export default CreateSituationPage;