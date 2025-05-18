import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { firestore } from "../../api/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import Navbar from '../../components/layouts/Navbar';
import Footer from '../../components/layouts/Footer';

export default function Agenda() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orgName = queryParams.get("orgName"); // ambil orgName dari URL
    const [agendas, setAgendas] = useState([]);
    const navigate = useNavigate();

    const formatTimestamp = (timestamp) => {
        if (timestamp && timestamp.seconds) {
            const date = new Date(timestamp.seconds * 1000);
            return date.toLocaleString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        }
        return "Waktu tidak tersedia";
    };

    useEffect(() => {
        const fetchAgendaKegiatan = async () => {
            try {
                const agendaCollection = collection(firestore, `Organisasi_mahasiswa/${orgName}/Agenda_kegiatan`);
                const agendaSnapshot = await getDocs(agendaCollection);
                const agendaList = agendaSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAgendas(agendaList);
            } catch (error) {
                console.error("Error fetching Agenda_kegiatan:", error);
            }
        };

        fetchAgendaKegiatan();
    }, [orgName]);

    return (
        <div className="w-full h-screen flex flex-col">
            <Navbar
                menuItems={['Home', 'About', 'Agenda', 'Contact Us']}
                scrollHandler={(label) => {
                    const targetClass =
                        label === 'Contact Us' ? 'footer' :
                        label === 'Agenda' ? 'agenda' :
                        label === 'About' ? 'about' : 'hero';
                    const targetElement = document.querySelector(`.${targetClass}`);
                    targetElement?.scrollIntoView({ behavior: 'smooth' });
                }}
            />
            <main className="w-full py-20">
                <div className="hero w-full h-screen bg-bgAgenda bg-cover flex flex-col items-center px-24">
                    <div className="w-full h-[10%]"><p>.</p></div>
                    <div className="title w-full h-[15%] capitalize text-2xl font-bold tracking-wider flex flex-col">
                        <p>agenda kegiatan</p>
                        <div className="terminator w-[15%] h-0.5 bg-red-900 mt-1"></div>
                    </div>
                    <div className="namaOrganisasi w-full h-[10%] flex justify-center mt-24">
                        <p className="text-7xl font-extrabold shine uppercase text-white hover:cursor-pointer">OKIF FT-UH</p>
                    </div>
                    <div className="searchBar w-full h-[25%] mt-7 flex justify-center">
                        <input type="search" className="w-1/2 h-12 text-red-500 font-bold tracking-wide rounded-md py-6 px-9 outline-none" placeholder="Masukkan agenda yang ingin Anda cari" />
                    </div>
                </div>
                <div className="grid grid-cols-1 py-16 md:grid-cols-2 gap-8 px-24">
                    {agendas.map((agenda) => (
                        <div key={agenda.id} className="bg-white flex items-center justify-between py-6 px-12 shadow-xl rounded-[40px] mx-auto">
                            <div className="w-3/5 flex flex-col items-start mr-6">
                                <p className="text-xl font-bold text-black mb-2">{agenda.namaKegiatan || "Nama Kegiatan Tidak Tersedia"}</p>
                                <p className="text-gray-700 mb-4">{agenda.deskripsi || "Deskripsi tidak tersedia"}</p>
                                <button onClick={() => navigate(`/detail-agenda/${orgName}/${agenda.id}`)} className="bg-red-600 text-white px-5 py-1 rounded-lg shadow-md hover:bg-red-700 transition duration-300 mb-4">Detailnya</button>
                                <div className="flex items-center text-gray-600 mb-4 space-x-3">
                                    <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#c62828" d="M19 3h-3V1h-2v2H10V1H8v2H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 2 1.99 2h14c1.1 0 1.99-.9 1.99-2L21 5c0-1.1-.89-2-1.99-2zM5 5h14v14H5V5z" /></svg>
                                    <div className="flex flex-col">
                                        <span className="text-sm">{formatTimestamp(agenda.waktuMulai)}</span>
                                        <span className="text-sm">{formatTimestamp(agenda.waktuSelesai)}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center text-gray-600 space-x-3">
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#c62828" d="M12 2C8.13 2 5 5.13 5 9c0 3.87 5 11 7 13 2-2 7-9.13 7-13 0-3.87-3.13-7-7-7zm0 11c-1.3 0-2.35-.84-2.8-2.02L12 9l1.8 2.98C14.35 12.16 13.3 13 12 13z" /></svg>
                                        <span>{agenda.lokasi || "Lokasi tidak tersedia"}</span>
                                    </div>
                                </div>
                                <div className="flex items-center mt-6">
                                    <div className="flex items-center bg-white border border-gray-300 px-4 py-2 rounded-full shadow-sm mr-auto">
                                        <div className={`w-4 h-4 rounded-full mr-2 ${agenda.status === "Terbuka untuk pendaftaran" ? "bg-green-500" : "bg-red-500"}`}></div>
                                        <span className="text-gray-700 text-sm font-semibold">{agenda.status || "Status tidak tersedia"}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-2/5 flex justify-center items-center">
                                <img src={agenda.gambarKegiatan || "/path/to/placeholder.jpg"} alt="Gambar Kegiatan" className="w-[400px] h-[300px] rounded-lg shadow-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
