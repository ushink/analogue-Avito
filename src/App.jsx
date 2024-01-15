/* eslint-disable no-unused-vars */
import AppRoutes from './components/routes/AppRoutes'
import { useAuthSelector } from './store/slice/auth'

function App() {
    const {access} = useAuthSelector()

    return <AppRoutes user={access} />
}

export default App
