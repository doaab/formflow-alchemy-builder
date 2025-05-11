
import React from 'react';
import { useTranslation } from '@/context/TranslationContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  CreditCard, 
  BarChart2, 
  DollarSign, 
  ArrowDown
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { t, currentLanguage } = useTranslation();

  // Sample dashboard data
  const statsData = [
    { id: 1, title: 'registeredCompanies', value: '223', icon: <Building className="h-6 w-6" /> },
    { id: 2, title: 'paidSubscriptions', value: '312', icon: <CreditCard className="h-6 w-6" /> },
    { id: 3, title: 'purchasedPoints', value: '231,023,351', icon: <DollarSign className="h-6 w-6" /> },
    { id: 4, title: 'totalSales', value: '22,315,613.32', icon: <BarChart2 className="h-6 w-6" /> }
  ];

  const financialData = [
    { id: 1, title: 'totalSubscriptions', value: '156,312 SR', icon: <CreditCard className="h-6 w-6 text-teal-500" /> },
    { id: 2, title: 'totalPoints', value: '156,312 SR', icon: <DollarSign className="h-6 w-6 text-pink-500" /> },
    { id: 3, title: 'totalProfit', value: '156,312 SR', icon: <BarChart2 className="h-6 w-6 text-purple-500" /> }
  ];

  // Sample transfer requests data
  const transferRequests = [
    {
      id: '546131',
      userName: 'محمد صالح العسيري',
      phoneNumber: '55 986 4130',
      points: '530',
      date: '2021/06/12'
    },
    {
      id: '546131',
      userName: 'محمد صالح العسيري',
      phoneNumber: '55 986 4130',
      points: '530',
      date: '2021/06/12'
    },
    {
      id: '546131',
      userName: 'محمد صالح العسيري',
      phoneNumber: '55 986 4130',
      points: '530',
      date: '2021/06/12'
    }
  ];

  const isRtl = currentLanguage === 'ar';

  return (
    <div className={`w-full p-6 ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Statistics Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">{t('statistics')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat) => (
            <Card key={stat.id} className="overflow-hidden">
              <div className={`bg-gradient-to-r from-purple-500 to-purple-700 text-white p-4 flex ${isRtl ? 'flex-row-reverse' : ''} justify-between items-center`}>
                <span className="text-2xl font-bold">{stat.value}</span>
                <div className="bg-white/20 p-2 rounded-full">
                  {stat.icon}
                </div>
              </div>
              <CardContent className={`p-3 text-sm text-center ${isRtl ? 'text-right' : 'text-left'}`}>
                <p className="text-gray-600">{t(stat.title)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Financial Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">{t('financialAffairs')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {financialData.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className={`p-4 flex ${isRtl ? 'flex-row-reverse' : ''} justify-between items-center`}>
                <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
                  <p className="text-xl font-bold">{item.value}</p>
                  <p className="text-gray-600">{t(item.title)}</p>
                </div>
                <div>
                  {item.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Latest Point Transfers Section */}
      <div>
        <h2 className="text-xl font-bold mb-4">{t('latestPointTransfers')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className={`py-3 px-4 ${isRtl ? 'text-right' : 'text-left'}`}>{t('requestNumber')}</th>
                <th className={`py-3 px-4 ${isRtl ? 'text-right' : 'text-left'}`}>{t('userName')}</th>
                <th className={`py-3 px-4 ${isRtl ? 'text-right' : 'text-left'}`}>{t('phoneNumber')}</th>
                <th className={`py-3 px-4 ${isRtl ? 'text-right' : 'text-left'}`}>{t('requestedPoints')}</th>
                <th className={`py-3 px-4 ${isRtl ? 'text-right' : 'text-left'}`}>{t('requestDate')}</th>
                <th className="py-3 px-4">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {transferRequests.map((request, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3 px-4">#{request.id}</td>
                  <td className="py-3 px-4">{request.userName}</td>
                  <td className="py-3 px-4">{request.phoneNumber}</td>
                  <td className="py-3 px-4">
                    <span className="text-teal-500">{request.points} نقطة</span>
                  </td>
                  <td className="py-3 px-4">{request.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button variant="default" size="sm" className="bg-purple-600 hover:bg-purple-700">
                        {t('transfer')}
                      </Button>
                      <Button variant="outline" size="sm">
                        {t('cancel')}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
