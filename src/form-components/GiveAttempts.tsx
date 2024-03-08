import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export function GiveAttempts(): JSX.Element {
    const [reqAttempts, setReqAttempts] = useState<number>(0);
    const [attempts, setAttempts] = useState(3);
    return (
        <div>
            <h3>Give Attempts</h3>
            <h6>You have {attempts} number of attempts remaining</h6>
            <Form.Group controlId="formAttempts">
                <Form.Label>Request Attempts</Form.Label>
                <Form.Control
                    type="number"
                    value={reqAttempts}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setReqAttempts(
                            Number.isNaN(parseInt(event.target.value))
                                ? 0
                                : parseInt(event.target.value)
                        )
                    }
                />
            </Form.Group>
            <Button
                disabled={attempts <= 0}
                onClick={() => setAttempts(attempts - 1)}
            >
                Use
            </Button>
            <Button onClick={() => setAttempts(attempts + reqAttempts)}>
                gain
            </Button>
        </div>
    );
}
