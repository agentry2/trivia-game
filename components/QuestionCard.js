import React from "react";
export default function QuestionCard({ currentQuestion, answers = [], timer, onAnswer }) {
    if (!currentQuestion) {
        return <p>Loading question...</p>;
    }

    return (
        <div className="questionCard">
            <h2
                className="questionText"
                dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
            />

            {answers.length > 0 ? (
                answers.map((answer, i) => (
                    <button
                        className="answerBtn"
                        key={i}
                        dangerouslySetInnerHTML={{ __html: answer }}
                        onClick={() => onAnswer(answer)}
                    />
                ))
            ) : (
                <p>Loading answers...</p>
            )}

            <h3 className="timer">{timer}</h3>
        </div>
    );
}