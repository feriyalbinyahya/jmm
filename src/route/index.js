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
import { useDispatch, useSelector } from 'react-redux';
import BeritaOrganisasiScreen from '../app/beritaScreen/beritaOrganisasi';
import LaporanScreen from '../app/laporanScreen/laporan';
import StartSurveiScreen from '../app/surveiScreen';
import ListPertanyaan from '../app/surveiScreen/listPertanyaan';
import SurveiTerkirim from '../app/surveiScreen/surveiTerkirim';
import BantuanScreen from '../app/bantuanScreen';
import { useEffect, useRef, useState } from 'react';
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
import PengumumanScreen from '../app/notifikasi/pengumuman';
import DetailAcaraScreen from '../app/acaraScreen/detail';
import InformationEvent from '../app/acaraScreen/information';
import GenSatSetID from '../app/profileScreen/gensatsetid';
import ListAcaraScreen from '../app/acaraScreen/listAcara';
import { setDataPendukung } from '../redux/pendukung';
import LoginServices from '../services/login';
import analytics from '@react-native-firebase/analytics';
import PoinkuScreen from '../app/poinkuScreen';
import TukarPoinScreen from '../app/poinkuScreen/tukarPoin';
import DetailTukarPoin from '../app/poinkuScreen/tukarPoin/detail';
import RiwayatPengumpulanPoinScreen from '../app/poinkuScreen/pengumpulanPoin';
import PertanyaanPoinScreen from '../app/poinkuScreen/pertanyaan';
import ListBlokirScreen from '../app/profileScreen/blokir';
import ListFigur from '../app/figurScreen';
import BuatFigurScreen from '../app/figurScreen/buatFigur';
import DetailFigurScreen from '../app/figurScreen/detailFigur';
import KartuAnggotaScreen from '../app/kartuAnggotaScreen';
import KeluarOrganisasiScreen from '../app/kartuAnggotaScreen/keluarOrganisasi';
import PindahOrganisasiScreen from '../app/kartuAnggotaScreen/pindahOrganisasi';
import DiskusiScreen from '../app/diskusiScreen/beritaTerkini';
import InfoAkunScreen from '../app/profileScreen/infoAkun';
import CSRScreen from '../app/csrScreen';
import ProgramBaruScreen from '../app/csrScreen/programBaru';
import BuatProposalScreen from '../app/csrScreen/programBaru/buatProposal';
import ProposalTerkirimScreen from '../app/csrScreen/programBaru/proposalTerkirim';
import ProgramBerjalanScreen from '../app/csrScreen/programBerjalan';

const Stack = createNativeStackNavigator();

const AppRoute = () => {
  const [splashLoading, setSplashLoading] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector((state)=> {
    return state.credential.token;
  })

  const routeNameRef = useRef();

  const savePendukung = (data) => {
    dispatch(
      setDataPendukung({google_api_key: data.google_api_key, no_hp_cs: data.no_hp_cs})
    );
  }

  const getDataPendukung = () =>{
    LoginServices.pendukung()
    .then(res=>{
      savePendukung(res.data.data);
    })
    .catch(err=>{
      console.log(err.response);
    })
  }

  useEffect(()=>{
    getDataPendukung();
  },[])

  return (
    <>{splashLoading ? 
    <SplashScreen setIsLoading={setSplashLoading} /> 
    :<NavigationContainer ref={navigationRef}
    onReady={() => {
      routeNameRef.current = navigationRef.current.getCurrentRoute().name;
    }}
    onStateChange={async () => {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = navigationRef.current.getCurrentRoute().name;
      console.log(previousRouteName);
      console.log(currentRouteName);

      if (previousRouteName !== currentRouteName) {
        await analytics().logScreenView({
          screen_name: currentRouteName,
          screen_class: currentRouteName,
        });
        await analytics().logEvent('screen_view', {
          firebase_screen: currentRouteName,
          firebase_screen_class: currentRouteName,
        });
      }
      routeNameRef.current = currentRouteName;
    }}
    >
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
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Pengumuman" component={PengumumanScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Profile" component={ProfileScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ListBlokir" component={ListBlokirScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="PoinLeaderboard" component={PoinkuScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="TukarPoin" component={TukarPoinScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="RiwayatPengumpulanPoin" component={RiwayatPengumpulanPoinScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="DetailTukarPoin" component={DetailTukarPoin} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="PertanyaanPoin" component={PertanyaanPoinScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="UbahProfile" component={UbahProfileScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="UbahDataDiriProfile" component={UbahDataDiriScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="UbahAkunProfile" component={UbahAkunScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="InfoAkunProfile" component={InfoAkunScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="UbahKataSandiProfile" component={UbahKataSandiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="HasilUbahFoto" component={HasilUbahFotoScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="HasilGalleryFoto" component={HasilGalleryFotoScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Laporan" component={LaporanScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="DetailLaporan" component={DetailLaporanScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ListSimpatisan" component={ListSimpatisan} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="DetailSimpatisan" component={DetailSimpatisanScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="ReferalSimpatisan" component={ReferalSimpatisan} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="TambahkanSimpatisan" component={TambahkanSimpatisan} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ListFigur" component={ListFigur} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="BuatFigur" component={BuatFigurScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="DetailFigur" component={DetailFigurScreen} />
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
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Diskusi" component={DiskusiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ListAcara" component={ListAcaraScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="BeritaOrganisasi" component={BeritaOrganisasiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="BeritaDetail" component={BeritaDetailScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="KomentarBerita" component={ListKomentarBeritaScreen} />

        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="StartSurvei" component={StartSurveiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ListPertanyaanSurvei" component={ListPertanyaan} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="SurveiTerkirim" component={SurveiTerkirim} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="Bantuan" component={BantuanScreen} />

        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ListCSR" component={CSRScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ProgramBaru" component={ProgramBaruScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ProgramBerjalan" component={ProgramBerjalanScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="BuatProposal" component={BuatProposalScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ProposalTerkirim" component={ProposalTerkirimScreen} />

        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="ListMisi" component={ListMisiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="StartMisi" component={StartMisiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'fade' }} name="Banner" component={BannerScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="FormMisi" component={FormMisiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="LaporanView" component={LaporanView} />
        <Stack.Screen options={{ headerShown: false, animation: 'fade' }} name="DetailAcara" component={DetailAcaraScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="GenSatSetID" component={GenSatSetID} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="KartuAnggota" component={KartuAnggotaScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="KeluarOrganisasi" component={KeluarOrganisasiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'slide_from_right' }} name="PindahOrganisasi" component={PindahOrganisasiScreen} />
        <Stack.Screen options={{ headerShown: false, animation: 'none' }} name="InformationEvent" component={InformationEvent} />
      </Stack.Navigator>
      }
    </NavigationContainer>}
    </>
  )
}

export default AppRoute;