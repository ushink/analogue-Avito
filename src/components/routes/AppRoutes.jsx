import { Route, Routes } from 'react-router-dom'
import { publicRoutes, privateRoutes } from '../../routes/routes'

function AppRoutes() {
    return (
        <Routes>
            <Route>
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
