import Fancybox from "../utilities/fancybox_wrapper";
import { options } from "../config/fancybox_options";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


function Projects({ language }){
    const navigate = useNavigate();

    const [ProjectsData_M3, setProjectsData_M3] = useState([]);
    const [ProjectsData_VocationalCertificate, setProjectsData_VocationalCertificate] = useState([]);
    const [ProjectsData_VocationalCertificate_2, setProjectsData_VocationalCertificate_2] = useState([]);
    const [ProjectsData_VocationalCertificate_3, setProjectsData_VocationalCertificate_3] = useState([]);

    useEffect(() =>{
        fetch("https://api-portfolio.aboutnon.in.th/api/v1/projects/all").then(response => response.json()).then(response =>{
            setProjectsData_M3(response.data.proj_m_3);
            setProjectsData_VocationalCertificate(response.data.vocational_certificate_1st_year);
            setProjectsData_VocationalCertificate_2(response.data.vocational_certificate_2nd_year);
            setProjectsData_VocationalCertificate_3(response.data.vocational_certificate_3rd_year);
        });
    }, []);
    
    // translation
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    function handleNavigateDetails(id){
        navigate(`/${currentLanguage}/project/${id}`);
    }

    function levenshtein(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, 
                        matrix[i][j - 1] + 1,     
                        matrix[i - 1][j] + 1     
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }
    function findMostSimilarKey(obj, targetKey) {
        let closestKey = null;
        let smallestDistance = Infinity;
        for (const key in obj) {
            const distance = levenshtein(key, targetKey);
            if (distance < smallestDistance) {
                smallestDistance = distance;
                closestKey = key;
            }
        }
        return closestKey;
    }

    const pickIcon = {
        "Github": "fa-brands fa-github",
        "Frontend": "fa-brands fa-github",
        "Backend": "fa-brands fa-github",
        "Preview": "fa-solid fa-up-right-from-square",
    }

    return(
        <>
            <div className='container mx-auto'>
                <div className='mt-20 mx-auto'>
                    <h1 className='text-center text-3xl font-semibold text-white'>
                        {language === "en" ? "Projects" : "โปรเจค"}
                    </h1>
                </div>
                {/* -------------- */}
                
                {/* <div className="flex flex-col justify-center text-center my-40">
                    <p className="text-3xl">I have created this page since 2023 and now it still not finish. LOL</p>
                    <p className="text-xl">'Cause I Lazy. LOL</p>
                </div> */}

                <hr className='my-14 w-96 mx-auto' />

                <div className='mt-10 mx-auto w-96 md:w-full'>
                    <div className='mx-auto'>
                        <h1 className='text-center text-[#c7ccd8] text-3xl font-semibold'>
                            {t("Vocational Certificate 3rd Years")}
                        </h1>
                    </div>
                    <div className='grid grid-cols-1 gap-10 w-80 mt-10 mx-auto justify-items-start md:grid-cols-2 md:w-full xl:grid-cols-4'>

                        {ProjectsData_VocationalCertificate_3.map((data, i) =>(
                            <div key={i} className="card card-compact bg-base-100 shadow-2xl h-fit">
                                <figure className="cursor-pointer" onClick={() => handleNavigateDetails(data.id)}>
                                    <LazyLoadImage effect='blur' src={data.img} alt={`project_img_${i}`} />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title mx-auto text-center font-medium text-lg">
                                        {data.title.join(" ")}
                                    </h2>
                                    <p className='text-center mx-auto font-thin text-md'>
                                        {data.description.join(" ")}
                                    </p>
                                    <div className="flex flex-row mt-3 justify-center gap-5 flex-wrap">
                                        {data.links.map((btn, i) =>(
                                            <div className="cursor-pointer px-3 py-2 rounded-lg bg-[#c4c4c4] text-black hover:bg-[#9e9e9e] active:bg-[#8a8a8a] duration-300" onClick={() => window.open(btn.url)}><i className={`${pickIcon[findMostSimilarKey(pickIcon, btn.name)]} mr-1`}></i> {btn.name}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                <hr className='my-10 w-96 mx-auto' />

                <div className='mt-10 mx-auto w-96 md:w-full'>
                    <div className='mx-auto'>
                        <h1 className='text-center text-[#c7ccd8] text-3xl font-semibold'>
                            {t("Vocational Certificate 2nd Years")}
                        </h1>
                    </div>
                    <div className='grid grid-cols-1 gap-10 w-80 mt-10 mx-auto justify-items-start md:grid-cols-2 md:w-full xl:grid-cols-4'>

                        {ProjectsData_VocationalCertificate_2.map((data, i) =>(
                            <div key={i} className="card card-compact bg-base-100 shadow-2xl h-fit">
                                <figure className="cursor-pointer" onClick={() => handleNavigateDetails(data.id)}>
                                    <LazyLoadImage effect='blur' src={data.img} alt={`project_img_${i}`} />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title mx-auto text-center font-medium text-lg">
                                        {data.title.join(" ")}
                                    </h2>
                                    <p className='text-center mx-auto font-thin text-md'>
                                        {data.description.join(" ")}
                                    </p>
                                    <div className="flex flex-row mt-3 justify-center gap-5 flex-wrap">
                                        {data.links.map((btn, i) =>(
                                            <div className="cursor-pointer px-3 py-2 rounded-lg bg-[#c4c4c4] text-black hover:bg-[#9e9e9e] active:bg-[#8a8a8a] duration-300" onClick={() => window.open(btn.url)}><i className={`${pickIcon[findMostSimilarKey(pickIcon, btn.name)]} mr-1`}></i> {btn.name}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                <hr className='my-10 w-96 mx-auto' />

                <div className='mt-10 mx-auto w-96 md:w-full'>
                    <div className='mx-auto'>
                        <h1 className='text-center text-[#c7ccd8] text-3xl font-semibold'>
                            {t("Vocational Certificate 1st Years")}
                        </h1>
                    </div>
                    <div className='grid grid-cols-1 gap-10 w-80 mt-10 mx-auto justify-items-start md:grid-cols-2 md:w-full xl:grid-cols-4'>

                        {ProjectsData_VocationalCertificate.map((data, i) =>(
                            <div key={i} className="card card-compact bg-base-100 shadow-2xl h-fit">
                                <figure className="cursor-pointer" onClick={() => handleNavigateDetails(data.id)}>
                                    <LazyLoadImage effect='blur' src={data.img} alt={`project_img_${i}`} />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title mx-auto text-center font-medium text-lg">
                                        {data.title.join(" ")}
                                    </h2>
                                    <p className='text-center mx-auto font-thin text-md'>
                                        {data.description.join(" ")}
                                    </p>
                                    <div className="flex flex-row mt-3 justify-center gap-5 flex-wrap">
                                        {data.links.map((btn, i) =>(
                                            <div className="cursor-pointer px-3 py-2 rounded-lg bg-[#c4c4c4] text-black hover:bg-[#9e9e9e] active:bg-[#8a8a8a] duration-300" onClick={() => window.open(btn.url)}><i className={`${pickIcon[findMostSimilarKey(pickIcon, btn.name)]} mr-1`}></i> {btn.name}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>

                <hr className='my-10 w-96 mx-auto' />

                <div className='mt-10 mx-auto w-96 md:w-full'>
                    <div className='mx-auto'>
                        <h1 className='text-center text-[#c7ccd8] text-3xl font-semibold'>
                            {t("Grade 9")}
                        </h1>
                    </div>
                    <div className='grid grid-cols-1 gap-10 w-80 mt-10 mx-auto justify-items-start md:grid-cols-2 md:w-full xl:grid-cols-4'>

                        {ProjectsData_M3.map((data, i) =>(
                            <div key={i} className="card card-compact bg-base-100 shadow-2xl h-fit">
                                <figure className="cursor-pointer" onClick={() => handleNavigateDetails(data.id)}>
                                    <LazyLoadImage effect='blur' src={data.img} alt={`project_img_${i}`} />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title mx-auto text-center font-medium text-lg">
                                        {data.title.join(" ")}
                                    </h2>
                                    <p className='text-center mx-auto font-thin text-md'>
                                        {data.description.join(" ")}
                                    </p>
                                    <div className="flex flex-row mt-3 justify-center gap-5 flex-wrap">
                                        {data.links.map((btn, i) =>(
                                            <div className="cursor-pointer px-3 py-2 rounded-lg bg-[#c4c4c4] text-black hover:bg-[#9e9e9e] active:bg-[#8a8a8a] duration-300" onClick={() => window.open(btn.url)}><i className={`${pickIcon[findMostSimilarKey(pickIcon, btn.name)]} mr-1`}></i> {btn.name}</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                
            </div>
        </>
    );
}


export default Projects;