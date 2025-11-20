import { IconButton, Menu, MenuItem, TextField } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from 'react';
import { tableFilters } from '../types';
import CloseIcon from '@mui/icons-material/Close';

interface TableToolbarProps {
  searchTerm: string;
  updateSearchTerm: (val: string) => void;
  updateFilterValue: (val: string) => void;
}

function TableToolbar({
  searchTerm,
  updateSearchTerm,
  updateFilterValue,
}: TableToolbarProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <div className="flex flex-row gap-2 w-full items-center mb-4 justify-end">
      <div className="flex flex-row gap-3 items-center">
        <div className="relative">
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {tableFilters.map((f) => (
              <MenuItem
                key={f.value}
                onClick={() => {
                  updateFilterValue(f.value);
                  setAnchorEl(null);
                }}
              >
                {f.name}
              </MenuItem>
            ))}
          </Menu>

          <IconButton
            onClick={(event) => setAnchorEl(event.currentTarget)}
            size="small"
          >
            <FilterAltIcon />
          </IconButton>
        </div>

        <TextField
          className={'max-w-[200px]'}
          size="small"
          fullWidth
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => updateSearchTerm(e.target.value)}
        />
      </div>
      <IconButton
        disabled={searchTerm.length === 0}
        aria-label="Clear filters"
        onClick={() => {
          localStorage.removeItem('searchTerm');
          localStorage.removeItem('filterValue');
          updateSearchTerm('');
          updateFilterValue(tableFilters[0].value);
        }}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
}

export default TableToolbar;
