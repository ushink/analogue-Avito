import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import AppRoutes from './components/routes/AppRoutes'
import store from './store/store'

function App() {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </Provider>
        </>
    )
}

export default App
