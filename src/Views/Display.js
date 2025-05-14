import React from "react";
// import { GlobalContext } from "../contexts/GlobalContext";
import {
  // Breadcrumbs,
  // Radio,
  // Checkbox,
  Text
} from "../components/common";

const Home = () => {
  return (
    <div>
      <Text variant="h1" required>H1 Text</Text>
      <Text variant="h2" required>H2 Text</Text>
      <Text variant="h3" required>H3 Text</Text>
      <Text variant="h4" required>H4 Text</Text>
      <Text variant="h5" required>H5 Text</Text>
      <Text variant="h6" required>H6 Text</Text>
      <Text variant="subtitle1" required>subtitle1 Text</Text>
      <Text variant="subtitle2" required>subtitle2 Text</Text>
      <Text variant="body1" required>body1 Text</Text>
      <Text variant="body2" required>body2 Text</Text>
      <Text variant="button" required>button Text</Text>
      <Text variant="caption" required>caption Text</Text>
      <Text variant="overline" required>overline Text</Text>
    </div>
  );
}


export default Home;