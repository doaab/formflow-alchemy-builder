import React, {useEffect} from "react";
import { useTranslation } from "@/hooks/landing/useTranslation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import Particles from "react-tsparticles";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css"; // استيراد أنماط Swiper الأساسية
import { Link } from "react-router-dom";
import SurveyExamples from "@/components/landing/SurveyExamples"; // استيراد المكون الجديد

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import PackageSection from "@/components/landing/PackageSection.tsx";
const Landing: React.FC = () => {
  const { t } = useTranslation();
// تهيئة Particles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }, []);
  // بيانات العملاء (كما في الكود الأصلي)
  const clients = [
    { id: 1, url: "/landpage/imgs/3eggs-3.png" },
    { id: 2, url: "/landpage/imgs/3riiika.png" },
    { id: 3, url: "/landpage/imgs/casablanca hotel.png" },
    { id: 4, url: "/landpage/imgs/Coocoon.png" },
    { id: 5, url: "/landpage/imgs/ebtal-logo.png" },
    { id: 6, url: "/landpage/imgs/gf.png" },
    { id: 12, url: "/landpage/imgs/Gro in.png" },
    { id: 8, url: "/landpage/imgs/Rose.png" },
    { id: 8, url: "/landpage/imgs/Talents in.png" },
    { id: 9, url: "/landpage/imgs/Tethkar-4.png" },
    { id: 10, url: "/landpage/imgs/مجمع-الملك-عبدالله-الطبي.png" },
    { id: 11, url: "/landpage/imgs/مهديب.png" },
  ];
  return (

      <div className="min-h-screen bg-white" >

        {/* Header */}
        <header  className="bg-[#8363aa] text-white py-4 fixed w-full  shadow-sm z-50  before:absolute before:top-0
      before:content-['']
      before:w-1/2
      before:h-[calc(100%-250px)]
       before:bg-[rgba(59,45,89,0.08)]">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="68" viewBox="0 0 128 68" className="logo2">
                  <g id="Group_131928" data-name="Group 131928" transform="translate(-1271.958 -80)">
                    <rect id="Rectangle_15390" data-name="Rectangle 15390" width="128" height="68" rx="5"
                          transform="translate(1271.958 80)" fill="#fff" opacity="0"></rect>
                    <g id="Group_132074" data-name="Group 132074" transform="translate(1281.053 -105.68)">
                      <path id="Path_150429" data-name="Path 150429"
                            d="M293.178,210.033a1.548,1.548,0,0,0,.464-1.132V205.65h-3.483a1.583,1.583,0,0,0-1.6,1.6V210.5h3.483A1.54,1.54,0,0,0,293.178,210.033Z"
                            transform="translate(-190.205 -3.935)" fill="#fff"></path>
                      <path id="Path_150430" data-name="Path 150430"
                            d="M288.6,265.166h5.024a.888.888,0,1,0,0-1.776H288.6Z"
                            transform="translate(-190.232 -41.995)" fill="#fff"></path>
                      <path id="Path_150431" data-name="Path 150431"
                            d="M246.27,249.815v1.667h21.18a6.1,6.1,0,0,0,6.1-6.1v-6.22a7.564,7.564,0,0,0-.59-3.02,7.163,7.163,0,0,0-4.257-4.179,6.7,6.7,0,0,0-2.785-.668h-5.331a7.35,7.35,0,0,0-2.942.668,6.976,6.976,0,0,0-4.175,4.179,7.556,7.556,0,0,0-.671,3.02l-.017,7.788h5.051v-6.064c0-3.061,1.275-4.71,3.821-4.813l2.734-.007a3.6,3.6,0,0,1,3.828,2.768h-6.623a.89.89,0,1,0,0,1.779h6.868v1.329a5.506,5.506,0,0,1-.978,3.453,3.662,3.662,0,0,1-3.071,1.37H248.646"
                            transform="translate(-162.33 -20.836)" fill="#fff"></path>
                      <path id="Path_150432" data-name="Path 150432"
                            d="M272.955,236.157a7.163,7.163,0,0,0-4.257-4.179,6.7,6.7,0,0,0-2.785-.668h-3.794l-.181,4.772c.058,0,2.6,0,2.659,0a3.557,3.557,0,0,1,3.613,2.764h-6.623a.89.89,0,1,0,0,1.779h6.868v1.329a5.506,5.506,0,0,1-.978,3.453,3.662,3.662,0,0,1-3.071,1.37H248.646l-2.376,3.051V251.5h21.177a6.1,6.1,0,0,0,6.1-6.1v-6.22A7.535,7.535,0,0,0,272.955,236.157Z"
                            transform="translate(-162.33 -20.849)" fill="#fff"></path>
                      <g id="Group_132069" data-name="Group 132069" transform="translate(0 199.683)">
                        <path id="Path_150433" data-name="Path 150433"
                              d="M15.59,214.933c-1.462,0-2.188-.763-2.188-2.3v-.566q0-2.372,2.113-2.372h4.428l0-2.785h-5.2a3.436,3.436,0,0,0-1.571.307,3.983,3.983,0,0,0-2.628,3.92v2.427a3.879,3.879,0,0,0,.228,1.363H8.552v2.86H20.717v-2.86H15.59Zm8.944-15.243-.01,22.21q0,4.054-4.745,4.053H9.564q-4.847,0-4.847-4.053V210.478H0v12.455a6.769,6.769,0,0,0,.539,2.941,7.9,7.9,0,0,0,2.836,3.477A7.564,7.564,0,0,0,7.73,230.67H21.582a7.571,7.571,0,0,0,4.383-1.319,7.833,7.833,0,0,0,2.867-3.477,8.692,8.692,0,0,0,.539-2.941l.01-23.242Z"
                              transform="translate(0 -199.69)" fill="#fff"></path>
                        <path id="Path_150434" data-name="Path 150434"
                              d="M115.229,210.4v12.451a7.4,7.4,0,0,1-.62,2.942,7.817,7.817,0,0,1-2.86,3.483,7.607,7.607,0,0,1-4.383,1.312H97.75l.014-30.894h4.847l-.01,26.174h2.959q4.826,0,4.826-4.046V210.4Z"
                              transform="translate(-64.432 -199.69)" fill="#fff"></path>
                        <path id="Path_150435" data-name="Path 150435"
                              d="M118.325,302.59a1.517,1.517,0,0,0-1.111.464,1.446,1.446,0,0,0-.464,1.053v3.252h3.477a1.589,1.589,0,0,0,1.575-1.6v-3.17Z"
                              transform="translate(-76.956 -267.517)" fill="#fff"></path>
                        <path id="Path_150436" data-name="Path 150436"
                              d="M213.641,302.59a1.5,1.5,0,0,0-1.1.464,1.449,1.449,0,0,0-.467,1.053v3.252h3.483a1.589,1.589,0,0,0,1.575-1.6v-3.17Zm5.961,0a1.506,1.506,0,0,0-1.111.464,1.537,1.537,0,0,0-.464,1.135v3.17H221.5a1.589,1.589,0,0,0,1.575-1.6v-3.17Z"
                              transform="translate(-139.787 -267.517)" fill="#fff"></path>
                      </g>
                      <path id="Path_150437" data-name="Path 150437"
                            d="M226.279,246.322a6.177,6.177,0,0,0,.484-2.771V231.1h-4.826v11.422q0,4.049-4.768,4.046h-3.48l-2.2,3.034v1.684H219a7.6,7.6,0,0,0,4.356-1.343,4.139,4.139,0,0,0,.62-.464A7.688,7.688,0,0,0,226.279,246.322Zm-.058.17"
                            transform="translate(-139.404 -20.711)" fill="#fff"></path>
                      <path id="Path_150438" data-name="Path 150438"
                            d="M180.572,243.686a6.962,6.962,0,0,1-.542,3.016,7.133,7.133,0,0,1-4.254,4.254,8.6,8.6,0,0,1-2.938.542H160.383l.051-4.717h11.371a3.649,3.649,0,0,0,3.068-1.367,5.5,5.5,0,0,0,.978-3.456V240.9q0-4.745-4.049-4.745H160.38V231.31h12.455a7.059,7.059,0,0,1,2.938.593,7.823,7.823,0,0,1,4.8,7.192v4.591Z"
                            transform="translate(-105.715 -20.849)" fill="#fff"></path>
                      <g id="Group_132070" data-name="Group 132070" transform="translate(41.975 199.68)">
                        <path id="Path_150439" data-name="Path 150439"
                              d="M127.2,199.69h-3.722a.357.357,0,0,0-.259.072.349.349,0,0,0-.072.249v6.473h1.183V203.61h2.406v-1.1h-2.406v-1.725h2.87a.378.378,0,0,0,.256-.065.34.34,0,0,0,.072-.249v-.457a.32.32,0,0,0-.072-.249A.357.357,0,0,0,127.2,199.69Z"
                              transform="translate(-123.15 -199.687)" fill="#fff"></path>
                        <path id="Path_150440" data-name="Path 150440"
                              d="M166.724,205.119a1.884,1.884,0,0,0-.678-.412,2.921,2.921,0,0,0-.968-.147,2.29,2.29,0,0,0-1.622.518,1.981,1.981,0,0,0-.556,1.507v1.1a2.493,2.493,0,0,0,.123.8,1.624,1.624,0,0,0,.382.641,1.731,1.731,0,0,0,.668.416,3.493,3.493,0,0,0,2.27-.092,1.68,1.68,0,0,0,.743-.661c.136-.208.1-.368-.112-.467l-.331-.177a.415.415,0,0,0-.266-.072.453.453,0,0,0-.215.184,1,1,0,0,1-.416.368,1.586,1.586,0,0,1-.689.133,1.194,1.194,0,0,1-.794-.239.87.87,0,0,1-.276-.7v-.348h2.829a.407.407,0,0,0,.337-.112.472.472,0,0,0,.085-.3V206.5a2.251,2.251,0,0,0-.126-.76A1.518,1.518,0,0,0,166.724,205.119Zm-.569,1.524h-2.164v-.208a.912.912,0,0,1,.276-.709,1.2,1.2,0,0,1,.815-.249,1.165,1.165,0,0,1,.8.249.9.9,0,0,1,.269.709v.208Z"
                              transform="translate(-149.351 -202.897)" fill="#fff"></path>
                        <path id="Path_150441" data-name="Path 150441"
                              d="M146.294,205.119a1.884,1.884,0,0,0-.678-.412,2.921,2.921,0,0,0-.968-.147,2.29,2.29,0,0,0-1.622.518,1.973,1.973,0,0,0-.556,1.507v1.1a2.493,2.493,0,0,0,.123.8,1.624,1.624,0,0,0,.382.641,1.732,1.732,0,0,0,.668.416,3.493,3.493,0,0,0,2.27-.092,1.68,1.68,0,0,0,.743-.661c.136-.208.1-.368-.112-.467l-.331-.177a.415.415,0,0,0-.266-.072.453.453,0,0,0-.215.184,1,1,0,0,1-.416.368,1.586,1.586,0,0,1-.689.133,1.194,1.194,0,0,1-.794-.239.87.87,0,0,1-.276-.7v-.348h2.829a.407.407,0,0,0,.337-.112.472.472,0,0,0,.085-.3V206.5a2.252,2.252,0,0,0-.126-.76A1.518,1.518,0,0,0,146.294,205.119Zm-.569,1.524h-2.164v-.208a.912.912,0,0,1,.276-.709,1.2,1.2,0,0,1,.815-.249,1.165,1.165,0,0,1,.8.249.9.9,0,0,1,.269.709v.208Z"
                              transform="translate(-135.885 -202.897)" fill="#fff"></path>
                        <path id="Path_150442" data-name="Path 150442"
                              d="M206.482,201.35a3.436,3.436,0,0,0-.627.055c-.187.034-.358.072-.5.1V199.98a.323.323,0,0,0-.061-.225.288.288,0,0,0-.218-.065h-.518a.323.323,0,0,0-.225.065.316.316,0,0,0-.065.225v6.3s1.663.208,2.045.208a2.2,2.2,0,0,0,1.6-.508,1.977,1.977,0,0,0,.518-1.476v-1.268a1.943,1.943,0,0,0-.467-1.391A1.983,1.983,0,0,0,206.482,201.35Zm.859,3.122q0,1.023-1.1,1.023a2.33,2.33,0,0,1-.8-.113.112.112,0,0,1-.061-.041.133.133,0,0,1-.014-.061v-2.768c.112-.034.249-.072.416-.113a2.7,2.7,0,0,1,.549-.055,1.085,1.085,0,0,1,.763.235.905.905,0,0,1,.256.689Z"
                              transform="translate(-176.62 -199.687)" fill="#fff"></path>
                        <path id="Path_150443" data-name="Path 150443"
                              d="M227.788,205.109a1.525,1.525,0,0,0-.617-.406,2.8,2.8,0,0,0-.961-.143,2.515,2.515,0,0,0-1.21.259,1.657,1.657,0,0,0-.729.712.3.3,0,0,0-.041.256.371.371,0,0,0,.2.167l.378.164a.337.337,0,0,0,.228.034.521.521,0,0,0,.174-.177,1.074,1.074,0,0,1,.982-.447.94.94,0,0,1,.733.239,1.044,1.044,0,0,1,.2.688v.259c-.082,0-.2-.014-.372-.024s-.348-.02-.525-.02a5.21,5.21,0,0,0-.968.082,1.72,1.72,0,0,0-.661.256.993.993,0,0,0-.378.464,1.841,1.841,0,0,0-.123.712,2.092,2.092,0,0,0,.092.648,1.029,1.029,0,0,0,.331.477,1.536,1.536,0,0,0,.641.3,4.49,4.49,0,0,0,1.023.1h2.025v-3.207a2.945,2.945,0,0,0-.1-.77A1.464,1.464,0,0,0,227.788,205.109Zm-.661,3.483v.2h-1.04a1.763,1.763,0,0,1-.443-.041.649.649,0,0,1-.276-.126.453.453,0,0,1-.133-.2,1.057,1.057,0,0,1-.031-.259.545.545,0,0,1,.184-.447,1.149,1.149,0,0,1,.719-.164c.092,0,.187,0,.286,0s.194.01.286.014.177.01.259.02.143,0,.187,0Z"
                              transform="translate(-189.692 -202.897)" fill="#fff"></path>
                        <path id="Path_150444" data-name="Path 150444"
                              d="M248.251,208.026l-.423-.123a.375.375,0,0,0-.256-.014.332.332,0,0,0-.157.2.966.966,0,0,1-.361.474,1.133,1.133,0,0,1-.661.174,1.069,1.069,0,0,1-.764-.239.886.886,0,0,1-.256-.678v-1.391a.872.872,0,0,1,.256-.682,1.1,1.1,0,0,1,.764-.235,1.181,1.181,0,0,1,.668.164.938.938,0,0,1,.358.464.393.393,0,0,0,.157.218.279.279,0,0,0,.256-.02l.412-.133a.459.459,0,0,0,.215-.153.381.381,0,0,0,0-.269,1.781,1.781,0,0,0-.678-.876,2.793,2.793,0,0,0-2.962.157,1.893,1.893,0,0,0-.525,1.411v1.3a1.922,1.922,0,0,0,.5,1.4,2.107,2.107,0,0,0,1.568.515,2.469,2.469,0,0,0,1.353-.32,1.9,1.9,0,0,0,.74-.927.3.3,0,0,0,.014-.266A.522.522,0,0,0,248.251,208.026Z"
                              transform="translate(-203 -202.897)" fill="#fff"></path>
                        <path id="Path_150445" data-name="Path 150445"
                              d="M267.613,203.869a1.178,1.178,0,0,0-.378-.3l1.415-1.752c.177-.225.112-.337-.187-.337h-.457a1.447,1.447,0,0,0-.348.024.444.444,0,0,0-.218.187l-1.271,1.66h-.487V199.98a.342.342,0,0,0-.061-.235.317.317,0,0,0-.239-.065H264.9a.328.328,0,0,0-.239.065.324.324,0,0,0-.065.235v6.5h1.084V204.37h.566a.861.861,0,0,1,.467.106.786.786,0,0,1,.279.351l.579,1.247c.051.112.187.4.187.4h1.21l-1.057-2.127A2.663,2.663,0,0,0,267.613,203.869Z"
                              transform="translate(-216.387 -199.68)" fill="#fff"></path>
                        <path id="Path_150446" data-name="Path 150446"
                              d="M187.232,199.69h-.518a.288.288,0,0,0-.218.065.317.317,0,0,0-.061.225v1.527c-.143-.031-.31-.065-.5-.1a3.435,3.435,0,0,0-.627-.055,1.971,1.971,0,0,0-1.483.494,1.938,1.938,0,0,0-.467,1.391V204.5a1.991,1.991,0,0,0,.518,1.476,2.2,2.2,0,0,0,1.6.508c.382,0,2.045-.208,2.045-.208v-6.3a.322.322,0,0,0-.065-.225A.307.307,0,0,0,187.232,199.69Zm-.8,5.59a.134.134,0,0,1-.014.061.141.141,0,0,1-.061.041,2.415,2.415,0,0,1-.8.113c-.74,0-1.1-.341-1.1-1.023v-1.207a.9.9,0,0,1,.256-.688,1.1,1.1,0,0,1,.764-.235,2.647,2.647,0,0,1,.549.055c.167.041.307.075.416.113v2.771Z"
                              transform="translate(-162.838 -199.687)" fill="#fff"></path>
                      </g>
                    </g>
                  </g>
                </svg>
                <span className="text-medium-12 text-font-sub text-white"
                >
           {t("Smart_Applications_Foundation_For_Information_Technology")}
              </span>

              </div>
            </div>
            <div className="flex items-center">
              <NavigationMenu className="ml-8 hidden md:flex">
                <NavigationMenuList  className="group flex flex-1 list-none items-center justify-center gap-[50px] pl-0">
                  <NavigationMenuItem>
                    <NavigationMenuLink href="#features" className="text-white hover:text-white/80">
                      {t("features")}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="ml-4">
                    <NavigationMenuLink href="#pricing" className="text-white hover:text-white/80">
                      {t("pricing")}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="ml-4">
                    <NavigationMenuLink href="#faq" className="text-white hover:text-white/80">
                      {t("faq")}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="ml-4">
                    <NavigationMenuLink href="#contact" className="text-white hover:text-white/80">
                      {t("contactUs")}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            <div className="space-x-4">
              <Link to="/login" className="text-white
            items-center
    flex justify-center
    bg-[#8363aa]
    rounded-[12px]
    h-[54px]
    text-[16px] leading-[30px]
    px-[32px]
    border border-white
    font-[Neo_Sans_Medium] hover:underline ">{t("login")}</Link>
            </div>
          </div>
        </header>
        {/* Hero Section */}
        <section
            className="relative bg-[#8363aa] pt-60 text-white py-24 overflow-hidden
           before:absolute before:top-0
      before:content-['']
      before:w-1/2
      before:h-[calc(100%-250px)]
       before:bg-[rgba(59,45,89,0.08)]"
            style={{
              backgroundImage: "linear-gradient(135deg, #8363aa 0%, #5a3f7d 100%)", // تدرج لوني
            }}
        >
          {/* خلفية زخرفية (مثل دوائر أو أشكال) */}
          <div className="absolute inset-0 pointer-events-none">
            <Particles
                id="tsparticles"
                className="absolute top-0 left-0 w-full h-full z-0"
                options={{
                  fullScreen: { enable: false },
                  background: {
                    color: {
                      value: "#8363aa",
                    },
                  },
                  particles: {
                    number: {
                      value: 10,
                    },
                    size: {
                      value: 3,
                    },
                    move: {
                      enable: true,
                      speed: 1,
                    },
                    color: {
                      value: "#b392db",
                    },
                    links: {
                      enable: false,
                      color: "#000000",
                      distance: 150,
                      opacity: 0.4,
                      width: 1,
                    },
                  },
                }}
            />

          </div>
          <div className="container mx-auto px-4 relative z-10">
            {/* النص والأزرار في الأعلى */}
            <div className="text-center mb-16 flex">
              <div className="flex  justify-center md:w-1/2">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 leading-tight animate-fade-in">
                  {t("measureAndImproveCustomerExperience")}
                </h1>
              </div>

              <div className="flex md:w-1/2   justify-center">
                <div className="flex justify-center space-x-4">
                  <p className="mb-8 text-lg md:text-xl  text-white/90 leading-relaxed animate-fade-in-delay">
                    {t("heroDescription")}
                    <br/>
                    <Button className="bg-yellow-500 mr-3 ml-4 mt-12 text-black hover:bg-yellow-400 px-6 py-3 text-lg font-semibold rounded-md transition-all duration-300">
                      {t("startNow")}
                    </Button>
                    <Button
                        variant="outline"
                        className="border-white text-white bg-[#8363aa] mr-3 ml-4 mt-3  hover:bg-white/20 px-6 py-3 text-lg font-semibold rounded-md transition-all duration-300"
                    > <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className=""><g
                    id="Group_132263" data-name="Group 132263" transform="translate(-173.568 -619)"><g
                    id="Rectangle_110312" data-name="Rectangle 110312" transform="translate(173.567 619)"
                    fill="rgba(255,255,255,0)" stroke="#fff" stroke-width="1" opacity="0"><rect width="24" height="24"
                                                                                                stroke="none"></rect><rect
                    x="0.5" y="0.5" width="23" height="23" fill="none"></rect></g><path id="Path_1637"
                                                                                        data-name="Path 1637"
                                                                                        d="M1370.75,2788a9.25,9.25,0,1,1,9.25,9.25A9.248,9.248,0,0,1,1370.75,2788Zm9.25-10.75a10.75,10.75,0,1,0,10.75,10.75A10.746,10.746,0,0,0,1380,2777.25Zm.9,7.78-.03-.01a8.369,8.369,0,0,0-.98-.62,1.857,1.857,0,0,0-.99-.28,1.744,1.744,0,0,0-1.3.69,1.9,1.9,0,0,0-.32.99c-.03.31-.03.7-.03,1.15v2.1c0,.45,0,.84.03,1.15a1.9,1.9,0,0,0,.32.99,1.744,1.744,0,0,0,1.3.69,1.857,1.857,0,0,0,.99-.28,8.369,8.369,0,0,0,.98-.62l.03-.01,1.52-1.01.03-.02h0c.31-.21.58-.39.79-.56a1.777,1.777,0,0,0,.57-.71,1.73,1.73,0,0,0,0-1.34,1.777,1.777,0,0,0-.57-.71c-.21-.17-.48-.35-.79-.56l-.03-.02Zm-2.09.68a.258.258,0,0,1,.16-.09,1.19,1.19,0,0,1,.21.09c.21.12.48.29.89.57l1.52,1.01c.34.23.56.38.71.5a.855.855,0,0,1,.13.12.279.279,0,0,1,0,.18.855.855,0,0,1-.13.12c-.15.12-.37.27-.71.5l-1.52,1.01c-.41.28-.68.45-.89.57a1.19,1.19,0,0,1-.21.09.258.258,0,0,1-.16-.09,1.011,1.011,0,0,1-.04-.22c-.02-.24-.02-.56-.02-1.06v-2.02c0-.5,0-.82.02-1.06A1.011,1.011,0,0,1,1378.81,2785.71Z"
                                                                                        transform="translate(-1194.433 -2157)"
                                                                                        fill="#fff"
                                                                                        fill-rule="evenodd"></path></g></svg>
              </span>
                      {t("watchHow")}
                    </Button>
                  </p>
                </div>
              </div>
            </div>

            {/* الصورة في الأسفل */}
            <div className="flex justify-center">
              <img
                  src="/landpage/main-section.webp" // التابلت
                  alt="Tablet Dashboard Preview"
                  className="rounded-lg  max-w-[60%] mb-6 transform hover:scale-105 transition-transform duration-500 z-20"
              />
            </div>
          </div>
        </section>
        {/* Partners Section */}
        {/*<section className="py-10 bg-[#8363aa]/10">*/}
        {/*  <div className="container mx-auto px-4 text-center">*/}
        {/*    <h2 className="text-xl font-semibold mb-8 text-gray-700">{t("clientsTrustUs")}</h2>*/}
        {/*    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">*/}
        {/*      {Array.from({length: 8}).map((_, index) => (*/}
        {/*          <div key={index} className="opacity-70 hover:opacity-100 transition-opacity">*/}
        {/*            <div className="w-20 h-10 bg-gray-200/50 rounded flex items-center justify-center">*/}
        {/*              <span className="text-sm text-gray-500">Logo {index + 1}</span>*/}
        {/*            </div>*/}
        {/*          </div>*/}
        {/*      ))}*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}

        <div id="our-clients" style={{ backgroundColor: "#fff", display: "flex", flexDirection: "column" }}>
          {/* العنوان (Chip) */}
          <div className="mx-auto mt-7 mb-7 px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm font-medium">
            {t("clientsTrustUs")}
          </div>

          {/* قسم السلايدر */}
          <section id="client-section" className="bg-[#8363aa]">
            <Swiper
                slidesPerView={9}
                spaceBetween={20} // تقليل المسافة بين الشرائح لتجنب الفراغات
                autoplay={{
                  delay: 0,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
                speed={4000}
                loopAdditionalSlides={9} // إضافة عدد الشرائح المرئية لضمان الحلقة السلسة
                modules={[Autoplay]}
                breakpoints={{
                  360: { slidesPerView: 3, spaceBetween: 10 },
                  700: { slidesPerView: 5, spaceBetween: 15 },
                  1024: { slidesPerView: 9, spaceBetween: 20 },
                }}
                className="swiper"
            >
              {clients.map((item, i) => (
                  <SwiperSlide key={i} className={`slide--${i}`}>
                    <img
                        src={item.url}
                        alt="client"
                        style={{ maxWidth: "80px", maxHeight: "80px", width: "auto", height: "auto", objectFit: "contain" }}
                    />
                  </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </div>
        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center mb-16  justify-center">
              <div className="md:w-1/2 mb-8 md:mb-0 text-center">
                <img
                    src="/landpage/about-1.webp"
                    alt="{t('transformCustomerFeedback')}"
                    className="max-w-60 rounded-lg block mx-auto"
                />
              </div>
              <div className="md:w-1/2 md:pl-12 text-center  justify-center">
                <h3 className="text-3xl font-bold mb-4 text-[#8363aa]">
                  {t("transformCustomerFeedback")}
                </h3>
                <p className="text-gray-600 text-2xl mb-6 leading-relaxed">
                  {t("transformCustomerFeedbackDes")}
                </p>
              </div>
            </div>

          </div>
        </section>
        {/* Features Section */}
        <section id="features_2" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col mt-7 md:flex-row-reverse  justify-center">
              <div className="md:w-1/2 mb-8 md:mb-0 text-center">
                <img
                    src="/landpage/about-2.webp"
                    alt="Brand Development"
                    className="max-w-60 rounded-lg align-middle block mx-auto"
                />
              </div>
              <div className="md:w-1/2 md:pr-12  justify-center">
                <h3 className="text-3xl font-bold mb-4 text-[#8363aa]">
                  {t("developYourBrand")}
                </h3>
                <p className="text-gray-600 mb-6  text-2xl leading-relaxed">
                  {t("developYourBrandDes")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features_3" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center mb-16  justify-center">
              <div className="md:w-1/2 mb-8 md:mb-0 text-center">
                <img
                    src="/landpage/about-3.webp"
                    alt="{t('Loyalty')}"
                    className="max-w-60 rounded-lg block mx-auto"
                />
              </div>
              <div className="md:w-1/2 md:pl-12 text-center  justify-center">
                <h3 className="text-3xl font-bold mb-4 text-[#8363aa]">
                  {t("Loyalty")}
                </h3>
                <p className="text-gray-600 text-2xl mb-6 leading-relaxed">
                  {t("LoyaltyDes")}
                </p>
              </div>
            </div>

          </div>
        </section>
        {/* Features Section */}
        <section id="features_4" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col mt-7 md:flex-row-reverse  justify-center">
              <div className="md:w-1/2 mb-8 md:mb-0 text-center">
                <img
                    src="/landpage/about-4.webp"
                    alt="Brand Development"
                    className="max-w-60 rounded-lg align-middle block mx-auto"
                />
              </div>
              <div className="md:w-1/2 md:pr-12  justify-center">
                <h3 className="text-3xl font-bold mb-4 text-[#8363aa]">
                  {t("goal")}
                </h3>
                <p className="text-gray-600 mb-6  text-2xl leading-relaxed">
                  {t("goalDes")}
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section id="features_5" className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center mb-16  justify-center">
              <div className="md:w-1/2 mb-8 md:mb-0 text-center">
                <img
                    src="/landpage/about-3.webp"
                    alt="{t('marketing')}"
                    className="max-w-60 rounded-lg block mx-auto"
                />
              </div>
              <div className="md:w-1/2 md:pl-12 text-center  justify-center">
                <h3 className="text-3xl font-bold mb-4 text-[#8363aa]">
                  {t("marketing")}
                </h3>
                <p className="text-gray-600 text-2xl mb-6 leading-relaxed">
                  {t("marketingDes")}
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* Data Driven Section */}
        <section className="py-16 bg-[#8363aa] text-white">
          <div className="container mx-auto px-4 text-center">
              <div className="bg-[url()]">

                <h2 className="text-3xl font-bold mb-6">
                  {t("createSurvey")}
                </h2>
                <p className="max-w-2xl mx-auto mb-8 leading-relaxed">
                  {t("createSurveyDes")}
                </p>
              </div>

            <Button className="bg-yellow-500 text-black hover:bg-yellow-400 py-2 px-6 text-lg">
              {t("startNow")}
            </Button>
          </div>
        </section>

        {/* قسم Survey Examples */}
        <SurveyExamples />
        <PackageSection />

        {/* Plans Section */}
        <section id="pricing" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#8363aa]">
              {t("whichPlanForYou")}
            </h2>

            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-gray-200 rounded-full p-1">
                <button className="px-6 py-2 rounded-full bg-[#8363aa] text-white">
                  {t("monthly")}
                </button>
                <button className="px-6 py-2 rounded-full text-gray-700">
                  {t("annual")}
                </button>
              </div>
              <div className="ml-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {t("save")} 10%
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Plan */}
              <Card className="border border-gray-200">
                <CardContent className="p-0">
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-bold text-center">{t("basic")}</h3>
                    <div className="mt-4 text-center">
                      <div className="text-3xl font-bold">{t("free")}</div>
                      <p className="text-sm text-gray-500 mt-1">{t("monthly")}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {[1, 2, 3, 4, 5].map(item => (
                        <div key={item} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{t(`basicFeature${item}`)}</span>
                        </div>
                    ))}
                  </div>

                  <div className="p-6 text-center">
                    <Button className="w-full bg-[#8363aa]">
                      {t("choosePlan")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Standard Plan */}
              <Card className="border-2 border-[#8363aa] shadow-lg">
                <CardContent className="p-0">
                  <div className="p-6 border-b bg-[#8363aa] text-white">
                    <h3 className="text-xl font-bold text-center">{t("standard")}</h3>
                    <div className="mt-4 text-center">
                      <div className="text-3xl font-bold">99 {t("sar")}</div>
                      <p className="text-sm mt-1">{t("monthly")}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {[1, 2, 3, 4, 5, 6, 7].map(item => (
                        <div key={item} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{t(`standardFeature${item}`)}</span>
                        </div>
                    ))}
                  </div>

                  <div className="p-6 text-center">
                    <Button className="w-full bg-[#8363aa]">
                      {t("choosePlan")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="border border-gray-200">
                <CardContent className="p-0">
                  <div className="p-6 border-b">
                    <h3 className="text-xl font-bold text-center">{t("professional")}</h3>
                    <div className="mt-4 text-center">
                      <div className="text-3xl font-bold">199 {t("sar")}</div>
                      <p className="text-sm text-gray-500 mt-1">{t("monthly")}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
                        <div key={item} className="flex items-start">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{t(`proFeature${item}`)}</span>
                        </div>
                    ))}
                  </div>

                  <div className="p-6 text-center">
                    <Button className="w-full bg-[#8363aa]">
                      {t("choosePlan")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#8363aa]">
              {t("faqTitle")}
            </h2>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map(item => (
                    <AccordionItem key={item} value={`faq-${item}`} className="border rounded-lg px-4">
                      <AccordionTrigger className="text-left py-4">
                        {t(`faqQuestion${item}`)}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 text-gray-600">
                        {t(`faqAnswer${item}`)}
                      </AccordionContent>
                    </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-[#8363aa] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {t("haveAQuestion")}
            </h2>

            <div className="max-w-md mx-auto">
              <div className="grid grid-cols-1 gap-4 mb-4">
                <input
                    type="text"
                    placeholder={t("enterName")}
                    className="px-4 py-2 rounded-md text-black"
                />
                <input
                    type="email"
                    placeholder="example123@gmail.com"
                    className="px-4 py-2 rounded-md text-black"
                />
                <textarea
                    rows={4}
                    placeholder={t("whatIsYourQuestion")}
                    className="px-4 py-2 rounded-md text-black"
                ></textarea>
              </div>

              <Button className="bg-yellow-500 text-black hover:bg-yellow-400 w-full">
                {t("send")}
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#311b48] text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <img
                    src="/lovable-uploads/11d2ec45-5b86-4c32-a160-cef6687fdf18.png"
                    alt="Feedback Logo"
                    className="h-10 mb-4"
                />
                <p className="text-white/70 mb-4">
                  {t("companyDescription")}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">{t("main")}</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="hover:underline">{t("features")}</a></li>
                  <li><a href="#pricing" className="hover:underline">{t("pricing")}</a></li>
                  <li><a href="#faq" className="hover:underline">{t("faq")}</a></li>
                  <li><a href="#contact" className="hover:underline">{t("contactUs")}</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">{t("legalLinks")}</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline">{t("privacyPolicy")}</a></li>
                  <li><a href="#" className="hover:underline">{t("termsAndConditions")}</a></li>
                  <li><a href="#" className="hover:underline">{t("cookiePolicy")}</a></li>
                  <li><a href="#" className="hover:underline">{t("aboutUs")}</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">{t("contactUs")}</h3>
                <p className="mb-2">info@feedback.sa</p>
                <p className="mb-4">+966 123 456 789</p>
                <div className="flex space-x-4 mt-4">
                  <a href="#" className="hover:text-gray-300">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="hover:text-gray-300">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="hover:text-gray-300">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.668.25 1.272.644 1.772 1.153a4.965 4.965 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.965 4.965 0 01-1.153 1.772 4.965 4.965 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.965 4.965 0 01-1.772-1.153 4.965 4.965 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.965 4.965 0 011.153-1.772A4.965 4.965 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center text-sm border-t border-gray-600 pt-8">
              <p>{t("allRightsReserved")} © 2025</p>
            </div>
          </div>
        </footer>
      </div>
  );
};

export default Landing;
