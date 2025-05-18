import { useState, useEffect } from 'react';
import { firestore } from '../../api/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import formativeImage from '../../assets/formative.png';
import Navbar from '../../components/layouts/Navbar';
import Footer from '../../components/layouts/Footer';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';

export default function DetailAgenda() {
    const { orgName, agendaId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [agendaData, setAgendaData] = useState(null);
    const [orgData, setOrgData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching agenda for:', orgName, agendaId);

                const agendaRef = doc(firestore, `Organisasi_mahasiswa/${orgName}/Agenda_kegiatan/${agendaId}`);
                const agendaSnap = await getDoc(agendaRef);

                if (agendaSnap.exists()) {
                    setAgendaData({ id: agendaSnap.id, ...agendaSnap.data() });
                } else {
                    console.log('Agenda tidak ditemukan');
                }

                const orgRef = doc(firestore, 'Organisasi_mahasiswa', orgName);
                const orgSnap = await getDoc(orgRef);
                if (orgSnap.exists()) {
                    setOrgData(orgSnap.data());
                }
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [orgName, agendaId]);

    const formatDate = (dateStr) => {
        if (!dateStr || !dateStr.toDate) return 'Tidak tersedia';
        const date = dateStr.toDate();
        return date.toLocaleString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    if (isLoading) return <Spinner />;
    if (!agendaData) return <div className="text-center mt-10 text-2xl">Agenda tidak ditemukan</div>;

    return (
        <div className="w-full h-screen flex flex-col bg-white">
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

            <main className="w-full h-fit">
                {/* Header */}
                <div className="w-full flex justify-center py-12 bg-gray-100">
                    <h1 className="text-4xl font-bold bg-gradient-to-l from-black to-red-600 bg-clip-text text-transparent">
                        {agendaData.namaKegiatan}
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 px-12 py-8">
                    {/* Deskripsi Kegiatan */}
                    <div className="w-full lg:w-2/3">
                        <h2 className="text-3xl font-semibold mb-4">Deskripsi</h2>
                        <p className="text-justify leading-relaxed text-gray-700">
                            {agendaData.deskripsi || 'Deskripsi tidak tersedia'}
                        </p>

                        <div className="mt-6 space-y-3">
                            <p><span className="font-bold">Tanggal Mulai:</span> {formatDate(agendaData.waktuMulai)}</p>
                            <p><span className="font-bold">Tanggal Selesai:</span> {formatDate(agendaData.waktuSelesai)}</p>
                            <p><span className="font-bold">Lokasi:</span> {agendaData.lokasi || 'Tidak tersedia'}</p>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3 flex flex-col items-center">
                        <img
                            src={agendaData.gambarKegiatan || formativeImage}
                            alt="Gambar Kegiatan"
                            className="w-full rounded-lg shadow-md mb-6"
                        />
                        <button onClick={() => navigate("/regist")}
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
                            style={{ width: '100%', maxWidth: '350px' }}
                        >
                            Daftar
                        </button>
                    </div>
                </div>

                <div className="px-12 py-8 bg-gray-100">
                    <h2 className="text-3xl font-bold text-center mb-6">Organizing Team</h2>
                    <div className="flex justify-center gap-12">
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center shadow-lg">
                                <img
                                    src={orgData?.Logo || formativeImage}
                                    alt="Logo Organisasi"
                                    className="w-24 h-24 object-cover rounded-full"
                                />
                            </div>
                            <p className="text-xl font-semibold mt-4">{orgName}</p>
                        </div>

                        {/* Pembicara */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center shadow-lg">
                                <img
                                    src={agendaData.gambarPembicara || formativeImage}
                                    alt="Pembicara"
                                    className="w-24 h-24 object-cover rounded-full"
                                />
                            </div>
                            <p className="text-xl font-semibold mt-4">Pembicara</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
