import "./CreateSituationForm.css";
import React, {useCallback, useEffect, useState} from "react";

type CreateSituationFormProps = {
    onUpdate: (newStore: { description: string; title: string }) => void;
};
const CreateSituationForm: React.FC<CreateSituationFormProps> = ({ onUpdate }) => {

    const [title, setTitle] = useState('Title');
    const [description, setDescription] = useState('Description');
    useEffect(() => {
        console.log('Title:', title);
    }, [title]);
    useEffect(() => {
        console.log('Description:', description);
    }, [description]);

    const onTitleChange = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = evt.target.value;
        setTitle(newTitle);
        onUpdate({ title: newTitle, description });
    }, [onUpdate, description]);

    const onDescChange = useCallback((evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = evt.target.value;
        setDescription(newDescription);
        onUpdate({ title, description: newDescription });
    }, [onUpdate, title]);

    return (
      <div className={"formSituation dark:bg-gray-900"}>
          <div className={"labelGroup"}>
              <label className={"labelSituation"} htmlFor={"titleSituation"}>Titre de la situation</label>
              <input className={"inputSituation"} id={"titleSituation"} onChange={onTitleChange}/>
          </div>
          <div className={"labelGroup"}>
              <label className={"labelSituation"} htmlFor={"descriptionSituation"}>Description de la situation</label>
              <textarea className={"inputSituation"} id={"descriptionSituation"} onChange={onDescChange}/>
          </div>
          {/*<button type={"button"} className={"buttonSituation"}>Valider</button>*/}
      </div>
    );
}

export default CreateSituationForm;