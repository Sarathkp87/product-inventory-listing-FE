import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductList from './pages/ProductList.jsx'
import AddProduct from './pages/AddProduct.jsx'
import EditProduct from './pages/EditProduct.jsx'
import CategoryList from './pages/CategoryList.jsx'
import AddCategory from './pages/AddCategory.jsx'
import EditCategory from './pages/EditCategory.jsx'
import Layout from './components/Layout.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductList />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
