import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function ChangeColor(): JSX.Element {
    const colors = [
        "#def1da",
        "#8642e1",
        "#f0ba5e",
        "#e928c5",
        "#08ec3b",
        "#1c4826",
        "#5b7229",
        "#037dbb",
        "#c29b14",
        "#2e0ee2",
        "#7ba0cc",
        "#890568"
    ];
    const [color, setColor] = useState<string>(colors[0]);
    return (
        <div>
            <h3>Change Color</h3>
            {colors.map((c: string) => (
                <Form.Check
                    key={`color-${c}`}
                    inline
                    type="radio"
                    name="colors"
                    onChange={(e) => setColor(e.target.value)}
                    label={<span style={{ backgroundColor: `${c}` }}>{c}</span>}
                    value={c}
                    checked={c === color}
                />
            ))}
            <p>
                You have chossen{" "}
                <span
                    style={{ backgroundColor: `${color}` }}
                    data-testid="colored-box"
                >
                    {color}
                </span>
            </p>
        </div>
    );
}
