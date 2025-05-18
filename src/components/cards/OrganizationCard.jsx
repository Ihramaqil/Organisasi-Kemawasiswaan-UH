import PropTypes from "prop-types";

export default function OrganizationCard({ org, navigate }) {
    return (
        <div className="card bg-white w-[28%] h-80 rounded-md px-6 pt-2 pb-6 hover:cursor-pointer mb-9 flex flex-col justify-between grow hover:scale-[1.01]"
        onClick={() => navigate(`/org/${org.id}`)}>
            <div className="logo w-full h-[60%] flex items-center justify-center p-6 overflow-hidden drop-shadow-2xl">
                <img src={org.Logo || "https://via.placeholder.com/150"} alt={`Logo ${org.Nama_organisasi}`} className="drop-shadow-2xl h-full" />
            </div>
            <div className="title w-full h-[10%] mt-3 uppercase font-bold text-xl flex justify-center items-center bg-gray-100 rounded-md">
                {org.id || "Nama Organisasi Tidak Tersedia"}
            </div>
            <div className="desc w-full h-[25%] text-center flex items-center">
                <p className="text-center w-full">{org.Nama_lengkap || "Deskripsi tidak tersedia"}</p>
            </div>
            <div className="btn w-full h-[11%]">
                {/* <button onClick={() => navigate(`/org/${org.id}`)} className="bg-red-500 w-full h-full rounded-md text-white hover:bg-red-400">
                    Read More &rarr;
                </button> */}
            </div>
        </div>
    );
}

OrganizationCard.propTypes = {
    org: PropTypes.shape({
        id: PropTypes.string,
        Logo: PropTypes.string,
        Nama_organisasi: PropTypes.string,
        Nama_lengkap: PropTypes.string,
    }).isRequired,
    navigate: PropTypes.func.isRequired,
};