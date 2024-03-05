import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function CycleHoliday(): JSX.Element {
    const alph: Record<string, string> = {
        "🎄": "🌯", //Christmas
        "🌯": "🦅", //Cinco de Mayo
        "🦅": "🎇", //July 4th
        "🎇": "🩷", //New Year
        "🩷": "🎄" //Valintines Day
    };
    const nextHoli: Record<string, string> = {
        "🎇": "🩷",
        "🩷": "🌯",
        "🌯": "🦅",
        "🦅": "🎄",
        "🎄": "🎇"
    };
    const [currHoliday, setHoliday] = useState("🎇");
    return (
        <>
            <Button
                onClick={() => {
                    setHoliday(alph[currHoliday]);
                }}
            >
                Advance by Alphabet
            </Button>
            <Button
                onClick={() => {
                    setHoliday(nextHoli[currHoliday]);
                }}
            >
                Advance by Year
            </Button>
            <div>{`Holiday: ${currHoliday}`}</div>
        </>
    );
}
