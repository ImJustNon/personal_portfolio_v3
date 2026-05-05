import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { config } from "../config/config";
import Fancybox from "../utilities/fancybox_wrapper";
import { options } from "../config/fancybox_options";
import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Certificates({ language }){

    const [certificateData_MiddleSchool, setCertificateData_MiddleSchool] = useState([]);
    const [certificateData_VocationalCertificate, setCertificateData_VocationalCertificate] = useState([]);
    const [certificateData_VocationalCertificate_2, setCertificateData_VocationalCertificate_2] = useState([]);
    const [certificateData_VocationalCertificate_3, setCertificateData_VocationalCertificate_3] = useState([]);

    // useEffect(() =>{
    //     fetch(`https://portfolio-proj-v1.vercel.app/api/get/certificate?key=${config.api.nonlnwzaPortfolio.key}`).then(response => response.json()).then(response =>{
    //         setCertificateData_MiddleSchool(response.data.middle_School);
    //         setCertificateData_VocationalCertificate(response.data.voc_cert);
    //         setCertificateData_VocationalCertificate_2(response.data.voc_cert_2);
    //     });      
    // }, []);

    useEffect(() =>{
        fetch("https://api-portfolio.aboutnon.in.th/api/v1/certificates/all").then(response => response.json()).then(response =>{
            console.log(response);
            setCertificateData_VocationalCertificate_3(response.data.vocational_certificate_3rd_year);
            setCertificateData_VocationalCertificate_2(response.data.vocational_certificate_2nd_year);
            setCertificateData_VocationalCertificate(response.data.vocational_certificate_1st_year);
            setCertificateData_MiddleSchool(response.data.middle_school);
        });
    }, []);

    // translation
    const { t, i18n } = useTranslation();

    return(
        <>
            <div className='container mx-auto'>
                <div className='mt-20 mx-auto'>
                    <h1 className='text-center text-[#c7ccd8] text-3xl font-semibold'>
                        {t("Certificates")}
                    </h1>
                </div>
                {/* -------------- */}
                
                <hr className='mt-16 mb-14 w-96 mx-auto' />

                <div className='mt-10 mx-auto w-96 md:w-full'>
                    <div className='mx-auto'>
                        <h1 className='text-center text-[#c7ccd8] text-2xl font-semibold'>
                            {t("Vocational Certificate 3rd Years")}
                        </h1>
                    </div>
                    <Fancybox options={options}>
                        <div className='grid grid-cols-1 gap-10 w-80 mt-10 mx-auto justify-items-start md:grid-cols-2 md:w-full xl:grid-cols-4'>

                            {certificateData_VocationalCertificate_3.map((data, i) =>(
                                <div key={i} className="card card-compact bg-base-100 shadow-2xl h-fit">
                                    <figure>
                                        <a data-fancybox="certificate_vocationalcertificate_2" data-caption={data.title.join(" ")} href={data.img} >
                                            <LazyLoadImage effect="blur" src={data.img} alt={`certificate_img_${i}`} />
                                        </a>
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title mx-auto text-center font-medium text-lg">
                                            {data.title.join(" ")}
                                        </h2>
                                        <p className='text-center mx-auto font-thin text-md'>
                                            {data.description.join(" ")}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </Fancybox>
                </div>
                
                <hr className='my-10 w-96 mx-auto' />

                <div className='mt-10 mx-auto w-96 md:w-full'>
                    <div className='mx-auto'>
                        <h1 className='text-center text-[#c7ccd8] text-2xl font-semibold'>
                            {t("Vocational Certificate 2nd Years")}
                        </h1>
                    </div>
                    <Fancybox options={options}>
                        <div className='grid grid-cols-1 gap-10 w-80 mt-10 mx-auto justify-items-start md:grid-cols-2 md:w-full xl:grid-cols-4'>

                            {certificateData_VocationalCertificate_2.map((data, i) =>(
                                <div key={i} className="card card-compact bg-base-100 shadow-2xl h-fit">
                                    <figure>
                                        <a data-fancybox="certificate_vocationalcertificate_2" data-caption={data.title.join(" ")} href={data.img} >
                                            <LazyLoadImage effect="blur" src={data.img} alt={`certificate_img_${i}`} />
                                        </a>
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title mx-auto text-center font-medium text-lg">
                                            {data.title.join(" ")}
                                        </h2>
                                        <p className='text-center mx-auto font-thin text-md'>
                                            {data.description.join(" ")}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </Fancybox>
                </div>
                
                <hr className='my-10 w-96 mx-auto' />

                <div className='mt-10 mx-auto w-96 md:w-full'>
                    <div className='mx-auto'>
                        <h1 className='text-center text-[#c7ccd8] text-2xl font-semibold'>
                            {t("Vocational Certificate 1st Years")}
                        </h1>
                    </div>
                    <Fancybox options={options}>
                        <div className='grid grid-cols-1 gap-10 w-80 mt-10 mx-auto justify-items-start md:grid-cols-2 md:w-full xl:grid-cols-4'>

                            {certificateData_VocationalCertificate.map((data, i) =>(
                                <div key={i} className="card card-compact bg-base-100 shadow-2xl h-fit">
                                    <figure>
                                        <a data-fancybox="certificate_vocationalcertificate_1" data-caption={data.title.join(" ")} href={data.img} >
                                            <LazyLoadImage effect="blur" src={data.img} alt={`certificate_img_${i}`} />
                                        </a>
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title mx-auto text-center font-medium text-lg">
                                            {data.title.join(" ")}
                                        </h2>
                                        <p className='text-center mx-auto font-thin text-md'>
                                            {data.description.join(" ")}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </Fancybox>
                </div>

                <hr className='my-10 w-96 mx-auto' />

                <div className='mt-10 mx-auto w-96 md:w-full'>
                    <div className='mx-auto'>
                        <h1 className='text-center text-[#c7ccd8] text-2xl font-semibold'>
                            {t("Grade 7 - Grade 9")}
                        </h1>
                    </div>
                    <Fancybox options={options} >
                        <div className='grid grid-cols-1 gap-10 w-80 mt-10 mx-auto justify-items-start md:grid-cols-2 md:w-full xl:grid-cols-4'>
                        
                            {certificateData_MiddleSchool.map((data, i) =>(
                                <div key={i} className="card card-compact bg-base-100 shadow-2xl h-fit">
                                    <figure>
                                        <a data-fancybox="certificate_mid" data-caption={data.title.join(" ")} href={data.img} >
                                            <LazyLoadImage effect="blur" src={data.img} alt={`certificate_img_${i}`} />
                                        </a>
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title mx-auto text-center font-medium text-lg">
                                            {data.title.join(" ")}
                                        </h2>
                                        <p className='text-center mx-auto font-thin text-md'>
                                            {data.description.join(" ")}
                                        </p>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </Fancybox>
                </div>

            </div>
        </>
    );
}

export default Certificates;