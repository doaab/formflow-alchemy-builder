import { useTranslation } from "../../hooks/useTranslation";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

// مكون الأيقونات (بديل لـ <component :is="item.icon">)
const IconComponent = ({ iconName }) => {
    // يمكنك استبدال هذا بمكتبة أيقونات مثل react-icons أو ملفات SVG
    const iconMap = {
        "hospitals-icon": "🏥",
        "hotels-icon": "🏨",
        "activities-icon": "🎉",
        "restaurents-icon": "🍴",
        "airports-icon": "✈️",
        "shops-icon": "🛍️",
        "parks-icon": "🌳",
        "governments-icon": "🏛️",
        "companies-icon": "🏢",
        "transportations-icon": "🚗",
    };

    return <span className="text-4xl mb-4">{iconMap[iconName] || "📊"}</span>;
};

const SurveyExamples = () => {
    const { t, currentLanguage } = useTranslation();

    // بيانات الاستبيانات (كما في الكود الأصلي)
    const surveys_ar = [
        {
            icon: "hospitals-icon",
            title: "القطاع الصحي (المستشفيات والعيادات والصيدليات)",
            content:
                "نمكنك من الحصول على ردود فعل موثوقة من المرضى حول مستوى الخدمة الطبیة التي تقدمھا، بما في ذلك كفاءة ومھارة طاقم التمریض والأطباء وأي مقترحات أخرى لتحسین الخدمة.",
        },
        {
            icon: "hotels-icon",
            title: "الضيافة (الفنادق والمنتجعات)",
            content:
                "كن على اطلاع دائم حول رأي النزلاء في مایتعلق یمستوى جودة الخدمة ونظافة الغرف وغیرھا من الجوانب التي تساعدك على تطویر علامتك التجاریة.",
        },
        {
            icon: "activities-icon",
            title: "المؤتمرات والفعاليات",
            content:
                "استطلع رضا الزوار عن مستوى التنظیم والخدمات وكفاءة واحترافیة الموظفین عبر استخدام أسئلة دقیقة وموضوعیة.",
        },
        {
            icon: "restaurents-icon",
            title: "المطاعم والمقاھي",
            content:
                "حصل على تقییم عملائك لجودة الطعام والخدمة وغیرھا من خلال أسئلة شاملة ودقیقة مما یساعدك على تطویر خدماتك والحفاظ على عملاءك.",
        },
        {
            icon: "airports-icon",
            title: "المطارات والقطارات",
            content:
                "استكشف توقعات عملائك ورضاھم عن خدماتك المختلفة، باستخدام أسئلة موضوعیة ودقیقة.",
        },
        {
            icon: "shops-icon",
            title: "الأسواق والمعارض التجاریة",
            content:
                "قم بمتابعة رأي عملاءك وتقییمھم لجودة منتجاتك والخدمات الأخرى التي تقدمھا، لمعرفة توقعاتھم واحتیاجاتھم وطرق تحسین صورتك الذھنیة مما یساعد على تحقیق المزید من المبیعات.",
        },
        {
            icon: "parks-icon",
            title: "الحدائق والمنتزھات العائلیة",
            content:
                "تمكّن من معرفة رأي زوارك في جودة خدمات المنتزه وجمع اقتراحات التحسین التي تساھم في تحقیق التفوق وضمان رضا العملاء.",
        },
        {
            icon: "governments-icon",
            title: "الوزارات والجھات الحكومیة",
            content:
                "منصة متكاملة للإستماع إلى آراء المواطنین للتعرف على التحدیات التي تواجھھم والإقتراحات التي تلبي احتیاجاتھم وتحقق رغباتھم.",
        },
        {
            icon: "companies-icon",
            title: "رأس المال البشري",
            content:
                "منصة فیدباك تدعم قرارات مدراء الموارد البشریة في تحقیق أفضل النتائج وزیادة رضا وإنتاجیة الموظفین، بواسطة أسئلة دقیقة ومكافآت مجانیة من شركاء المنصة.",
        },
        {
            icon: "transportations-icon",
            title: "النقل والمواصلات",
            content:
                "من خلال معرفة تحدیات عملائك بشكل دقیق في التزام السائق بالمواعید - نظافة المركبة - اللباقة - وغیرھا من الأسئلة التي تساعدك على تطویر خدمتك والتمیز عن المنافسین.",
        },
    ];

    const surveys_en = [
        {
            icon: "hospitals-icon",
            title: "Health Sector (Hospitals, Clinics, and Pharmacies)",
            content:
                "We enable you to obtain reliable feedback from patients about the level of medical service you provide, including the competence and skill of the nursing staff and doctors and any other proposals to improve the service.",
        },
        {
            icon: "hotels-icon",
            title: "Hospitality (Hotels and Resorts)",
            content:
                "Be aware of the opinions of guests regarding the level of service quality, room cleanliness, and other aspects that help you develop your brand.",
        },
        {
            icon: "activities-icon",
            title: "Conferences and Events",
            content:
                "Survey the visitors' satisfaction with the level of organization and services and the efficiency and professionalism of the staff by using accurate and objective questions.",
        },
        {
            icon: "restaurents-icon",
            title: "Restaurants and Cafes",
            content:
                "Get your customers' evaluation of the quality of food, service, etc. through comprehensive and accurate questions, which helps you develop your services and keep your customers.",
        },
        {
            icon: "airports-icon",
            title: "Airports and Trains",
            content:
                "Explore your customers' expectations and satisfaction with your various services, using objective and accurate questions.",
        },
        {
            icon: "shops-icon",
            title: "Markets and Trade Fairs",
            content:
                "Follow up the opinion of your customers and their evaluation of the quality of your products and other services you provide, to know their expectations and needs and ways to improve your mental image, which helps to achieve more sales.",
        },
        {
            icon: "parks-icon",
            title: "Family parks and gardens",
            content:
                "Be able to know what your visitors think about the quality of park services and collect improvement suggestions that contribute to achieving excellence and ensuring customer satisfaction.",
        },
        {
            icon: "governments-icon",
            title: "Ministries and Government Entities",
            content:
                "An integrated platform to listen to the opinions of citizens to learn about the challenges they face and suggestions that meet their needs and fulfill their desires.",
        },
        {
            icon: "companies-icon",
            title: "Human Capital",
            content:
                "Feedback platform supports the decisions of human resources managers in achieving the best results and increasing employee satisfaction and productivity, through accurate questions and free rewards from platform partners.",
        },
        {
            icon: "transportations-icon",
            title: "Transportation",
            content:
                "By knowing the exact challenges of your customers in the driver's commitment to appointments - vehicle cleanliness - courtesy - and other questions that help you develop your service and distinguish from competitors.",
        },
    ];

    // اختيار البيانات بناءً على اللغة
    const surveys = currentLanguage === "ar" ? surveys_ar : surveys_en;

    // إعدادات الحركة
    const titleAnimation = {
        initial: { x: -10, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: { duration: 0.5, ease: "easeInOut" },
        viewport: { once: true, margin: "0px 0px -100px 0px" },
    };

    const cardAnimation = {
        initial: { x: -10, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: { duration: 0.2, ease: "easeInOut" },
        viewport: { once: true, margin: "0px 0px -100px 0px" },
    };

    return (
        <section id="survey-examples" className="py-16 relative" dir={currentLanguage === "ar" ? "rtl" : "ltr"}>
            {/* الأشكال الزخرفية */}
            <div className="shape">
                <div className="shape-1 absolute top-0 left-0 w-32 h-32 bg-purple-200 rounded-full opacity-30"></div>
                <div className="shape-2 absolute bottom-0 right-0 w-32 h-32 bg-purple-200 rounded-full opacity-30"></div>
            </div>

            {/* العنوان */}
            <motion.h2
                className="text-4xl text-gray-800 font-bold text-center mx-auto mb-12 example-title"
                style={{ maxWidth: "540px" }}
                {...titleAnimation}
            >
                {t("survey_examples_title")}
            </motion.h2>

            {/* قائمة الاستبيانات */}
            <div className="flex-layout">
                <div className="flex flex-wrap justify-center gap-6">
                    {surveys.map((item, i) => (
                        <motion.div
                            key={i}
                            className="survey-example lg:w-1/4 md:w-1/4 sm:w-1/2 xs:w-1/2 p-4"
                            {...cardAnimation}
                            transition={{ ...cardAnimation.transition, delay: 0.2 + i * 0.2 }}
                        >
                            <Card className="h-full flex flex-col justify-center items-center text-center p-6 shadow-md hover:shadow-lg transition-shadow">
                                <CardContent>
                                    <IconComponent iconName={item.icon} />
                                    <h3 className="text-xl text-gray-800 font-bold mb-3">{item.title}</h3>
                                    <h4 className="text-lg text-gray-600">{item.content}</h4>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SurveyExamples;