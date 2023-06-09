import { Link } from "react-router-dom";
import { Root } from "../../type/SituationTypes";
import Answer from './Answer';
import { useState } from "react";

type Props = {
    situation: Root;
};

const Question = (props: Props) => {
    const [currentQuestion, setCurrentQuestion] = useState<number>();

    const { situation } = props;

    const onClick = (answerTarget: number) => {
        setCurrentQuestion(answerTarget)
    }

    return (
        <div>
            <h1>question</h1>
            <div className="box_answer lg:flex-row">
                {situation.flow.map(({ id, type, label, targets, media }) => {
                    return (currentQuestion ? id === currentQuestion : type === "initial") && (
                        <div className="container_question text-center m-5">
                            <Answer media={media} onClick={onClick} flow={situation.flow} id={id} type={type} label={label} targets={targets} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Question;