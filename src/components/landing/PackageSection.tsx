import React, { useState } from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package } from '@/api/types/packageTypes';
import { usePackages } from '@/api/hooks/usePackagesQueries';

const PackageSection: React.FC = () => {
  const { t } = useTranslation();
  const [isYearly, setIsYearly] = useState(false);
  const { data, isLoading, error } = usePackages();

  const packages = data?.data.content || [];

  const getPrice = (pkg: Package) => {
    const priceObj = pkg.prices.find((p) => p.period === (isYearly ? 'yearly' : 'monthly'));
    if (!priceObj) return { price: 0, discount: false };
    const { price, old_price } = priceObj;
    return isYearly && old_price > price ? { price, discount: true, oldPrice: old_price } : { price, discount: false };
  };

  if (isLoading) {
    return (
        <section id="pricing" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">{t('loading')}</div>
        </section>
    );
  }

  if (error) {
    return (
        <section id="pricing" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center text-red-500">
            {t('errorLoadingPackages')}: {error.message}
          </div>
        </section>
    );
  }

  return (
      <section id="pricing" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#8363aa]">{t('whichPlanForYou')}</h2>

          <div className="flex justify-center mb-6 items-center">
            <div className="inline-flex bg-gray-200 rounded-full p-1">
              <button
                  className={`px-6 py-2 rounded-full ${!isYearly ? 'bg-[#8363aa] text-white' : 'text-gray-700'}`}
                  onClick={() => setIsYearly(false)}
              >
                {t('monthly')}
              </button>
              <button
                  className={`px-6 py-2 rounded-full ${isYearly ? 'bg-[#8363aa] text-white' : 'text-gray-700'}`}
                  onClick={() => setIsYearly(true)}
              >
                {t('annual')}
              </button>
            </div>
            {isYearly && (
                <div className="ml-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {t('save')} 10%
                </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => {
              const { price, discount, oldPrice } = getPrice(pkg);
              const isHighlighted = pkg.id === 2;
              return (
                  <Card
                      key={pkg.id}
                      className={`border ${isHighlighted ? 'border-2 border-[#8363aa] shadow-lg' : 'border-gray-200'} rounded-lg`}
                  >
                    <CardContent className="p-0">
                      <div className={`p-6 border-b ${isHighlighted ? 'bg-[#8363aa] text-white' : ''}`}>
                        <h3 className="text-xl font-bold text-center">{pkg.name}</h3>
                        <div className="mt-4 text-center">
                          <div className="text-3xl font-bold">
                            {discount ? (
                                <>
                            <span className="line-through text-gray-400 mr-2">
                              {oldPrice} {t('sar')}
                            </span>
                                  {price} {t('sar')}
                                </>
                            ) : (
                                `${price} ${t('sar')}`
                            )}
                          </div>
                          <p className="text-sm mt-1">{isYearly ? t('yearly') : t('monthly')}</p>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        {pkg.features.map((feature, index) => (
                            <div key={feature.id} className="flex items-start">
                        <span className={feature.supported ? 'text-green-500 mr-2' : 'text-red-500 mr-2'}>
                          {feature.supported ? '✓' : '✗'}
                        </span>
                              <span>{feature.title}</span>
                            </div>
                        ))}
                      </div>

                      <div className="p-6 text-center">
                        <Button className="w-full bg-[#8363aa] text-white">{t('choosePlan')}</Button>
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