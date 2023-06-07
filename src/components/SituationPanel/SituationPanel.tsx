import "./SituationPanel.css"

const SituationPanel = (props: { title: string; desc: string; delete: any}) => {

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
                    <button className="panel-edit">Edit</button>
                    <button className="panel-delete" onClick={props.delete}>X</button>
                </div>
            </div>
        </>
    );
};

export default SituationPanel;