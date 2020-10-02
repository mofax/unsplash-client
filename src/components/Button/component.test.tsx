import * as React from "react";

import { Button } from "./component";
import renderer from "react-test-renderer";

describe("<Button>", function () {
    it("renders correctly", () => {
        const tree = renderer.create(<Button></Button>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders spinner correctly", () => {
        const tree = renderer.create(<Button spinning></Button>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
