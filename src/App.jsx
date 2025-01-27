import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ProductForm from './components/ProductForm';
import HomeReport from './HomeReport'; // Added back HomeReport
import View from './ViewFile/vieafile/ViewFirst';
import ProductFormPre from './components/ProductFormPre';
import ProductFormChe from './components/ProductFormChe';
import ProductFormSel from './components/ProductFormSel';
import ProductFormOut from './components/ProductFormOut';
// import ProductFormStc from './components/ProductFormStc';
import ProductFormBack from './components/ProductFormBack';
import ProductFormBranPre from './components/ProductFormBranPre';
import ProductFormBranSel from './components/ProductFormBranSel';
import ProductFormDep from './components/ProductFormDep';
import ProductFormEmp from './components/ProductFormEmp';
import ProductFormCred from './components/ProductFormCred';
import ProductFormDebt from './components/ProductFormDebt';
import ProductFormDebtB from './components/ProductFormDebtB';
import PrivateRoute from './components/PrivateRoute';
import NewGoodFoodWebsite from './components/Website';
import ProductPage from './components/ProductPage';
import ProductFormMarket  from './components/ProductFormMarket';
import ProductFormCar  from './components/ProductFormCar';
import ProductFormSack  from './components/ProductFormSack';
import ProductFormAther  from './components/ProductFormAther';
import ProductFormKur  from './components/ProductFormKur';
import FactureReportForm from './components/FactureReportForm';
import FactureSellReportForm from './components/FactureSellReportForm';

