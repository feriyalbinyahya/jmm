import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    uploadPhoto: {
        photos: [],
        setPhoto: ()=>{}
    },
    location: {
      lokasi: '',
      long: '',
      lat: '',
      setLokasi: ()=>{},
      setLong: ()=>{},
      setLat: ()=>{}
    },
    jenisLaporan: {
      id: 0,
      nama: '',
      deskripsi: '',
      desc_required: true,
    }

}

export const laporanSlice = createSlice({
  name: 'laporan',
  initialState,
  reducers: {
    setPhotos: (state, action) => {
      state.uploadPhoto.photos = action.payload.photos;
      state.uploadPhoto.setPhoto = action.payload.setPhoto;
    },
    setLocation: (state, action) => {
      state.location = {lokasi: action.payload.lokasi, lat: action.payload.lat, long: action.payload.long,
         setLokasi: action.payload.setLokasi, setLat: action.payload.setLat, setLong: action.payload.setLong}
    },
    setJenisLaporan: (state, action) => {
      state.jenisLaporan = {
        id: action.payload.id,
        nama : action.payload.nama,
        deskripsi: action.payload.deskripsi,
        desc_required: action.payload.desc_required
      }
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    // builder.addCase(fetchUserinfo.rejected, (state, { payload }) => {

    // })

  },
})

// Action creators are generated for each case reducer function
export const { setPhotos, setLocation, setJenisLaporan} = laporanSlice.actions
export default laporanSlice.reducer