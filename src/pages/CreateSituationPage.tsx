import SituationFlow from "../components/ManageSituation/SituationFlow";
import SituationForm from "../components/ManageSituation/Form/SituationForm";

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