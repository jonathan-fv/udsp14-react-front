import { Root } from '../../types/SituationTypes';
import Answer from './Answer';
import { useState } from 'react';

type Props = {
	situation: Root;
};

const Question = (props: Props) => {
	const [currentQuestion, setCurrentQuestion] = useState<string>();

	const { situation } = props;

	const onClick = (answerTarget: string) => {
		setCurrentQuestion(answerTarget);
	};

	return (
		<div className="question_box">
			{situation.flow.map(({ id, type, label, targets, media }) => {
				return (
					(currentQuestion ? id === currentQuestion : type === 'initial') && (
						<div key={id} className="question_buttons">
							<Answer
								media={media}
								onClick={onClick}
								flow={situation.flow}
								id={id}
								type={type}
								label={label}
								targets={targets}
							/>
						</div>
					)
				);
			})}
		</div>
	);
};

export default Question;
