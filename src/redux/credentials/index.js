import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    idOrganisasi: '',
    namaOrganisasi: '',
    fotoOrganisasi: '',
    idUser: '',
    isNoHpVerified: 0,
    fullname: '',
    noHp: '',
    status: '',
    token: '',
    fotoProfil: '',
    isReferalOrganization: 0,
    statusPolicy: 0,

}

export const credentialSlice = createSlice({
  name: 'credential',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.idOrganisasi = action.payload.idOrganisasi;
      state.fotoOrganisasi = action.payload.fotoOrganisasi;
      state.namaOrganisasi = action.payload.namaOrganisasi;
      state.idUser = action.payload.idUser;
      state.isNoHpVerified = action.payload.isNoHpVerified;
      state.fullname = action.payload.fullname;
      state.noHp = action.payload.noHp;
      state.status = action.payload.status;
      state.token = action.payload.token;
      state.fotoProfil = action.payload.fotoProfil;
      state.isReferalOrganization = action.payload.isReferalOrganization;
      state.statusPolicy = action.payload.statusPolicy;
    },
    deleteCredentials: (state) => {
        state.idOrganisasi = '';
        state.idRelawan = '';
        state.idUser = '';
        state.isNoHpVerified = 0;
        state.fullname = '';
        state.noHp = '';
        state.status = '';
        state.token = '';
        state.fotoProfil = '';
        state.isReferalOrganization = 0;
        state.statusPolicy = 0;
    },
    setPrivacyPolicy : (state, action) => {
      state.statusPolicy = 1;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    // builder.addCase(fetchUserinfo.rejected, (state, { payload }) => {

    // })

  },
})

// Action creators are generated for each case reducer function
export const { setCredentials, deleteCredentials, setPrivacyPolicy} = credentialSlice.actions
export default credentialSlice.reducer