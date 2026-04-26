import { Provider } from "react-redux";
import store from "../../store/store";
import { ThemeProvider } from "../../contexts/ThemeContext";

const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default AppProviders;
