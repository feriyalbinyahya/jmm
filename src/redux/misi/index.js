import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tagTeman: {
        teman: [],
        namaTeman: [],
        setNamaTeman: ()=>{},
        setTeman: ()=>{}
    },

}

export const misiSlice = createSlice({
  name: 'misi',
  initialState,
  reducers: {
    setTeman: (state, action) => {
      state.tagTeman = {teman: action.payload.teman, namaTeman: action.payload.namaTeman, 
        setNamaTeman: action.payload.setNamaTeman, setTeman: action.payload.setTeman}
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    // builder.addCase(fetchUserinfo.rejected, (state, { payload }) => {

    // })

  },
})

// Action creators are generated for each case reducer function
export const {  setTeman} = misiSlice.actions
export default misiSlice.reducer