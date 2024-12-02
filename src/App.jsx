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


import LoginHome from './components/LoginHome';
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
import PrivateRoute from './components/PrivateRoute';
import NewGoodFoodWebsite from './components/Website';
import ProductPage from './components/ProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/HomeReport" element={<HomeReport />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<NewGoodFoodWebsite />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/ProductForm" element={<ProductForm />} />
        <Route path="/ProductFormPre" element={<ProductFormPre />} />
        <Route path="/ProductFormChe" element={<ProductFormChe />} />
        <Route path="/ProductFormSel" element={<ProductFormSel />} />
        <Route path="/ProductFormOut" element={<ProductFormOut />} /> 
        <Route path="/ProductFormBack" element={<ProductFormBack />} />
        <Route path="/ProductFormBranPre" element={<ProductFormBranPre />} />
        <Route path="/ProductFormBranSel" element={<ProductFormBranSel />} />
        <Route path="/ProductFormDep" element={<ProductFormDep />} />
        <Route path="/ProductFormEmp" element={<ProductFormEmp />} />
        <Route path="/view" element={<View />} />
        
        {/* Direct routes that are always accessible */}
        <Route path="/login-home" element={<LoginHome />} />
        
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
      </Routes>
    </Router>
  );
}

export default App;
