import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, TransitionPresets } from '@react-navigation/native-stack';
import BeritaTerkiniScreen from '../app/beritaScreen/beritaTerkini';
import DropDownPage from '../app/dropDownScreen';
import HomepageScreen from '../app/homepageScreen';
import BuatLaporanScreen from '../app/laporanScreen/buatLaporan';
import LaporanTerkirimScreen from '../app/laporanScreen/buatLaporan/laporanTerkirim';
import PilihTagPage from '../app/laporanScreen/buatLaporan/pilihTag';
import UploadPhotoScreen from '../app/laporanScreen/buatLaporan/uploadPhoto';
import LeaderboardScreen from '../app/leaderboardScreen';
import LokasiScreen from '../app/lokasiScreen';
import LupaPasswordScreen from '../app/lupaPasswordScreen';
import BuatKataSandiScreen from '../app/lupaPasswordScreen/buatKataSandi';
import ProfileScreen from '../app/profileScreen';
import UbahProfileScreen from '../app/profileScreen/ubahProfile';
import HasilGalleryFotoScreen from '../app/profileScreen/ubahProfile/HasilGalleryFoto';
import HasilUbahFotoScreen from '../app/profileScreen/ubahProfile/HasilUbahPhoto';
import UbahAkunScreen from '../app/profileScreen/ubahProfile/ubahAkun';
import UbahDataDiriScreen from '../app/profileScreen/ubahProfile/ubahDataDiri';
import RegisterScreen from '../app/registerScreen';
import KodeReferralScreen from '../app/registerScreen/kodeReferral';
import OrganisasiTerpilihScreen from '../app/registerScreen/organisasiTerpilih';
import AlamatLengkapScreen from '../app/registerScreen/stepFormRegistration/alamatLengkap';
import AmbilSelfieScreen from '../app/registerScreen/stepFormRegistration/captureSelfie';
import AmbilFotoScreen from '../app/registerScreen/stepFormRegistration/captureSelfie/ambilFoto';
import HasilFotoScreen from '../app/registerScreen/stepFormRegistration/captureSelfie/hasilFoto';
import DataDiriScreen from '../app/registerScreen/stepFormRegistration/dataDiri';
import KodeOTPScreen from '../app/registerScreen/stepFormRegistration/kodeOTP';
import OrganisasiChoiceScreen from '../app/registerScreen/stepFormRegistration/organisasiChoice';
import ScanKodeReferralScreen from '../app/registerScreen/stepFormRegistration/scanCode';
import SignInScreen from '../app/signInScreen';
import { navigationRef } from './utils'
import UbahKataSandiScreen from '../app/profileScreen/ubahProfile/UbahKataSandi';
import BeritaDetailScreen from '../app/beritaScreen/detail';
import ListKomentarBeritaScreen from '../app/beritaScreen/listKomentar';
import NotifikasiScreen from '../app/notifikasiScreen';
import { useSelector } from 'react-redux';
import BeritaOrganisasiScreen from '../app/beritaScreen/beritaOrganisasi';
import LaporanScreen from '../app/laporanScreen/laporan';
import StartSurveiScreen from '../app/surveiScreen';
import ListPertanyaan from '../app/surveiScreen/listPertanyaan';
import SurveiTerkirim from '../app/surveiScreen/surveiTerkirim';
import BantuanScreen from '../app/bantuanScreen';
import { useState } from 'react';
import SplashScreen from '../app/splashScreen';
import ListSimpatisan from '../app/simpatisanScreen';
import TambahkanSimpatisan from '../app/simpatisanScreen/buatSimpatisan';
import DataSimpatisanTerkirim from '../app/simpatisanScreen/buatSimpatisan/terkirim';
import HasilUnggahFotoSimpatisan from '../app/simpatisanScreen/buatSimpatisan/hasilUnggahFotoSimpatisan';
import HasilLibraryFotoSimpatisan from '../app/simpatisanScreen/buatSimpatisan/hasilLibraryPhoto';
import DetailSimpatisanScreen from '../app/simpatisanScreen/detail';
import EditSimpatisanScreen from '../app/simpatisanScreen/edit';
import ReferalSimpatisan from '../app/simpatisanScreen/referal';
import DetailLaporanScreen from '../app/laporanScreen/detailLaporan';
import ListMisiScreen from '../app/misiScreen';
import StartMisiScreen from '../app/misiScreen/startMisi';
import FormMisiScreen from '../app/misiScreen/formMisi';
import LaporanView from '../app/misiScreen/laporanKegiatan';
import BannerScreen from '../app/bannerScreen';

