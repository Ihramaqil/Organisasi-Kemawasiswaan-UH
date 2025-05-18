import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/page";
import Organizations from "./pages/Org/page";
import Agenda from "./pages/Agenda/page";
import NotFound from "./pages/404/page";
import DetailAgenda from "./pages/DetailAgenda/page"; // Halaman DetailAgenda
import './index.css';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/org/:orgName" element={<Organizations />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/detail-agenda/:orgName/:agendaId" element={<DetailAgenda />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
);

export default App;