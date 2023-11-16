import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    google_api_key: '',
    no_hp_cs: ''
}

export const pendukungSlice = createSlice({
  name: 'pendukung',
  initialState,
  reducers: {
    setDataPendukung: (state, action) => {
      state.google_api_key = action.payload.google_api_key;
      state.no_hp_cs = action.payload.no_hp_cs;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    // builder.addCase(fetchUserinfo.rejected, (state, { payload }) => {

    // })

  },
})

// Action creators are generated for each case reducer function
export const { setDataPendukung} = pendukungSlice.actions
export default pendukungSlice.reducer