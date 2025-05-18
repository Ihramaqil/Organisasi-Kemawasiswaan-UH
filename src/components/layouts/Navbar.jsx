import PropTypes from "prop-types";
import LogoOKFT from "../../assets/OKFT-UH.png";
import { useNavigate } from "react-router-dom";

export default function Navbar({ menuItems, scrollHandler }) {
    const navigate = useNavigate();

    return (
        <nav className="flex items-center justify-between px-24 py-3 bg-gradient-to-l from-red-600 to-black fixed top-0 w-full z-10 shadow-lg">
            <div className="flex items-center">
                <img src={LogoOKFT} alt="Logo OKFT" className="h-14 md:h-16" />
                <span className="ml-9 text-xl md:text-2xl font-bold text-white">OKFT-UH</span>
            </div>

            <ul className="hidden md:flex space-x-8 text-white text-sm md:text-base font-medium">
                {menuItems.map((label, index) => (
                    <li key={index} className="relative cursor-pointer hover:text-red-400 transition duration-300"
                        onClick={() => { if (label === "Home") navigate("/"); else scrollHandler(label) }}
                    >
                        {label}
                        <div className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-red-400 transition-all duration-300 hover:w-full"></div>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

Navbar.propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
    scrollHandler: PropTypes.func.isRequired,
};