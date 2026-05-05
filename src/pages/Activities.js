import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import '../styles/swiper.css';
import { Autoplay, EffectFade, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import singaporeExchange from "../assets/images/activities/thai-singapore_exchange_2_crop.jpg";
import pjbl2 from "../assets/images/activities/pjbl1-2_crop.jpg";
import stem_2 from "../assets/images/activities/stem_3_crop.jpg";
import roverScout from "../assets/images/activities/rover_scout_banner_crop.jpg";
import { Card, CardHeader, CardBody, CardFooter, Stack, Image, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react';
import { config } from "../config/config";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function Activities({ language }){

    const navigate = useNavigate();

    const [activitiesData_Banners, setActivitiesData_Banners] = useState([]);
    const [activitiesData_Banners_V2, setActivitiesData_Banners_V2] = useState([]);
    const [activitiesData_VocationalCertificate, setActivitiesData_VocationalCertificate] = useState([]);
    const [activitiesData_VocationalCertificate_2, setActivitiesData_VocationalCertificate_2] = useState([]);
    const [activitiesData_VocationalCertificate_3, setActivitiesData_VocationalCertificate_3] = useState([]);

    // useEffect(() =>{
    //     fetch(`https://portfolio-proj-v1.vercel.app/api/get/activity?key=${config.api.nonlnwzaPortfolio.key}`).then(response => response.json()).then(response =>{
    //         console.log(response);
    //         setActivitiesData_Banners(response.data.banner ?? []);
    //         setActivitiesData_Banners_V2(response.data.banners_v2  ?? []);
    //         setActivitiesData_VocationalCertificate(response.data.voc_cert  ?? []);
    //         setActivitiesData_VocationalCertificate_2(response.data.voc_cert_2  ?? []);
    //     }).catch(e => console.log(e));
    // }, []);

    useEffect(() =>{
        fetch("https://api-portfolio.aboutnon.in.th/api/v1/activities/all").then(response => response.json()).then(response =>{
            setActivitiesData_VocationalCertificate(response.data.vocational_certificate_1st_year ?? []);
            setActivitiesData_VocationalCertificate_2(response.data.vocational_certificate_2nd_year ?? []);
            setActivitiesData_VocationalCertificate_3(response.data.vocational_certificate_3rd_year ?? []);
        });
        fetch("https://api-portfolio.aboutnon.in.th/api/v1/activities/banners/all").then(response => response.json()).then(response =>{
            setActivitiesData_Banners_V2(response.data.v2  ?? []);
        });
    }, []);


    // translation
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;


    function handleNavigateDetails(id){
        navigate(`/${currentLanguage}/activity/${id}`);
    }

    return(
        <>
            <div className='mt-20 mx-auto'>
                <h1 className='text-center text-[#c7ccd8] text-3xl font-semibold'>
                    {t("Activities")}
                </h1>
            </div>
            {/* -------------- */}

            <div className="mt-14 mx-auto w-full px-5 md:w-full ">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    navigation={false}
                    // loop={true}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    autoplay={{
                        delay: 1200,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Autoplay, EffectCoverflow, Pagination]}
                >
                    {activitiesData_Banners_V2.map((bannerInfo, i) =>(
                        <SwiperSlide key={i}>
                            <Image src={bannerInfo.img} className='rounded-md' />
                        </SwiperSlide>
                    ))}
                    {/* <SwiperSlide>
                        <Image src={singaporeExchange} className='rounded-md' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={stem_2} className='rounded-md' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={pjbl2} className='rounded-md' />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={roverScout} className='rounded-md' />
                    </SwiperSlide> */}
                    
                    {/* {activitiesData_Banners.map((info, i) =>(
                        <SwiperSlide key={i}>
                            <Image src={info.api.img} className='rounded-md' />
                        </SwiperSlide>
                    ))} */}
                </Swiper>
            </div>
            
            <div className='container mx-auto'>          

                <hr className='my-14 w-96 mx-auto' />

                <div className='mt-10 mx-auto w-96 md:w-full'>
                    <div className='mx-auto'>
                        <h1 className='text-center text-[#c7ccd8] text-3xl font-semibold'>
                            {t("Vocational Certificate 3rd Years")}
                        </h1>
                    </div>
                    <div className='grid grid-cols-1 gap-10 w-80 mt-10 mx-auto justify-items-start md:grid-cols-2 md:w-full xl:grid-cols-4'>

                        {activitiesData_VocationalCertificate_3.map((data, i) =>(
                            <div key={i} className="card card-compact bg-base-100 shadow-2xl h-fit cursor-pointer" onClick={() => handleNavigateDetails(data.id)}>
                                <figure>
                                    <LazyLoadImage effect='blur' src={data.img} alt={`activity_img_${i}`} />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title mx-auto text-center font-medium text-lg">
                                        {data.title.join(" ")}
                                    </h2>
                                    <p className='text-center mx-auto font-thin text-md'>
                                        {data.description.join(" ")}
                                    </p>
                                    {/* <div className="card-actions mt-2">
                                        <div className='flex justify-center w-full gap-x-5'>
                                            <button className="btn btn-primary btn-sm">Buy Now</button>
                                            <button className="btn btn-primary btn-sm">Buy Now</button>
                                        </div>
                                    </div> */}
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

                        {activitiesData_VocationalCertificate_2.map((data, i) =>(
                            <div key={i} className="card card-compact bg-base-100 shadow-2xl h-fit cursor-pointer" onClick={() => handleNavigateDetails(data.id)}>
                                <figure>
                                    <LazyLoadImage effect='blur' src={data.img} alt={`activity_img_${i}`} />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title mx-auto text-center font-medium text-lg">
                                        {data.title.join(" ")}
                                    </h2>
                                    <p className='text-center mx-auto font-thin text-md'>
                                        {data.description.join(" ")}
                                    </p>
                                    {/* <div className="card-actions mt-2">
                                        <div className='flex justify-center w-full gap-x-5'>
                                            <button className="btn btn-primary btn-sm">Buy Now</button>
                                            <button className="btn btn-primary btn-sm">Buy Now</button>
                                        </div>
                                    </div> */}
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

                        {activitiesData_VocationalCertificate.map((data, i) =>(
                            <div key={i} className="card card-compact bg-base-100 shadow-2xl h-fit cursor-pointer" onClick={() => handleNavigateDetails(data.id)}>
                                <figure>
                                    <LazyLoadImage effect='blur' src={data.img} alt={`activity_img_${i}`} />
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
                </div>
                            
            </div>
        </>
    );
}


export default Activities;