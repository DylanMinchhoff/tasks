import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function CheckAnswer({
    expectedAnswer
}: {
    expectedAnswer: string;
}): JSX.Element {
    const [ans, updateAns] = useState("");
    return (
        <div>
            <h3>Check Answer</h3>
            <Form.Group controlId="formCheckAnswer">
                <Form.Label>Answer</Form.Label>
                <Form.Control
                    as={"textarea"}
                    rows={4}
                    value={ans}
                    onChange={(e) => updateAns(e.target.value)}
                />
            </Form.Group>
            <p>{ans === expectedAnswer ? "✔️" : "❌"}</p>
        </div>
    );
}
