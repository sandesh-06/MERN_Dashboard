import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "reuseableComponents/DataGridCustomToolbar";
import Header from "reuseableComponents/Header";
import { useGetTransactionsQuery } from "state/api";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

const Transactions = () => {
  const theme = useTheme();

  //values to send to the backend
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 20,
    page: 0,
  });
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  //an api request will be made eveytime the user is typing something to search, to avoid that we'll get the user input temporarily in separate state and once they hit the search icon, setSearch should be implemented and that value should be sent via api
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  // console.log(data)

  //creating columns for the datagrid
  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box
      m="1.5rem 2.5rem"
      sx={{
        "&. MuiBox-root": {
          overflow: "hidden",
        },
      }}
    >
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}

          //the following is for server side pagination
          pagination
          paginationMode="server"
          rowCount={(data && data.total) || 0} //we need both the values to move further
          pageSizeOptions={[20, 50, 100]}
          onPageChange={(newPage) =>
            setPaginationModel({ ...paginationModel, page: newPage })
          }
          onPageSizeChange={(newPageSize) =>
            setPaginationModel({ ...paginationModel, pageSize: newPageSize })
          }
          sortingMode="server"
          onSortModelChange={(newSortModel) => setSort(newSortModel)} //this will set sort as for eg: {field: cost, sort: desc}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};
export default Transactions;
