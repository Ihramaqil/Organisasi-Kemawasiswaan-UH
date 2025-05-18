import { useState, useEffect } from 'react';
import { firestore } from '../../api/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import LogoOKFT from "../../assets/OKFT-UH.png"

import Navbar from '../../components/layouts/Navbar';
import Footer from '../../components/layouts/Footer';
import OrganizationCard from '../../components/cards/OrganizationCard';
import Spinner from '../../components/Spinner';

export default function LandingPage() {
    const navigate = useNavigate();
    const [organizations, setOrganizations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const scrollToDesc = () => {
        const heroElement = document.querySelector('.about');
        heroElement?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const orgCollection = collection(firestore, "Organisasi_mahasiswa"); // ambil collection
                const orgSnapshot = await getDocs(orgCollection); // ambil snapshot
    
                const orgList = orgSnapshot.docs.map((doc) => ({
                    id: doc.id, // ambil doc id
                    ...doc.data(), // ambil semua field
                }));
    
                setOrganizations(orgList); // simpan state
            } catch (err) { console.error("Error fetching org pls jgn err lagi:", err);
            } finally { setTimeout(() => setIsLoading(false), 500) }
        };
        fetchOrganizations(); // call function saat komponen di-load
    }, []);    

    return(
        <div className="w-full h-screen flex flex-col bg-gray-300">

            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Navbar menuItems={['Home', 'About', 'OKD', 'Contact Us']}
                        scrollHandler={(label) => {
                            const targetClass =
                                label === 'Contact Us' ? 'footer' :
                                label === 'About' ? 'about' :
                                label === 'OKD' ? 'organizations' : 'hero';
                            const targetElement = document.querySelector(`.${targetClass}`);
                            targetElement?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    />

                    <main className="w-full h-fit">
                        <div className="hero w-full h-screen bg-bgHero bg-cover flex flex-col justify-center items-center mt-12">
                            <p className="text-7xl font-extrabold shine uppercase text-white hover:cursor-pointer">zelamat datang !!!</p>
                            <p className="text-xl font-bold shine uppercase text-white mt-3 tracking-wider hover:cursor-pointer">organisasi kemahasiswaan fakultas teknik universitas hasanuddin (OKFT - UH)</p>
                            {/* <button className="bg-red-500 px-6 py-3 mt-10 rounded-md text-white capitalize hover:bg-red-300">daftar</button> */}
                            <div className="animate-bounce dark:bg-slate-800 p-2 w-14 h-14 ring-2 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center mt-9 hover:cursor-pointer" onClick={scrollToDesc}>
                            <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                            </div>
                        </div>

                        <div className="about w-full h-fit flex px-56 py-16 gap-12">
                            <div className="left w-4/5">
                                <p className="text-3xl font-bold mb-3">Sekilas Tentang OKFT-UH</p>
                                <p className="text-justify">
                                    Organisasi Kemahasiswaan Fakultas Teknik Universitas Hasanuddin yang selanjutnya disingkat OKFT-UH merupakan organisasi kemahasiswaan di tingkat fakultas teknik universitas hasanuddin yang berstatus independen dan merupakan kelengkapan non-strukrural dari universitas hasanuddin. OKFT-UH berdiri sejak tanggal 10 September 1960 dengan tujuan membentuk mahasiswa yang bertakwa kepada Tuhan Yang Maha Esa, memiliki wawasan yang luas, cendekia, memiliki integritas kepribadian, profesionalisme, kemandirian, dan kepekaaan sosial. Dalam mencapai tujuan tersebut OKFT-UH melakukan kegiatan-kegiatan peningkatan penalaran dan keilmuan, minat, bakat, kesejahteraan, serta pengabdian Masyarakat.
                                </p>
                            </div>

                            <div className="right w-2/2 h-fit flex justify-center items-center bg-black px-9">
                                <img src={LogoOKFT} alt="Logo OKFT" className=" w-full h-56" />
                            </div>
                        </div>

                        <div className="organizations w-full h-fit bg-gray-200 px-56 py-16 pb-48 flex flex-col justify-center">
                            <div className="title h-fit py-2 mb-14">
                                <p className="text-4xl uppercase font-bold flex justify-center">himpunan mahasiswa departemen</p>
                            </div>

                            <div className="cards flex flex-wrap justify-between gap-x-9">
                                {organizations.map((org, index) => (
                                    <OrganizationCard key={index} org={org} navigate={navigate} />
                                ))}
                            </div>
                        </div>
                    </main>
                    
                    <Footer />
                </>
            )}

        </div>
    );
}