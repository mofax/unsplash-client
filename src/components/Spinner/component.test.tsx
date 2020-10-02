import * as React from "react";

import { Spinner } from "./component";
import renderer from "react-test-renderer";

describe("<Spinner>", function () {
    it("renders correctly", () => {
        const tree = renderer.create(<Spinner />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders dark correctly", () => {
        const tree = renderer.create(<Spinner />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders dimensions correctly", () => {
        const tree = renderer
            .create(<Spinner height={30} width={30} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
