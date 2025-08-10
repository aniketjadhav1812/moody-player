import { useNavigate } from "react-router-dom";
export default function PageNotFound() {

    let navigate = useNavigate();
    return (
        <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center font-sans">
            <h1 className="text-8xl font-bold m-0 tracking-wider text-[#ff4c60] drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)]">
                404
            </h1>
            <h2 className="text-3xl mt-4 mb-2 text-white">Page Not Found</h2>
            <p className="text-base text-[#b0b0b0] mb-8">
                Oops! The page you are looking for doesn't exist or has been moved.
            </p>
                <button onClick={()=> navigate("/moody-songs")}  className="px-8 py-3 bg-[#ff4c60] text-white rounded-full text-base cursor-pointer transition-colors duration-200 hover:bg-[#e04355]">
                    Go Home
                </button>
        </div>
    );
}
