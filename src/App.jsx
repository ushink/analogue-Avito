// import { useSelector } from 'react-redux'
import AppRoutes from './components/routes/AppRoutes'

function App() {
    // const user = useSelector((state) => state.auth.access)
    const user = JSON.parse(localStorage.getItem('auth') || '{}')
    console.log(user)

    return <AppRoutes user={user} />
}

export default App
