/* eslint-disable no-unused-vars */
import AppRoutes from './components/routes/AppRoutes'
import { useSelector } from 'react-redux'

function App() {
    // const user = useSelector((state) => state.auth.access)
    const user = JSON.parse(localStorage.getItem('user') || null)

    return <AppRoutes user={user} />
}

export default App
