
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, BarChart2, UserPlus, Star } from 'lucide-react';

const SurveyExamples = () => {
  const { t } = useTranslation();
  
  const examples = [
    {
      id: 'customer',
      title: t('customerFeedback'),
      description: t('customerFeedbackDesc'),
      icon: <Star className="h-8 w-8 text-yellow-500" />,
    },
    {
      id: 'event',
      title: t('eventRegistration'),
      description: t('eventRegistrationDesc'),
      icon: <UserPlus className="h-8 w-8 text-blue-500" />,
    },
    {
      id: 'market',
      title: t('marketResearch'),
      description: t('marketResearchDesc'),
      icon: <BarChart2 className="h-8 w-8 text-green-500" />,
    },
  ];

  return (
    <section className="py-12">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">{t('surveyTemplates')}</h2>
          <p className="text-gray-500 max-w-xl mx-auto">{t('surveyTemplatesDesc')}</p>
        </div>
        
        <Tabs defaultValue="customer" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3">
            {examples.map((example) => (
              <TabsTrigger key={example.id} value={example.id}>
                {example.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {examples.map((example) => (
            <TabsContent key={example.id} value={example.id}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-shrink-0 bg-gray-50 p-6 rounded-full">
                      {example.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                      <CardDescription className="text-base mb-4">
                        {example.description}
                      </CardDescription>
                      <div className="flex gap-3">
                        <Button>
                          <FileText className="mr-2 h-4 w-4" />
                          {t('useTemplate')}
                        </Button>
                        <Button variant="outline">
                          {t('preview')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default SurveyExamples;
