import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  customer: null,
  error: null,
  success: false,
};
const config = {
  headers: {
    Authorization: `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY3NzY2MzA3NiwiZXhwIjoxNjc4MjY3ODc2fQ.xhEZwfqFlL7YwmoVXmRwEQZozT6y1T0_uK_HuqxL1jxdcGAmN2iP8D2d0H7Fjo4mF39BL6lC9H5vLYBeCUrXwA`
  }
};
export const fetchCustomerList = createAsyncThunk("customer/fetch", async () => {
  const res = await axios
    .get(`http://localhost:8004/api/customers`,config)
    .then(res => res.data)
    .catch(err => {
      throw err;
    });
  return res;
});

// export const createStaff = createAsyncThunk("staff/create", async (data) => {
//   console.log("Create Staff: ", data);
//   const res = await createData(staff, data, "staff");
//   return res;
// });

// export const updateStaff = createAsyncThunk("staff/update", async (data) => {
//   const { record_id, value } = data;
//   console.log("Update Staff: ", data);
//   const res = await updateData(record_id, staff, value, "staff");
//   return res;
// });

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerList.pending, (state, action) => {
        state.success = false;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.success = false;
      })
      .addCase(fetchCustomerList.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
      })

      // .addCase(createStaff.pending, (state, action) => {
      //   state.success = false;
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(createStaff.rejected, (state, action) => {
      //   state.success = false;
      //   state.loading = false;
      //   state.error = action.error;
      // })
      // .addCase(createStaff.fulfilled, (state, action) => {
      //   state.error = false;
      //   state.loading = false;
      //   state.success = true;
      // })

      // .addCase(updateStaff.pending, (state, action) => {
      //   state.success = false;
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(updateStaff.rejected, (state, action) => {
      //   state.success = false;
      //   state.loading = false;
      //   state.error = action.error;
      // })
      // .addCase(updateStaff.fulfilled, (state, action) => {
      //   state.error = false;
      //   state.loading = false;
      //   state.success = true;
      // });
  },
});

export const selectLoading = (state) => state.customer.loading;
export const selectSuccess = (state) => state.customer.success;
export const selectCustomer = (state) => state.customer.customer;

export default customerSlice.reducer;
