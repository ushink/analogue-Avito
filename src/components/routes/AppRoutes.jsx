import { Route, Routes } from 'react-router-dom'
import { publicRoutes, privateRoutes } from '../../routes/routes'
import ProtectedRoute from './ProtectedRoute'

function AppRoutes({ user }) {
    return (
        <Routes>
            <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
                {privateRoutes.map((r) => (
                    <Route key={r.path} element={r.element} path={r.path} />
                ))}
            </Route>
            <Route>
                {publicRoutes.map((r) => (
                    <Route key={r.path} element={r.element} path={r.path} />
                ))}
            </Route>
        </Routes>
    )
}

export default AppRoutes
