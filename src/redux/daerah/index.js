import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataProvinsi: {}

}

export const daerahSlice = createSlice({
  name: 'daerah',
  initialState,
  reducers: {
    setDataProvinsi: (state, action) => {
      state.dataProvinsi = action.payload.dataProvinsi;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    // builder.addCase(fetchUserinfo.rejected, (state, { payload }) => {

    // })

  },
})

// Action creators are generated for each case reducer function
export const { setDataProvinsi} = daerahSlice.actions
export default daerahSlice.reducer