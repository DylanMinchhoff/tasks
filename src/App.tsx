import React from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import "./App.css";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">
                UD CISC275 with React Hooks and TypeScript
            </header>
            <h1>Dylan Minchhoff</h1>
            <p>Hello World!</p>
            <Button onClick={() => console.log("Hello World!")}>
                Log Hello World!
            </Button>
            <ul>
                <li>task 1</li>
                <li>task 2</li>
                <li>task 3</li>
            </ul>
            <img src="" alt="alt text img"></img>
            <Container>
                <Row>
                    <Col>
                        <div className="red-rectangle"></div>
                    </Col>
                    <Col>
                        <div className="red-rectangle"></div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
