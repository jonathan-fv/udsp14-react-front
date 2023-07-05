import { Flow, MediaType } from '../../types/SituationTypes';

type Props = {
	id: string;
	type: string;
	label: string;
	targets: Array<string>;
	flow: Flow[];
	media: MediaType[];
	onClick: (answerTarget: string) => void;
};


const ShowMedia = (props: Props) => {
    const { type, label, targets, flow, media, onClick } = props;
    return(
        <div className="flex flex-col flex-wrap items-center">
			<div className="">
				{flow.map((x) => {
					return (
						<img src={x.label} alt={x.label} />
							//<img src={media.name} alt={media.type}/>
					);
				})}
			</div>

		</div>
    );
}

export default ShowMedia;