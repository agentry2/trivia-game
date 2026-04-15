import React from "react";

export default function QuestionCard({ currentQuestion, answers, timer, onAnswer}) {
    return (
        <div className="questionCard">
            <h2 className="questionText" dangerouslySetInnerHTML={{__html: currentQuestion.question}} />
            

            {answers.map((answer, i) => (
                <button className="answerBtn"
                    key={i}
                    dangerouslySetInnerHTML={{__html: answer}}
                    onClick={() => onAnswer(answer)}
                />
            ))}
            <h3 className="timer">{timer}</h3>
        </div>
    )
}