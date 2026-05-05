import { useEffect, useState } from "react";
import { config } from "../config/config";
import axios from "axios";
import profilePicture from "../assets/images/profile_2.jpg";
import { useTranslation } from "react-i18next";

function PersonalHistory({ language }){
    const { t, i18n } = useTranslation();

    const [personalInfoMyself, setPersonalInfoMyself] = useState([]);
    const [personalInfoDad, setPersonalInfoDad] = useState([]);
    const [personalInfoMom, setPersonalInfoMom] = useState([]);
    const [personalInfoSchools, setPersonalInfoSchools] = useState([]);
    // useEffect(() =>{
    //     fetch(`https://portfolio-proj-v1.vercel.app/api/get/personal-info?key=${config.api.nonlnwzaPortfolio.key}`).then(response => response.json()).then(response =>{
    //         // console.log(response);
    //         setPersonalInfoMyself(response.data.myself);
    //         setPersonalInfoDad(response.data.dad);
    //         setPersonalInfoMom(response.data.mom);
    //         setPersonalInfoSchools(response.data.school);
    //     }); 
    // }, []);

    useEffect(() =>{
        fetch("https://api-portfolio.aboutnon.in.th/api/v1/selfinformations/all").then(response => response.json()).then(response =>{
            setPersonalInfoMyself(response.data.me);
            setPersonalInfoDad(response.data.dad);
            setPersonalInfoMom(response.data.mom);
            setPersonalInfoSchools(response.data.schools);
        });
    }, []);


    const [instagramProfilePic, setInstagramProfilePic] = useState(""); 
    useEffect(() =>{
        fetch(`https://instagram130.p.rapidapi.com/account-info?username=${config.api.instagram.username}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': config.api.rapidapi.key,
                'X-RapidAPI-Host': config.api.instagram.rapidapi.host,
            },
        }).then(response => response.json()).then(response =>{
            setInstagramProfilePic(response.profile_pic_url);
        });
    }, []); 

    return(
        <>

            <div className="container mx-auto">
                <div className='mt-20 mx-auto'>
                    <h1 className='text-center text-[#c7ccd8] text-3xl font-semibold'>
                        {t("Personal History")}
                    </h1>
                </div>
                <div className="mt-14 mx-auto">
                    <div className="grid grid-rows-1 grid-flow-row w-96 justify-center mx-auto md:gap-x-10 md:grid-rows-3 md:grid-flow-col md:w-auto md:mx-0">


                        <div className="row-span-3 hero bg-white bg-opacity-40 rounded-2xl text-black py-8 px-8 mb-5 md:max-w-xl">    
                            <div className='text-black h-full w-full'>
                                <div className="w-48 mx-auto mb-10">
                                    <img className="mx-auto rounded-full border-solid border-white border-8 aspect-square object-cover object-center" src={profilePicture} alt="Profile_pic" />
                                </div>
                                <h1 className='text-2xl text-center font-bold mb-8'>
                                    {t("My Information")}
                                </h1>

                                <div className="grid grid-cols-2 gap-x-5 items-start mx-auto">
                                    {personalInfoMyself.map((info, i) =>(
                                        <p key={i} className="py-2 text-lg font-thin">
                                            ▪ <span className="font-bold">{(info.title).join(" ")} :</span> <br />
                                            {(info.description).join(" ")}
                                        </p>  
                                    ))}
                                </div>
                            </div>
                        </div>



                        <div className="col-span-2 hero bg-white bg-opacity-40 rounded-2xl text-black py-8 px-8 mb-5 md:max-w-xl">
                            <div className='text-black h-full w-full'>
                                <h1 className='text-2xl text-center font-bold mb-8'>
                                    {t("About My Parrents")}
                                </h1>
                                
                                <div className="flex flex-row justify-around mb-3">
                                    <h1 className="text-xl font-bold">บิดา</h1>
                                    <h1 className="text-xl font-bold">มารดา</h1>
                                </div>

                                <div className="grid grid-cols-2">
                                    <div className="space-y-1">
                                        {personalInfoDad.map((info,i) =>(
                                            <p key={i} className="py-2 text-md font-thin">
                                                ▪ <span className="font-bold">{(info.title).join(" ")} :</span> {(info.description).join(" ")}
                                            </p>  
                                            
                                        ))}
                                        
                                    </div>
                                    <div className="space-y-1">
                                        {personalInfoMom.map((info,i) =>(
                                            <p key={i} className="py-2 text-md font-thin">
                                                ▪ <span className="font-bold">{(info.title).join(" ")} :</span> {(info.description).join(" ")}
                                            </p>  
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row-span-2 col-span-2 hero bg-white bg-opacity-40 rounded-2xl text-black py-8 px-8 mb-5 md:h-fit md:max-w-xl">
                            <div className='text-black h-full w-full'>
                                <h1 className='text-2xl text-center font-bold mb-8'>
                                    {t("About My Education")}
                                </h1>
                                
                                <div className="flex flex-col w-full gap-y-5">
                                    {personalInfoSchools.map((info, i) =>(
                                        <div key={i}>
                                            <img className="w-48 mx-auto rounded-2xl" src={info.img} alt={`school_pic_${i}`} />
                                            <h1 className="text-lg text-center mt-5 md:max-w-xs mx-auto">
                                                {info.title.map((title, i) =>(
                                                    <p key={i}>{title}</p>    
                                                ))}
                                            </h1>
                                            <div className="flex flex-row justify-center space-x-5 mt-2">
                                                <a target="_blank" href={info.links[0].url} className="btn btn-info btn-sm text-white font-thin">
                                                    <i className="fa-brands fa-facebook"></i> 
                                                    {t(info.links[0].name)}
                                                </a>
                                                <a target="_blank" href={info.links[1].url} className="btn btn-neutral btn-sm text-white font-thin">
                                                    <i className="fa-solid fa-globe"></i> 
                                                    {t(info.links[1].name)}
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}


export default PersonalHistory;