//import LoginHome from './components/LoginHome';
import HomePages from './HomePages';
import IbyinjiyePage from './pages/viewfiles/IbyinjiyePage';
import IbishyashyaPage from './pages/viewfiles/IbishyashyaPage';
import IbyagurishijwePage from './pages/viewfiles/IbyagurishijwePage';
import IbyasohotsePage from './pages/viewfiles/IbyasohotsePage';
import IbisanzwePage from './pages/viewfiles/IbisanzwePage';
import GutunganyaPage from './pages/viewfiles/GutunganyaPage';
import IbyagarutsePage from './pages/viewfiles/IbyagarutsePage';
import Buranda1Page from './pages/viewfiles/Buranda1Page';
import Buranda2Page from './pages/viewfiles/Buranda2Page';
import DepansePage from './pages/viewfiles/DepansePage';
import AbakoziPage from './pages/viewfiles/AbakoziPage';
import AmadeniPage from './pages/viewfiles/AmadeniPage';
import Amadeni2Page from './pages/viewfiles/Amadeni2Page';
import AbishyuyedeniPage from './pages/viewfiles/AbishyuyedeniPage';
import MarketPage from './pages/viewfiles/MarketPage';
import ImodokaPage from './pages/viewfiles/ImodokaPage';
import ImifukaPage from './pages/viewfiles/ImifukaPage';
import KuruhandePage from './pages/viewfiles/KuruhandePage';
import IbyaguzwekuruPage from './pages/viewfiles/IbyaguzwekuruPage';
import FacturePage from './pages/viewfiles/FacturePage';
import FactureSellPage from './pages/viewfiles/FactureSellPage';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';
import BannerSlider from './BannerSlider';
import PrivateRouteChl from './components/checkLink';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/HomeReport" element={<PrivateRoute element={<HomeReport />} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<NewGoodFoodWebsite />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/ProductForm" element={<PrivateRoute element={<ProductForm />} />} />
        <Route path="/ProductFormPre" element={<PrivateRoute element={<ProductFormPre />} />} />
        <Route path="/ProductFormChe" element={<PrivateRoute element={<ProductFormChe />} />} />
        <Route path="/ProductFormSel" element={<PrivateRoute element={<ProductFormSel />} />} />
        <Route path="/ProductFormOut" element={<PrivateRoute element={<ProductFormOut />} /> } />
        <Route path="/ProductFormBack" element={<PrivateRoute element={<ProductFormBack />} />} />
        <Route path="/ProductFormBranPre" element={<PrivateRoute element={<ProductFormBranPre />} />} />
        <Route path="/ProductFormBranSel" element={<PrivateRoute element={<ProductFormBranSel />} />} />
        <Route path="/ProductFormDep" element={<PrivateRoute element={<ProductFormDep />} />} />
        <Route path="/ProductFormEmp" element={<PrivateRoute element={<ProductFormEmp />} />} />
        <Route path="/ProductFormCred" element={<PrivateRoute element={<ProductFormCred />} />} />
        <Route path="/ProductFormDebt" element={<PrivateRoute element={<ProductFormDebt />} />} />
        <Route path="/ProductFormDebtB" element={<PrivateRoute element={<ProductFormDebtB />} />} />
        <Route path="/ProductFormMarket" element={<PrivateRoute element={<ProductFormMarket />} />} />
        <Route path="/ProductFormCar" element={<PrivateRoute element={<ProductFormCar />} />} />
        <Route path="/ProductFormSack" element={<PrivateRoute element={<ProductFormSack />} />} />
        <Route path="/ProductFormAther" element={<PrivateRoute element={<ProductFormAther />} />} />
        <Route path="/ProductFormKur" element={<PrivateRoute element={<ProductFormKur />} />} />
        <Route path="/FactureReportForm" element={<PrivateRoute element={<FactureReportForm />} />} />
        <Route path="/FactureSellReportForm" element={<PrivateRoute element={<FactureSellReportForm />} />} />
        <Route path="/view" element={<View />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/ChangePassword/:token" element={<PrivateRouteChl element={<ChangePassword />}/>} />
        <Route path="/BannerSlider" element={<BannerSlider />} />
        
        {/* Direct routes that are always accessible */}
         {/*
        <Route path="/login-home" element={<LoginHome />} />
        */}
        {/* Protected routes */}
        <Route path="/HomePages" element={<PrivateRoute element={<HomePages />} />} />
        <Route path="/Ibishyashya" element={<PrivateRoute element={<IbishyashyaPage />} />} />
        <Route path="/Gutunganya" element={<PrivateRoute element={<GutunganyaPage />} />} />
        <Route path="/Ibyinjiye" element={<PrivateRoute element={<IbyinjiyePage />} />} />
        <Route path="/Ibyagurishijwe" element={<PrivateRoute element={<IbyagurishijwePage />} />} />
        <Route path="/Ibyasohotse" element={<PrivateRoute element={<IbyasohotsePage />} />} />
        <Route path="/Ibisanzwe" element={<PrivateRoute element={<IbisanzwePage />} />} />
        <Route path="/Ibyagarutse" element={<PrivateRoute element={<IbyagarutsePage />} />} />
        <Route path="/Buranda 1" element={<PrivateRoute element={<Buranda1Page />} />} />
        <Route path="/Buranda 2" element={<PrivateRoute element={<Buranda2Page />} />} />
        <Route path="/Depanse" element={<PrivateRoute element={<DepansePage />} />} />
        <Route path="/List Yabakozi" element={<PrivateRoute element={<AbakoziPage />} />} />
        <Route path="/Amadeni" element={<PrivateRoute element={<AmadeniPage />} />} />
        <Route path="/AmadeniB" element={<PrivateRoute element={<Amadeni2Page />} />} />
        <Route path="/Abishyuyeideni" element={<PrivateRoute element={<AbishyuyedeniPage />} />} />
        <Route path="/Marketreport" element={<PrivateRoute element={<MarketPage/>} />} />
        <Route path="/Raporoyimifuka" element={<PrivateRoute element={<ImifukaPage/>} />} />
        <Route path="/Raporoyimodoka" element={<PrivateRoute element={<ImodokaPage/>} />} />
        <Route path="/Kuruhande" element={<PrivateRoute element={<KuruhandePage/>} />} />
        <Route path="/KuruhandeIbyaguzwe" element={<PrivateRoute element={<IbyaguzwekuruPage/>} />} />
        <Route path="/FactureReport" element={<PrivateRoute element={<FacturePage/>} />} />
        <Route path="/FactureSellReport" element={<PrivateRoute element={<FactureSellPage/>} />} />
      </Routes>
    </Router>
  );
}

export default App;
