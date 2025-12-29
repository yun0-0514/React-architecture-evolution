import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/home.jsx';
import { MemberProvider } from './contexts/MemberContext.jsx';


function App() {


  return (
    <>
      <MemberProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </MemberProvider>
    </>
  )
}

export default App
