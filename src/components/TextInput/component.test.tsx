import * as React from "react";

import { TextInput } from "./component";
import renderer from "react-test-renderer";

describe("<TextInput>", function () {
    it("renders correctly", () => {
        const tree = renderer.create(<TextInput />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
