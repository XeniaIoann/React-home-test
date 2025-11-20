import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import { tableFilters, type User } from '../types';
import { Button, TablePagination, Typography } from '@mui/material';
import TableToolbar from './TableToolbar';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { usePersistentState } from '../hooks/usePersistentState';

const ROWS_PER_PAGE = 5;

interface UsersTableProps {
  users: User[];
  handleViewDetailsClick: (userId: number) => void;
}

function UsersTable({ handleViewDetailsClick, users }: UsersTableProps) {
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = usePersistentState('searchTerm', '');
  const debouncedSearch = useDebounce(searchTerm, 200);
  const [filterValue, setFilterValue] = usePersistentState(
    'filterValue',
    tableFilters[0].value
  );

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'username', label: 'Username' },
    { id: 'email', label: 'Email' },
    { id: 'company', label: 'Company Name' },
    { id: 'city', label: 'City' },
    { id: 'actions', label: '' },
  ];

  const sortedUsers = useMemo(() => {
    const filtered = users.filter((user) =>
      [user.name, user.username]
        .join(' ')
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (filterValue) {
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        case 'cityAsc':
          return a.address.city.localeCompare(b.address.city);
        case 'cityDesc':
          return b.address.city.localeCompare(a.address.city);
        default:
          return 0;
      }
    });
  }, [users, debouncedSearch, filterValue]);

  const paginatedUsers = useMemo(() => {
    const start = page * ROWS_PER_PAGE;
    return sortedUsers.slice(start, start + ROWS_PER_PAGE);
  }, [sortedUsers, page, ROWS_PER_PAGE]);

  useEffect(() => {
    setPage(0);
  }, [debouncedSearch]);

  function handlePageChange(event: unknown, newPage: number) {
    setPage(newPage);
  }

  return (
    <div className="w-full">
      <TableToolbar
        searchTerm={searchTerm}
        updateSearchTerm={(val: string) => setSearchTerm(val)}
        updateFilterValue={(val: string) => setFilterValue(val)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <Typography fontWeight="bold">{column.label}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user: User) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company.name}</TableCell>
                <TableCell>{user.address.city}</TableCell>
                <TableCell>
                  <Button
                    variant="text"
                    color="info"
                    startIcon={<InfoIcon className="w-4" />}
                    onClick={() => handleViewDetailsClick(user.id)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={sortedUsers.length}
          rowsPerPage={ROWS_PER_PAGE}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[]}
        />
      </TableContainer>
    </div>
  );
}

export default UsersTable;
