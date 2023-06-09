import "./SituationPanel.css"
import { useNavigate } from "react-router-dom";

const SituationPanel = (props: { id: string, title: string; desc: string; delete: any}) => {

    const navigate = useNavigate();

    return (
        <>
            <div className="panel-container">
                <div className="panel-title">
                    <p>{props.title}</p>
                </div>
                <div className="panel-description">
                    <p>{props.desc}</p>
                </div>
                <div className="panel-action">
                    <button className="panel-edit" onClick={()=>navigate(`/administration/edit-situation/${props.id}`)}>Edit</button>
                    <button className="panel-delete" onClick={props.delete}>X</button>
                </div>
            </div>
        </>
    );
};

export default SituationPanel;