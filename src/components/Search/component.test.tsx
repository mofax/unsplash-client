/**
 * @jest-environment jsdom
 */

import * as React from "react";

import { ImageSearch } from "./component";
import renderer from "react-test-renderer";

describe("<Search />", function () {
    it("renders correctly", () => {
        const tree = renderer
            .create(<ImageSearch collections={[]} collapsed={false} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
