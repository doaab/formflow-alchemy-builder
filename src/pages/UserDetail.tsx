
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '@/context/TranslationContext';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Star } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

// Mock user data to match the image
const mockUser = {
  id: '#554545',
  name: 'محمد صالح العسيري',
  phone: '55 986 4130',
  transactions: 856,
  points: 6465,
  status: 'نشط',
  registrationDate: '2021/03/16',
  convertedPoints: 200,
};

// Mock evaluations data
const mockEvaluations = [
  { 
    id: 1, 
    date: '2021/03/04', 
    status: 'نشط', 
    company: 'منشي كافيه', 
    branch: 'المركز الرئيسي',
    section: 'الطاولات', 
    rating: 5,
    evaluationType: 'عرض التطبيق'
  },
  { 
    id: 2, 
    date: '2021/03/04', 
    status: 'متابعة', 
    company: 'منشي كافيه', 
    branch: 'فرع الرياض 2',
    section: 'الطاولات', 
    rating: 0,
    evaluationType: 'سؤال موجه'
  },
  { 
    id: 3, 
    date: '2021/03/04', 
    status: 'متابعة', 
    company: 'منشي كافيه', 
    branch: 'فرع جدة',
    section: 'الفرع نفسه', 
    rating: 1,
    evaluationType: 'عرض التطبيق'
  },
  { 
    id: 4, 
    date: '2021/03/04', 
    status: 'نشط', 
    company: 'منشي كافيه', 
    branch: 'فرع جدة',
    section: 'الطاولات', 
    rating: 0,
    evaluationType: 'سؤال موجه'
  }
];

const UserDetail: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { t, currentLanguage } = useTranslation();
  const isRtl = currentLanguage === 'ar';
  
  // In a real app, you would fetch user data based on userId

  return (
    <div className={`container mx-auto py-6 ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="flex justify-between items-center mb-6">
        <Link to="/users">
          <Button variant="ghost" className="flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> {t('back')}
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{t('userDetails')}</h1>
      </div>
      
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="font-bold text-lg mb-4">{t('userData')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">ID</span>
              <span className="font-medium">{mockUser.id}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">{t('userName')}</span>
              <span className="font-medium">{mockUser.name}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">{t('phoneNumber')}</span>
              <span className="font-medium">{mockUser.phone}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">{t('totalTransactions')}</span>
              <span className="font-medium">{mockUser.transactions}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">{t('totalPoints')}</span>
              <span className="font-medium">{mockUser.points}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">{t('status')}</span>
              <Badge 
                variant="outline"
                className="bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700"
              >
                {mockUser.status}
              </Badge>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">{t('registrationDate')}</span>
              <span className="font-medium">{mockUser.registrationDate}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">{t('convertedPoints')}</span>
              <span className="font-medium">{mockUser.convertedPoints}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-4">
        <h2 className="font-bold text-lg">{t('evaluations')}</h2>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">#</TableHead>
                <TableHead>{t('evaluationDate')}</TableHead>
                <TableHead>{t('evaluationStatus')}</TableHead>
                <TableHead>{t('companyName')}</TableHead>
                <TableHead>{t('branchName')}</TableHead>
                <TableHead>{t('section')}</TableHead>
                <TableHead>{t('evaluation')}</TableHead>
                <TableHead>{t('evaluationType')}</TableHead>
                <TableHead className="w-10">{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEvaluations.map((evaluation) => (
                <TableRow key={evaluation.id}>
                  <TableCell>{evaluation.id}</TableCell>
                  <TableCell>{evaluation.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={`${evaluation.status === 'نشط' 
                        ? 'bg-green-50 text-green-700 hover:bg-green-50 hover:text-green-700' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-50 hover:text-gray-700'}`}
                    >
                      {evaluation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{evaluation.company}</TableCell>
                  <TableCell>{evaluation.branch}</TableCell>
                  <TableCell>{evaluation.section}</TableCell>
                  <TableCell>
                    {evaluation.rating > 0 ? (
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            size={16} 
                            className={i < evaluation.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    ) : evaluation.evaluationType === 'سؤال موجه' ? (
                      <span className="text-gray-500">{t('directedQuestion')}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </TableCell>
                  <TableCell>{evaluation.evaluationType}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      {t('view')}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetail;
