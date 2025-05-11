import { useState, useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Package {
    id: number;
    name: string;
    monthly_price: number;
    yearly_price: number;
    features: { title: string; supported: boolean }[];
}

const PackageSection: React.FC = () => {
    const { t, currentLanguage } = useTranslation();
    const [packages, setPackages] = useState<Package[]>([]);
    const [isYearly, setIsYearly] = useState(false);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch("https://mydomain.com/api/store_ip");
                const data = await response.json();
                setPackages(data);
            } catch (error) {
                console.error("Failed to fetch packages:", error);
            }
        };
        fetchPackages();
    }, []);

    const getPrice = (pkg: Package) => {
        const price = isYearly ? pkg.yearly_price : pkg.monthly_price;
        const originalPrice = pkg.yearly_price; // افتراض أن السعر الأصلي هو السنوي
        return isYearly && price < originalPrice ? { price, discount: true } : { price, discount: false };
    };

    return (
        <section id="pricing" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 text-center text-[#8363aa]">
                    {t("whichPlanForYou")}
                </h2>

                <div className="flex justify-center mb-6 items-center">
                    <div className="inline-flex bg-gray-200 rounded-full p-1">
                        <button
                            className={`px-6 py-2 rounded-full ${!isYearly ? "bg-[#8363aa] text-white" : "text-gray-700"}`}
                            onClick={() => setIsYearly(false)}
                        >
                            {t("monthly")}
                        </button>
                        <button
                            className={`px-6 py-2 rounded-full ${isYearly ? "bg-[#8363aa] text-white" : "text-gray-700"}`}
                            onClick={() => setIsYearly(true)}
                        >
                            {t("annual")}
                        </button>
                    </div>
                    {isYearly && (
                        <div className="ml-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {t("save")} 10%
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {packages.map((pkg) => {
                        const { price, discount } = getPrice(pkg);
                        const isHighlighted = pkg.id === 2; // Medium plan highlighted
                        return (
                            <Card
                                key={pkg.id}
                                className={`border ${isHighlighted ? "border-2 border-[#8363aa] shadow-lg" : "border-gray-200"} rounded-lg`}
                            >
                                <CardContent className="p-0">
                                    <div
                                        className={`p-6 border-b ${isHighlighted ? "bg-[#8363aa] text-white" : ""}`}
                                    >
                                        <h3 className="text-xl font-bold text-center">{t(pkg.name.toLowerCase())}</h3>
                                        <div className="mt-4 text-center">
                                            <div className="text-3xl font-bold">
                                                {discount ? (
                                                    <>
                                                        <span className="line-through text-gray-400 mr-2">{pkg.yearly_price} {t("sar")}</span>
                                                        {price} {t("sar")}
                                                    </>
                                                ) : (
                                                    `${price} ${t("sar")}`
                                                )}
                                            </div>
                                            <p className="text-sm mt-1">{isYearly ? t("yearly") : t("monthly")}</p>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        {pkg.features.map((feature, index) => (
                                            <div key={index} className="flex items-start">
                        <span className={feature.supported ? "text-green-500 mr-2" : "text-red-500 mr-2"}>
                          {feature.supported ? "✓" : "✗"}
                        </span>
                                                <span>{t(`${pkg.name.toLowerCase()}Feature${index + 1}`)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-6 text-center">
                                        <Button className="w-full bg-[#8363aa] text-white">
                                            {t("choosePlan")}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default PackageSection;