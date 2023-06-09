import { Flow, MediaType } from '../../type/SituationTypes';
import './Question.css';

type Props = {
    id: number;
    type: string;
    label: string;
    targets: Array<number>;
    flow: Flow[];
    media: MediaType[];
    onClick: (answerTarget: number) => void;
};

const Answer = (props: Props) => {
    const { id, type, label, targets, flow, media, onClick } = props;
    return(
        <div>
                <div className="bg-gray-100 hover:bg-gray-300 shadow-lg shadow-black-500/50 tracking-wide uppercase font-bold text-center p-5 text-sm">
                    <p>{label}</p>
                    <p>{targets}</p>
                    {media.map(media => {
                        return media.type === 'image' && (
                            <img src={media.name} alt={media.type}/>
                        )
                    })}
                </div>
            {
                targets.map( answer => {
                    return (
                        <div className="bg-gray-100 hover:bg-gray-300 shadow-lg shadow-black-500/50 tracking-wide uppercase font-bold text-center p-5 text-sm">
                            {flow.map(x => {
                                return answer === x.id && (
                                    <button onClick={() => onClick(x.targets[0])}>{x.label}</button>
                                )
                            })}
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Answer;