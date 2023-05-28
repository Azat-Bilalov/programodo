import { Routing } from "./routes";
import { store } from "./store";
import { Provider } from "react-redux";

import "./index.css";

const App = () =>
  <Provider store={store}>
    <Routing />
  </Provider>


export default App;
