import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
// import PropTypes from 'prop-types';
import clsx from 'clsx';
import { alpha, styled } from '@mui/material/styles'; // Changed from lighten, makeStyles
import MuiTable from '@mui/material/Table'; // Renamed to avoid conflict
import TableBody from '@mui/material/TableBody';
import MuiTableCell from '@mui/material/TableCell'; // Renamed to avoid conflict
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import MuiToolbar from '@mui/material/Toolbar'; // Renamed to avoid conflict
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete'; // Changed from @material-ui/icons
// import FilterListIcon from '@mui/icons-material/FilterList'; // Changed from @material-ui/icons
import { Checkbox, Actions, TextField, Button } from "../common";
import { Search, SearchOff } from "../../images/icons";

// Styled TableCell for header
const StyledHeaderCell = styled(MuiTableCell)(({ theme }) => ({
  // Add any specific header cell styles if needed
}));

function EnhancedTableHead(props) {
  const {
    // classes, // Removed, will use styled components or sx prop
    onSelectAllClick,
    order,
    sort,
    numSelected,
    rowCount,
    rowActions,
    onRequestSort,
    columns,
    checkable,
    filterable,
  } = props;

  const { t } = useContext(GlobalContext);

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {checkable && <MuiTableCell padding="checkbox">
          <Checkbox
            color="secondary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </MuiTableCell>}
        {columns.map((column) => (
          <StyledHeaderCell
            key={column.key}
            align="left"
            padding="normal"
            sortDirection={sort === column.key ? order : false}
          >
            <TableSortLabel
              disabled={!column.sortable}
              // disabled={!filterable} // filterable might not be the right prop to disable sort
              active={sort === column.key}
              direction={sort === column.key ? order : 'asc'}
              onClick={createSortHandler(column.key)}
            >
              {column.label}
              {sort === column.key ? (
                <Box component="span" sx={visuallyHidden}> {/* Using sx prop for visuallyHidden styles */}
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </StyledHeaderCell>
        ))}
        {rowActions.length > 0 && <MuiTableCell align="center">
          {t('action')}
        </MuiTableCell>}
      </TableRow>
    </TableHead>
  );
}

// sx prop can be used for these styles directly on Toolbar or define a styled component
const StyledToolbar = styled(MuiToolbar)(({ theme, numSelected }) => ({
  // paddingLeft: 16,
  // paddingRight: 16,
  // ...(numSelected > 0 && {
  //   color: theme.palette.mode === 'light' ? theme.palette.secondary.main : theme.palette.text.primary,
  //   backgroundColor: theme.palette.mode === 'light'
  //     ? alpha(theme.palette.secondary.light, 0.85)
  //     : alpha(theme.palette.secondary.dark, 0.85), // Adjusted alpha usage for dark mode too
  // }),
}));

const ToolbarTitle = styled('div')({
  flex: '1 1 100%',
  display: 'flex',
  alignItems: 'center'
});

const EnhancedTableToolbar = (props) => {
  // const classes = useToolbarStyles(); // Removed
  const {
    toolbarFilters,
    numSelected,
    title, toolbarActions, onKeywordSearch, filterable,
    onSearchClick, onClearClick

  } = props;
  const [keyword, setKeyword] = React.useState("")
  const onKeywordChange = (e) => {
    setKeyword(e.target.value)
    onKeywordSearch(e.target.value)
  }
  return (
    <StyledToolbar style={{ padding: 16, paddingRight: 16 }}>
      {
        numSelected > 0 ? (
          <>
            <Tooltip title="Delete">
              <Button aria-label="delete">
                <DeleteIcon />
              </Button>
            </Tooltip>
            <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
              {numSelected} selected
            </Typography>
          </>
        ) : (
          <>
            <ToolbarTitle>
              <Typography variant="h6" id="tableTitle" component="div">
                {title}
              </Typography>
            </ToolbarTitle>
            {
              filterable && <TextField
                type="search"
                variant="standard"
                fullWidth
                // size="small"
                value={keyword}
                onChange={onKeywordChange} />
            }
            {toolbarFilters}
            {filterable && <Button color="inherit" onClick={onSearchClick}><Search /></Button>}
            {filterable && <Button color="inherit" onClick={() => {
              onClearClick()
              setKeyword("")
            }}><SearchOff color="inherit" /></Button>}
            {
              toolbarActions.length > 0 && <Actions actions={toolbarActions} />
            }
          </>)
      }
    </StyledToolbar>
  );
};

// Define visuallyHidden styles as an object for sx prop
const visuallyHidden = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: 1,
  margin: -1,
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  top: 20,
  width: 1,
};

// Styled components or sx prop for the main table and pagination
const RootContainer = styled('div')(({ theme }) => ({
  width: '100%',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  // Removed paper styles, assuming Paper component is used separately if needed
}));

const StyledMuiTable = styled(MuiTable)(({ theme }) => ({
  minWidth: 750,
  '& .MuiTableCell-root': {
    color: theme.palette.table?.color || theme.palette.text.primary // Added fallback
  },
  '& .MuiTableSortLabel-root:hover': {
    color: theme.palette.table?.color || theme.palette.text.primary
  },
  '& .MuiTableSortLabel-root.Mui-active': { // Changed from MuiTableSortLabel-active
    color: theme.palette.table?.color || theme.palette.text.primary
  },
  '& .MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon': { // Changed from MuiTableSortLabel-active
    color: theme.palette.table?.color || theme.palette.text.primary
  }
}));

const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  color: theme.palette.pagination?.color || theme.palette.text.secondary, // Added fallback
  '& .MuiSelect-icon': {
    color: theme.palette.pagination?.color || theme.palette.text.secondary,
  },
  '& .MuiIconButton-root.Mui-disabled': {
    color: theme.palette.pagination?.disabled || theme.palette.action.disabled
  }
}));

