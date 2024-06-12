import { Suspense, lazy } from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import TestPage from '../pages/testPage'
import { ROLE } from '../utils/role'

const StafLayout = lazy(() => import('../components/layout/staff-layout'))
const AdLayout = lazy(() => import('../components/layout/admin-layout'))
const PubLayout = lazy(() => import('../components/layout/public-layout'))

//public
const LoginPage = lazy(() => import('../pages/loginPage'))

//admin
const AdminUsersList = lazy(() => import('../pages/adminUserManagement'))

//staff
const StaffProductList = lazy(() => import('../pages/staffProductsManagement'))
const StaffCategoriesList = lazy(() => import('../pages/staffCategoriesManagement'))
const StaffOrderList = lazy(() => import('../pages/staffOrderManagement'))

const PrivateRoute = lazy(() => import('./proute'))



const AdminLayout = () => {
  return (
    <AdLayout>
      <Outlet />
    </AdLayout>
  )
}

const PublicLayout = () => {
  return (
    <PubLayout>
      <Outlet />
    </PubLayout>
  )
}

const StaffLayout = () => {
  return (
    <StafLayout>
      <Outlet />
    </StafLayout>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<></>}>
        <PrivateRoute inverted={false} requiredRoles={[ROLE.ADMIN, ROLE.STAFF]}>
          <PublicLayout />
        </PrivateRoute>
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: <PrivateRoute inverted={true}><></></PrivateRoute>,
      },
      {
        path: '/admin',
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.ADMIN]}>
              <AdminLayout />
            </PrivateRoute>
          </Suspense>
        ),
        children: [
          {
            path: 'users',
            element: (
              <Suspense fallback={<></>}>
                <AdminUsersList />
              </Suspense>
            )
          }
        ]
      },
      {
        path: '/staff',
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.STAFF]}>
              <StaffLayout />
            </PrivateRoute>
          </Suspense>
        ),
        children: [
          {
            path: 'products',
            element: (
              <Suspense fallback={<></>}>
                <StaffProductList />
              </Suspense>
            )
          },
          {
            path: 'categories',
            element: (
              <Suspense fallback={<></>}>
                <StaffCategoriesList />
              </Suspense>
            )
          },
          {
            path: 'order',
            element: (
              <Suspense fallback={<></>}>
                <StaffOrderList/>
              </Suspense>
            )
          }
        ]
      },
    ]
  },
  {
    path: 'test',
    element: (
      <Suspense fallback={<></>}>
        <TestPage />
      </Suspense>
    )
  },
  {
    path: 'login',
    element: (
      <PrivateRoute inverted={true}>
        <Suspense fallback={<></>}>
          <LoginPage />
        </Suspense>
      </PrivateRoute>
    )
  },
])
