
import React from "react";

const LogoHeader: React.FC = () => {
    return (
        <header className="bg-white text-black shadow-md">
            <div className="container mx-auto p-4 flex justify-center items-center">
                <div className='justify-center'>
                    <div className="text-center">
                        <img
                            src="/logo.jpg"
                            alt="Nairametrics Logo"
                            className="mx-auto w-24 sm:w-20 md:w-26 lg:w-64 transition-all"
                        />
                    </div>
                    <div className="flex justify-between text-black mt-4 font-bold text-xs md:text-sm">
                        <h1 className='mx-3'>TRACKING TRENDS</h1>
                        <h1 className='mx-4'>  | </h1>
                        <h1>INFORMING DECISIONS</h1>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default LogoHeader;
