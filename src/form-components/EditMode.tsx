import React, { useState } from "react";
import { Form } from "react-bootstrap";

const RenderText = ({
    name,
    isStudent
}: {
    name: string;
    isStudent: boolean;
}): JSX.Element => {
    //Your Name is a student
    return (
        <>
            <p>{`${name} ${isStudent ? "is" : "is not"} a student`}</p>
        </>
    );
};

export function EditMode(): JSX.Element {
    const [isEditMode, setEditMode] = useState<boolean>(false);
    const [isStudent, setStudent] = useState<boolean>(true);
    const [name, setName] = useState<string>("Your Name");
    return (
        <div>
            <h3>Edit Mode</h3>
            <Form.Check
                type="switch"
                id="is-editMode"
                label="Edit Mode"
                checked={isEditMode}
                onChange={() => setEditMode(!isEditMode)}
            />
            {isEditMode ? (
                <>
                    <Form.Check
                        type="checkbox"
                        id="is-student"
                        label="Student"
                        checked={isStudent}
                        onChange={() => setStudent(!isStudent)}
                    />
                    <Form.Group controlId="formEditor">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                </>
            ) : (
                <RenderText name={name} isStudent={isStudent} />
            )}
        </div>
    );
}
