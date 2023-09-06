import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  phone: '',
  password: '',
  fullname: '',
  username: '',
  bio: '',
  interest: [],
  facebook: '',
  instagram: '',
  tiktok: '',
  twitter: '',
  job: 0,
  gender: '',
  dateOfBirth: '',
  alamat: {
    address: '',
    provinsi: 0,
    namaProvinsi: '',
    kota: 0,
    kecamatan: 0,
    kelurahan: 0,
    rt: '',
    rw: '',
    kodepos: ''
  },
  kodeReferalDigunakan: '',
  choice: {
    setItem: ()=>{}
  },
  fotoProfile: ''

}

export const authRegistrationSlice = createSlice({
  name: 'authRegistration',
  initialState,
  reducers: {
    setAuthRegistration: (state, action) => {
      state.phone = action.payload.phone;
      state.password = action.payload.password;
    },
    setDataDiriRegistration: (state, action) => {
      state.fullname = action.payload.fullname;
      state.username = action.payload.username;
      state.bio = action.payload.bio;
      state.interest = action.payload.interest;
      state.facebook = action.payload.facebook;
      state.instagram = action.payload.instagram;
      state.tiktok = action.payload.tiktok;
      state.twitter = action.payload.twitter;
      state.job = action.payload.job;
      state.gender = action.payload.gender;
      state.dateOfBirth = action.payload.dateOfBirth;
    },
    setAlamatLengkapRegistration: (state, action) => {
      state.alamat = {
        address: action.payload.address,
        provinsi: action.payload.provinsi,
        namaProvinsi: action.payload.namaProvinsi,
        kota: action.payload.kota,
        kecamatan: action.payload.kecamatan,
        kelurahan: action.payload.kelurahan,
        rt: action.payload.rt,
        rw: action.payload.rw,
        kodepos: action.payload.kodepos
      }
    },
    setFotoProfileRegistration: (state, action) => {
      state.fotoProfile = action.payload.fotoProfile;
    },
    setKodeReferalDigunakan: (state, action) => {
      state.kodeReferalDigunakan = action.payload.kodeReferalDigunakan;
    },
    deleteDataRegistration: (state) => {
      state.phone =  '';
      state.password =  '';
      state.fullname =  '';
      state.username =  '';
      state.job =  '';
      state.bio = '';
      state.interest = [];
      state.facebook = '';
      state.instagram = '';
      state.tiktok = '';
      state.twitter = '';
      state.gender =  '';
      state.dateOfBirth =  '';
    },
    setChoice: (state, action) => {
      state.choice.setItem = action.payload.setItem;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    // builder.addCase(fetchUserinfo.rejected, (state, { payload }) => {

    // })

  },
})

// Action creators are generated for each case reducer function
export const { setAuthRegistration, deleteDataRegistration, 
  setDataDiriRegistration, setChoice, setAlamatLengkapRegistration,
  setFotoProfileRegistration, setKodeReferalDigunakan
 } = authRegistrationSlice.actions
export default authRegistrationSlice.reducer