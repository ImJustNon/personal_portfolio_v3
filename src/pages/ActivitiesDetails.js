import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { config } from '../config/config';
import NotFound from "../pages/NotFound";
import { useTranslation } from 'react-i18next';
import { ChevronLeftIcon } from "@chakra-ui/icons";

import { Box, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import "../styles/SwiperActivityDetailsStyle.css";

import { LazyLoadImage, LazyLoadComponent } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


function ActivitiesDetails(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [activityDetailsData, setActivityDetailsData] = useState(false);

    //translation
    const { t, i18n } = useTranslation();
    const currentLanguage = i18n.language;

    useEffect(() =>{
        fetch(`https://api-portfolio.aboutnon.in.th/api/v1/activities/byid/${id}`).then(response => response.json()).then(response =>{
            if(response.status === "FAIL" || response.data?.length === 0){
                setActivityDetailsData(false);
                document.title = "404: This page could not be found";
                return;
            }
            setActivityDetailsData(response.data);
        }).catch(e =>{
            setActivityDetailsData(false);
            document.title = "404: This page could not be found";
        }); 
    }, []);


    function handleGobackButton(){
        navigate(`/${currentLanguage}/activities`);
    }

    return (
        <>
            {activityDetailsData ?
                (
                    <>
                        <div className='container mx-auto'>
                            <div className='mt-10 text-[#c7ccd8] flex gap-x-3 px-10 md:my-10 md:px-0 md:flex-row md:items-center'>
                                <div>
                                    <ChevronLeftIcon
                                        boxSize="30px"
                                        cursor="pointer"
                                        onClick={() => handleGobackButton()}
                                    />
                                </div>
                                <div className='text-2xl text-[#c7ccd8] w-2/3 md:text-3xl font-medium md:w-auto'>
                                    {activityDetailsData[0].title.join(" ")}
                                </div>
                            </div>
                        </div>
                        <div className='px-5 mt-10 md:px-20'>
                            <Swiper
                                effect={'coverflow'}
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={'auto'}
                                coverflowEffect={{
                                    rotate: 50,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 1,
                                    slideShadows: false,
                                }}
                                autoplay={{
                                    delay: 1500,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    dynamicBullets: true
                                }}
                                modules={[EffectCoverflow, Pagination, Autoplay]}
                            >
                                {activityDetailsData[0].details.photos.map((img, i) =>(
                                    <SwiperSlide key={i}>
                                        <Image src={img} className='rounded-xl' />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className='container mx-auto'>

                            <hr className='mt-14 mb-10 mx-48'/>  
                            
                            <div className='flex flex-col gap-y-5'>
                                <div className='text-center'>
                                    <h1 className='font-bold text-[#c7ccd8] text-2xl'>
                                        {t("Details")}
                                    </h1>
                                </div>
                                <div className='bg-white bg-opacity-40 rounded-2xl w-96 mx-auto p-5 md:w-full'>
                                    <div className='w-full flex flex-col text-center gap-y-5'>
                                        {activityDetailsData[0].details.length === 0 ? "Non Please add details" : ""}
                                        {activityDetailsData[0].details.description.map((info, i) =>(
                                            <p key={i}>
                                                {info}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
                :
                null
            }
        </>
    );
}


export default ActivitiesDetails;