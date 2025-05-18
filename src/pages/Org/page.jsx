import LogoOKFT from "../../assets/OKFT-UH.png";
import { useState, useEffect } from 'react';
import { firestore } from '../../api/firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Navbar from "../../components/layouts/Navbar";
import Spinner from "../../components/Spinner";

export default function Organizations() {
    const navigate = useNavigate()
    const { orgName } = useParams(); // ambil url param utk org
    const [organization, setOrganization] = useState(null);
    const [strukturUmum, setStrukturUmum] = useState([]);
    const [strukturDewan, setStrukturDewan] = useState([]);
    const [members, setMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const orgDocRef = doc(firestore, "Organisasi_mahasiswa", orgName);
                const orgSnapshot = await getDoc(orgDocRef);
    
                if (orgSnapshot.exists()) {
                    const data = { id: orgSnapshot.id, ...orgSnapshot.data() };
                    setOrganization(data);
    
                    const strukturDewanData = await Promise.all(
                        Object.entries(data.Struktur_dewan || {}).map(async ([key, ref]) => {
                            const memberDoc = await getDoc(ref);
                            return { Jabatan: key, ...memberDoc.data() };
                        })
                    );
    
                    const strukturUmumData = await Promise.all(
                        Object.entries(data.Struktur_umum || {}).map(async ([key, ref]) => {
                            const memberDoc = await getDoc(ref);
                            return { Jabatan: key, ...memberDoc.data() };
                        })
                    );
    
                    const urutanJabatan = ["Ketua_umum", "Sekretaris_umum", "Bendahara_umum"];
                    strukturUmumData.sort((a, b) => urutanJabatan.indexOf(a.Jabatan) - urutanJabatan.indexOf(b.Jabatan));
    
                    setStrukturDewan(strukturDewanData);
                    setStrukturUmum(strukturUmumData);
                }
    
                const membersCollection = collection(firestore, `Organisasi_mahasiswa/${orgName}/Anggota_organisasi`);
                const membersSnapshot = await getDocs(membersCollection);
                const membersList = membersSnapshot.docs.map((doc) => ({ id: parseInt(doc.id, 10), ...doc.data() }));
    
                membersList.sort((a, b) => a.id - b.id);
                setMembers(membersList);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setTimeout(() => setIsLoading(false), 350);
            }
        };
    
        fetchAllData();
    }, [orgName]);     

    return(
        <div className="w-full h-screen flex flex-col">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <Navbar menuItems={['Home', 'About', 'Struktur', 'Anggota', 'Daftar']}
                        scrollHandler={(label) => {
                            const targetClass =
                                label === 'Anggota' ? 'anggota' :
                                label === 'Struktur' ? 'struktur' :
                                label === 'Daftar' ? 'registration' : 'headInfo';
                            const targetElement = document.querySelector(`.${targetClass}`);
                            targetElement?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    />

                    <main className="w-full h-full">
                        <div className="w-full h-[8%]"><p>.</p></div>

                        <div className="headInfo w-full h-3/4 flex items-center pt-5 px-24 gap-16 bg-gray-200">
                            <div className="leftSide h-full w-1/4 pt-9 pb-16 flex flex-col justify-around">
                                <div className="aboutUs w-full h-[15%] capitalize text-3xl font-bold tracking-wider flex flex-col items-center">
                                    <p>tentang kami</p>
                                    <div className="terminator w-[35%] h-0.5 bg-red-900 mt-1"></div>
                                </div>
                                <div className="logoOrg w-full h-[50%] flex justify-center items-center p-1">
                                    <img src={ organization.Logo || LogoOKFT } alt="Logo Organisasi" className="w-fit h-full" />
                                </div>
                                <div className="agendaBtn w-full h-[10%] flex justify-center">
                                    <button onClick={() => navigate(`/agenda?orgName=${organization.id}`)} 
                                        className="bg-red-500 w-3/4 h-full rounded-md mt-4 capitalize text-white hover:bg-red-400">
                                        agenda kegiatan kami &rarr;
                                    </button>
                                </div>
                            </div>

                            <div className="rightSide h-full w-3/4 flex flex-col justify-center">
                                <div className="orgName w-full h-[15%] px-3 flex items-center">
                                    <p className="namaOrganisasi text-5xl font-extrabold tracking-wide">{organization?.id || "Organisasi Tidak Ditemukan"}</p>
                                </div>
                                <div className="orgDesc w-full px-3 h-[15%] text-justify">
                                    <p>{organization?.Deskripsi || "Deskripsi tidak tersedia"}</p>
                                </div>
                                <div className="orgVisi w-full h-[20%] px-3">
                                    <p className="font-bold capitalize">visi : </p>
                                    <p className="visi mt-1">{organization?.Visi || "Visi Tidak Ditemukan"}</p>
                                </div>
                                <div className="orgMisi w-full h-[20%] px-3">
                                    <p className="font-bold capitalize">misi : </p>
                                    {organization.Misi.map((misi, index) => (
                                        <p key={index} className="misi mt-1">{misi}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="terminator struktur px-56 pt-12 justify-center flex flex-col items-center">
                            <p className="text-4xl capitalize font-bold">struktur organisasi</p>
                            <div className="terminator w-[25%] h-0.5 bg-red-900 mt-2"></div>
                        </div>

                        <div className="strukturInfo h-[35%] flex justify-center items-center gap-36 mt-9">
                            {strukturDewan.map((person, index) => (
                                <div key={index} className="inti flex flex-col justify-center items-center">
                                    <div className="circle w-40 h-40 rounded-full bg-gray-300 flex justify-center items-center p-4">
                                        <img src={LogoOKFT} alt="Logo" className="h-full" />
                                    </div>
                                    <p className="jabatan pt-5 pb-2 font-bold text-xl capitalize">{person.Jabatan}</p>
                                    <p className="name capitalize">{person.Nama}</p>
                                </div>
                            ))}
                        </div>

                        <div className="strukturInfo h-[35%] flex justify-center items-center gap-36 mt-2 mb-9">
                            {strukturUmum.map((person, index) => (
                                <div key={index} className="inti flex flex-col justify-center items-center">
                                    <div className="circle w-40 h-40 rounded-full bg-gray-300 flex justify-center items-center p-4">
                                        <img src={LogoOKFT} alt="Logo" className="h-full" />
                                    </div>
                                    <p className="jabatan pt-5 pb-2 font-bold text-xl capitalize">{person.Jabatan}</p>
                                    <p className="name capitalize">{person.Nama}</p>
                                </div>
                            ))}
                        </div>

                        <div className="anggota terminator px-56 pt-12 justify-center flex flex-col items-center bg-gray-200">
                            <p className="text-4xl capitalize font-bold">anggota</p>
                            <div className="terminator w-[15%] h-0.5 bg-red-900 mt-2"></div>
                        </div>

                        <div className="anggotaInfo w-full px-56 justify-center flex py-10 text-black bg-gray-200 pb-40">
                            <table className="w-10/12 divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-400">
                                        <th scope="col" className="px-6 py-3 text-center text-s font-bold">No.</th>
                                        <th scope="col" className="px-6 py-3 text-center text-s font-bold">Nama Anggota</th>
                                        <th scope="col" className="px-6 py-3 text-center text-s font-bold">Jabatan</th>
                                        <th scope="col" className="px-6 py-3 text-center text-s font-bold">Angkatan</th>
                                        <th scope="col" className="px-6 py-3 text-center text-s font-bold">Kontak</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-400">
                                    {members.map((member, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{member.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-start">{member.Nama}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{member.Jabatan}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{member.Angkatan}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{member.Kontak}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </main>
                </>
            )}
            
        </div>
    )
}