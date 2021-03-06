import 'react-native-gesture-handler'
import Navigation from './src/navigation/Navigation';
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import Stack from './authDemo/Stack';
export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

