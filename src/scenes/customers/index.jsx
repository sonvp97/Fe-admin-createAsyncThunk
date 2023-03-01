import { Box, useTheme } from "@mui/material";
import { fetchCustomerList,selectSuccess,selectLoading } from '../../features/customerSlice';
import Header from "components/Header";
import { DataGrid } from "@mui/x-data-grid";
import React,{ useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

const Customers = () => {
  const theme = useTheme();
  const [customers, setCustomers] = useState([]);
  const dispatch = useDispatch();
  const success = useSelector(selectSuccess);
  const loading = useSelector(selectLoading);


  const fetchCustomerData = async () => {
    try {
      const result = await dispatch(fetchCustomerList());
      setCustomers(result.payload);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCustomerData();
  }, [customers]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.5,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 0.4,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Box
        mt="40px"
        height="75vh"
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
          loading={loading || !customers}
          getRowId={(row) => row.id}
          rows={customers || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Customers;
