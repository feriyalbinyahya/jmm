import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    uploadPhoto: {
        photos: [],
        setPhoto: ()=>{}
    },
    tagTeman: {
        teman: [],
        namaTeman: [],
        setNamaTeman: ()=>{},
        setTeman: ()=>{}
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
      is_estimasi_partisipan_required: false,
      is_tag_kawan: false

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
    setTeman: (state, action) => {
      state.tagTeman = {teman: action.payload.teman, namaTeman: action.payload.namaTeman, 
        setNamaTeman: action.payload.setNamaTeman, setTeman: action.payload.setTeman}
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
        desc_required: action.payload.desc_required,
        is_estimasi_partisipan_required: action.payload.is_estimasi_partisipan_required,
        is_tag_kawan: action.payload.is_tag_kawan
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
export const { setPhotos, setLocation, setJenisLaporan, setTeman} = laporanSlice.actions
export default laporanSlice.reducer