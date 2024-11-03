import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import ForgotPassword from './Pages/ForgotPassword'
import Dashboard from "./Pages/Dashboard"
import Orders from './Pages/Orders'
import Product from './Pages/Product'
import Reviews from './Pages/Reviews'
import ScrollToTop from './Components/ScrollToTop'
import Customer from './Pages/Customer'
import FinancialManagement from './Pages/FinancialManagement'
import Store from './Pages/Store'
import Notification from './Pages/Notification'
import ProfileSetting from './Components/Store/ProfileSetting'
import StoreSetting from './Components/Store/StoreSetting'
import PaymentSetting from './Components/Store/PaymentSetting'
import UserSetting from './Components/Store/UserSetting'
import NotificationSetting from './Components/Store/NotificationSetting'
import BankSetting from './Components/Store/BankSetting'
import PlanSetting from './Components/Store/PlanSetting'
import ShippingSetting from './Components/Store/ShippingSetting'
import DomainSetting from './Components/Store/DomainSetting'
import Email from './Pages/Email'


const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<SignIn />}/>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/email' element={<Email />}/>
        <Route path='/forgotpassword' element={<ForgotPassword />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/orders' element={<Orders />}/>
        <Route path='/product' element={<Product />}/>
        <Route path='/reviews' element={<Reviews />}/>
        <Route path='/customer' element={<Customer />}/>
        <Route path='/financial' element={<FinancialManagement />}/>
        <Route path='/store' element={<Store />}/>
        <Route path='/notification' element={<Notification />}/>
        <Route path='/profilesetting' element={<ProfileSetting />}/>
        <Route path='/storesetting' element={<StoreSetting />}/>
        <Route path='/paymentsetting' element={<PaymentSetting />}/>
        <Route path='/usersetting' element={<UserSetting />}/>
        <Route path='/notificationsetting' element={<NotificationSetting />}/>
        <Route path='/banksetting' element={<BankSetting />}/>
        <Route path='/plansetting' element={<PlanSetting />}/>
        <Route path='/shippingsetting' element={<ShippingSetting />}/>
        <Route path='/domainsetting' element={<DomainSetting />}/>
      </Routes>
    </div>
  )
}

export default App