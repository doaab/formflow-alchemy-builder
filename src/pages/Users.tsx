
import React, { useState } from 'react';
import { useTranslation } from '@/context/TranslationContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import { MoreVertical, Search } from 'lucide-react';

// Mock user data
const mockUsers = Array(20).fill(null).map((_, index) => ({
  id: index + 1,
  name: 'محمد صالح العسيري',
  phone: '55 986 4130',
  points: 6465,
  transactions: 856,
  status: index % 7 === 0 ? 'inactive' : 'active'
}));

const Users: React.FC = () => {
  const { t, currentLanguage } = useTranslation();
  const { user } = useAuth();
  const [users] = useState(mockUsers);
  const [currentPage, setCurrentPage] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  
  const isRtl = currentLanguage === 'ar';
  const totalPages = 20;
  
  // Filter users based on search term
  const filteredUsers = users.filter(
    user => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           user.phone.includes(searchTerm)
  );

  return (
    <div className={`container mx-auto py-6 ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{t('users')}</h1>
          <p className="text-gray-500">{users.length} {t('users')}</p>
        </div>
        <div className="relative w-64">
          <Search className="h-4 w-4 absolute top-3 left-3" />
          <Input
            type="text"
            placeholder={t('search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 h-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-md shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>{t('userName')}</TableHead>
              <TableHead>{t('phoneNumber')}</TableHead>
              <TableHead className="text-center">{t('totalPoints')}</TableHead>
              <TableHead className="text-center">{t('totalTransactions')}</TableHead>
              <TableHead className="text-center">{t('status')}</TableHead>
              <TableHead className="w-12">{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className="text-center">{user.points.toLocaleString()}</TableCell>
                <TableCell className="text-center">{user.transactions}</TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant={user.status === 'active' ? 'default' : 'destructive'}
                    className={`${user.status === 'active' 
                      ? 'bg-green-50 text-green-700 hover:bg-green-50' 
                      : 'bg-red-50 text-red-700 hover:bg-red-50'}`}
                  >
                    {user.status === 'active' ? t('active') : t('inactive')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>{t('view')}</DropdownMenuItem>
                      <DropdownMenuItem>{t('edit')}</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">{t('delete')}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-4 border-t">
          <div className="text-sm text-gray-500">
            {t('page')} {currentPage} / {totalPages}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                />
              </PaginationItem>
              {[1, 2, 3, 4, 5].map(page => (
                <PaginationItem key={page}>
                  <Button 
                    variant={page === currentPage ? "default" : "outline"} 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Users;
