import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function RevealAnswer(): JSX.Element {
    const [isRevealed, changeReveal] = useState<boolean>(false);
    return (
        <>
            <Button
                onClick={() => {
                    changeReveal(!isRevealed);
                }}
            >
                Reveal Answer
            </Button>
            <div>{isRevealed ? "42" : ""}</div>
        </>
    );
}
