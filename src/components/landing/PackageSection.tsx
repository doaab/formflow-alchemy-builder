
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const PackageSection: React.FC = () => {
  const { t } = useTranslation();
  
  const packages = [
    {
      title: t('basicPlan'),
      price: '$0',
      description: t('basicPlanDesc'),
      features: [
        t('basicFeature1'),
        t('basicFeature2'),
        t('basicFeature3'),
      ],
      buttonText: t('getStarted'),
      popular: false
    },
    {
      title: t('proPlan'),
      price: '$10',
      description: t('proPlanDesc'),
      features: [
        t('proFeature1'),
        t('proFeature2'),
        t('proFeature3'),
        t('proFeature4'),
      ],
      buttonText: t('upgradeToPro'),
      popular: true
    },
    {
      title: t('businessPlan'),
      price: '$49',
      description: t('businessPlanDesc'),
      features: [
        t('businessFeature1'),
        t('businessFeature2'),
        t('businessFeature3'),
        t('businessFeature4'),
        t('businessFeature5'),
      ],
      buttonText: t('contactSales'),
      popular: false
    }
  ];
  
  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-2">{t('pricingPlans')}</h2>
        <p className="text-center text-gray-500 mb-8">{t('selectPlan')}</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => (
            <Card key={index} className={pkg.popular ? 'border-primary relative' : ''}>
              {pkg.popular && (
                <span className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-semibold rounded-bl">
                  {t('mostPopular')}
                </span>
              )}
              <CardHeader>
                <CardTitle>{pkg.title}</CardTitle>
                <div className="text-3xl font-bold">{pkg.price}</div>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={pkg.popular ? 'default' : 'outline'}>
                  {pkg.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageSection;
