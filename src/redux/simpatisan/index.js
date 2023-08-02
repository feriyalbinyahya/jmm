import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    uploadPhoto: {
        photo: "",
        setPhoto: ()=>{}
    },

}

export const simpatisanSlice = createSlice({
  name: 'simpatisan',
  initialState,
  reducers: {
    setPhotos: (state, action) => {
      state.uploadPhoto.photo = action.payload.photo;
      state.uploadPhoto.setPhoto = action.payload.setPhoto;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    // builder.addCase(fetchUserinfo.rejected, (state, { payload }) => {

    // })

  },
})

// Action creators are generated for each case reducer function
export const { setPhotos} = simpatisanSlice.actions
export default simpatisanSlice.reducer