// Import Box for the visually hidden span
import Box from '@mui/material/Box';

export default ({
  dense = false,
  checkable = true,
  filterable = true,
  rows = [],
  columns = [],
  rowActions = [],
  toolbarActions = [],
  sort = "",
  order = "asc",
  title = "",
  total = 0,
  page = 0,
  rowsPerPage = 10,
  toolbarFilters = <></>,
  onPageChange = () => { },
  onSortChange = () => { },
  onKeywordSearch = () => { },
  onRowsPerPageChange = () => { },
  onSearchClick = () => { },
  onClearClick = () => { },
}) => {
  // const classes = useStyles(); // Removed
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = sort === property && order === 'asc';
    onSortChange(isAsc ? 'desc' : 'asc', property)
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    if (!checkable) return;
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) { // Corrected: Added parentheses for the condition
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    // onPageChange(0);
  };

  return (
    <RootContainer>
      <EnhancedTableToolbar
        numSelected={selected.length}
        title={title}
        toolbarFilters={toolbarFilters}
        toolbarActions={toolbarActions}
        onKeywordSearch={onKeywordSearch}
        filterable={filterable}
        onSearchClick={onSearchClick}
        onClearClick={onClearClick}
      />
      <StyledTableContainer>
        <StyledMuiTable
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead
            checkable={checkable}
            numSelected={selected.length}
            order={order}
            sort={sort}
            rowCount={rows.length}
            rowActions={rowActions}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            columns={columns}
          />
          <TableBody>
            {rows.map((row, index) => {
              const isItemSelected = selected.indexOf(row._id) !== -1;
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row._id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row._id}
                  selected={isItemSelected}
                >
                  {checkable && (
                    <MuiTableCell padding="checkbox">
                      <Checkbox
                        color="secondary"
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </MuiTableCell>
                  )}
                  {columns.map((column) => {
                    const value = row[column.key];
                    return (
                      <MuiTableCell key={column.key} align="left">
                        {column.render ? column.render(value, row) : value}
                      </MuiTableCell>
                    );
                  })}
                  {rowActions.length > 0 && (
                    <MuiTableCell align="center">
                      <Actions actions={rowActions} row={row} />
                    </MuiTableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </StyledMuiTable>
      </StyledTableContainer>
      <StyledTablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </RootContainer>
  );
};