import Image from "next/image";
import logo from "../../../public/logo.png";

import linkedin from "../../../public/linkedin.png";
import youtube from "../../../public/youtube.png";
import facebook from "../../../public/facebook.png";

export default function Footer() {

    return (
    <div className="bg-[#000000D9] text-[#FFFFFFCC] w-screen h-[551px]  mt-60 flex items-center justify-center min-h-[550px]">
        <div className="w-[1134px] h-[359px] border-white ">
            <div className="h-[147px] flex font-normal text-[#FFFFFFCC]" style={{fontSize: "22px", lineHeight: "33px"}}>
                <div className="flex flex-col gap-6 w-[270px] ">
                    <p>Home</p>
                    <p>Challenges</p>
                    <p>Courses</p>
                </div>

                <div className="flex flex-col gap-6">
                    <p>Compiler</p>
                    <p>Link 2</p>
                    <p>Link 3</p>
                </div>
            </div>

            <div className="mt-12 h-[162px] ">
                <div className="h-[50px] flex justify-between">
                    <div className="flex items-start w-[173.68px] h-[50px]">
                        <Image src={logo} alt="logo" width={38} height={38}/>
                        <h1 className="font-bold text-3xl tracking[-0.06em] ml-3">codynn</h1>
                    </div>

                    <div className="flex items-start w-[328px] justify-between font-medium text-xl tracking[-0.06em]">
                        <p>About</p>
                        <p>EmailUs</p>
                        <p>Support</p>
                    </div>
                </div>

                <hr className="bg-[#ffffff99] border w-full mt-8"/>

                <div className="mt-8 flex justify-between">
                    <p className="font-normal text-xl text-[#FFFFFF] tracking[-0.06em]">Company Name - Copyright ©</p>

                    <div className="w-[144px] h-[48px] flex justify-between items-start">
                        <Image src={linkedin} alt="linkedin Logo" width={38} height={32}/>
                        <Image src={youtube} alt="youtube Logo" width={40} height={34} className="mt-1"/>
                        <Image src={facebook} alt="facebook Logo" width={38} height={32}/>
                    </div>
                </div>
            </div>

        </div>
    </div>
    )
}