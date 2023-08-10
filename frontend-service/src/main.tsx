import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from './App';
import './index.css';
import { persistor, store } from './redux/store';
import THEME from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={THEME}>
        <PersistGate persistor={persistor} loading={null}>
          <Provider store={store}>
            <App />
          </Provider>
        </PersistGate>
      </ThemeProvider>
    </LocalizationProvider>
)