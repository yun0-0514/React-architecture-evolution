import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/home.jsx';
import { MemberContext } from './contexts/MemberContext.js';
import useFetchMembers from './hooks/useFetchMembers.js';

function App() {

  const memberData = useFetchMembers();

  return (
    <>
      <MemberContext.Provider value={memberData}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </MemberContext.Provider>
    </>
  )
}

export default App