const Stack = createNativeStackNavigator();

const AppRoute = () => {
  const [splashLoading, setSplashLoading] = useState(true);
  const token = useSelector((state)=> {
    return state.credential.token;
  })

  return (
    <>{splashLoading ? 
    <SplashScreen setIsLoading={setSplashLoading} /> 
    :<NavigationContainer ref={navigationRef}>
      { token == ''?
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={SignInScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={RegisterScreen} />
        <Stack.Screen options={{ headerShown: false }} name="DataDiriRegister" component={DataDiriScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="AlamatLengkapRegister" component={AlamatLengkapScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="KodeReferralRegister" component={KodeReferralScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="OrganisasiChoiceRegister" component={OrganisasiChoiceScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'simple_push' }} name="OrganisasiTerpilihRegister" component={OrganisasiTerpilihScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="KodeOTPRegister" component={KodeOTPScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="AmbilSelfieRegister" component={AmbilSelfieScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="AmbilFotoRegister" component={AmbilFotoScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="HasilFotoRegister" component={HasilFotoScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="ScanKodeReferralRegister" component={ScanKodeReferralScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="DropDown" component={DropDownPage} />
        <Stack.Screen options={{ headerShown: false}} name="LupaPassword" component={LupaPasswordScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="BuatKataSandi" component={BuatKataSandiScreen} />
      </Stack.Navigator> :

      <Stack.Navigator>  
        <Stack.Screen options={{ headerShown: false }} name="Homepage" component={HomepageScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Notifikasi" component={NotifikasiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Profile" component={ProfileScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="UbahProfile" component={UbahProfileScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="UbahDataDiriProfile" component={UbahDataDiriScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="UbahAkunProfile" component={UbahAkunScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="UbahKataSandiProfile" component={UbahKataSandiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="HasilUbahFoto" component={HasilUbahFotoScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="HasilGalleryFoto" component={HasilGalleryFotoScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Laporan" component={LaporanScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="DetailLaporan" component={DetailLaporanScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ListSimpatisan" component={ListSimpatisan} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="DetailSimpatisan" component={DetailSimpatisanScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="ReferalSimpatisan" component={ReferalSimpatisan} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="TambahkanSimpatisan" component={TambahkanSimpatisan} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="DropDown" component={DropDownPage} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="EditSimpatisan" component={EditSimpatisanScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="HasilUnggahFotoSimpatisan" component={HasilUnggahFotoSimpatisan} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="HasilLibraryFotoSimpatisan" component={HasilLibraryFotoSimpatisan} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="DataSimpatisanTerkirim" component={DataSimpatisanTerkirim} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="BuatLaporan" component={BuatLaporanScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Lokasi" component={LokasiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="AmbilFotoRegister" component={AmbilFotoScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="KodeOTPRegister" component={KodeOTPScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="UploadPhotoLaporan" component={UploadPhotoScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="PilihTagLaporan" component={PilihTagPage} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="LaporanTerkirim" component={LaporanTerkirimScreen} />

        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="BeritaTerkini" component={BeritaTerkiniScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="BeritaOrganisasi" component={BeritaOrganisasiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="BeritaDetail" component={BeritaDetailScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="KomentarBerita" component={ListKomentarBeritaScreen} />

        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="StartSurvei" component={StartSurveiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ListPertanyaanSurvei" component={ListPertanyaan} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="SurveiTerkirim" component={SurveiTerkirim} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Bantuan" component={BantuanScreen} />

        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ListMisi" component={ListMisiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="StartMisi" component={StartMisiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'fade' }} name="Banner" component={BannerScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="FormMisi" component={FormMisiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="LaporanView" component={LaporanView} />
      </Stack.Navigator>
      }
    </NavigationContainer>}
    </>
  )
}

export default AppRoute;