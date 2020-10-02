import * as React from "react";
import * as ReactDOM from "react-dom";

import { HomePage } from "./pages/HomePage/component";

class App extends React.Component {
    render() {
        return <HomePage />;
    }
}

const elem = document.getElementById("main");
ReactDOM.render(<App />, elem);
