import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

export function ChangeType(): JSX.Element {
    const [type, setType] = useState<QuestionType>("short_answer_question");
    return (
        <div>
            <Button
                onClick={() => {
                    setType(
                        type === "multiple_choice_question"
                            ? "short_answer_question"
                            : "multiple_choice_question"
                    );
                }}
            >
                Change Type
            </Button>
            <div>
                {type === "multiple_choice_question" ? "Multiple choice" : ""}
                {type === "short_answer_question" ? "Short Answer" : ""}
            </div>
        </div>
    );
}
