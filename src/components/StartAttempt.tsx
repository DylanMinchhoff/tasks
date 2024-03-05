import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): JSX.Element {
    const [attemptsLeft, setAttempts] = useState<number>(4);
    const [isTaking, setTaking] = useState<boolean>(false);
    return (
        <div>
            <div>{`You have ${attemptsLeft} attempts left`}</div>
            <Button
                disabled={isTaking || attemptsLeft === 0}
                onClick={() => {
                    setTaking(true);
                    setAttempts(attemptsLeft - 1);
                }}
            >
                Start Quiz
            </Button>
            <Button
                disabled={!isTaking}
                onClick={() => {
                    setTaking(false);
                }}
            >
                Stop Quiz
            </Button>
            <Button
                disabled={isTaking}
                onClick={() => {
                    setAttempts(attemptsLeft + 1);
                }}
            >
                Mulligan
            </Button>
        </div>
    );
}
