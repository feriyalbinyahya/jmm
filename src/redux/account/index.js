import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataDiri: {
        fullname: 'Bonar',
        username: 'Bonartampan',
        job: 'Pelajar/Mahasiswa',
        gender: 'l',
        dateOfBirth: '17/07/2002',
    },
    account: {
        phone: '08118267211',
        password: 'Bonar1717',
    },
    alamat: {
        alamat: 'Jl. Relawan, Gg. 10, No. 10',
        provinsi: 'Jawa Tengah',
        kota: 'Semarang',
        kecamatan: 'Candi Sari',
        kelurahan: 'Kaliwiru',
        rt: '02',
        rw: '07'
    },

}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount: (state, action) => {
      state.account.phone = action.payload.phone;
      state.account.password = action.payload.password;
    },
    setDataDiri: (state, action) => {
      state.dataDiri.fullname = action.payload.fullname;
      state.dataDiri.username = action.payload.username;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    // builder.addCase(fetchUserinfo.rejected, (state, { payload }) => {

    // })

  },
})

// Action creators are generated for each case reducer function
export const { setAccount, setDataDiri, setAlamat } = accountSlice.actions
export default accountSlice.reducer