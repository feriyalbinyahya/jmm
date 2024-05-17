import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../../theme'
import HeaderWhite from '../../../components/header/headerWhite'
import Swiper from 'react-native-swiper'
import LaporanImage from '../../../assets/images/example/laporan.png'
import LaporanServices from '../../../services/laporan'
import { useSelector } from 'react-redux'
import FigurServices from '../../../services/figur'
import IconStar from '../../../assets/images/icon/icon_star.png';
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { formatTimeByOffset } from '../../../utils/Utils';


const DetailFigurScreen = ({navigation, route}) => {
    const {id, jenis} = route.params;
    const [dataDetail, setDataDetail] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const imageList = [LaporanImage, LaporanImage];
    const [media, setMedia] = useState([]);
    const judul = "Ganjar di Gercep Bareng Kreator";
    const deskripsi = "Pak Ganjar menghadiri acara Gercep Bareng Kreator sebagai special guest yang diadakan di Bogor. "
    const capres = "Ganjar Pranowo";
    const tag = "Seminar";
    const perkiraan_partisipan = "250";
    const lokasi = "Jl. Surya Kencana 7, no 10, Kec.Serpong, Kota Tanggerang Selatan, Banten 15310, Indonesia. -001.260176, 36.738851";
    const tanggal = "02 Januari 2023, 10:20:24 WIB";
    const [item, setItem] = useState([]);
    const deviceTimeZone = RNLocalize.getTimeZone();
    const [convertedDate, setConvertedDate] = useState("");

    // Make moment of right now, using the device timezone
    const today = moment().tz(deviceTimeZone);

    // Get the UTC offset in hours
    const currentTimeZoneOffsetInHours = today.utcOffset() / 60;
    useEffect(()=>{
        if(dataDetail.length != 0){
            const convertedToLocalTime = formatTimeByOffset(
                dataDetail.laporan_terkirim,
                currentTimeZoneOffsetInHours,
            );
            setConvertedDate(convertedToLocalTime);
        }
    },[dataDetail])

    const getLaporanDetail = () => {
        setIsLoading(true);
        FigurServices.getDetailFigur(id, jenis)
        .then(res=>{
            var temp_nilai = [];
            console.log(res.data.data);
            setDataDetail(res.data.data[0]);
            for(var i=0; i<parseInt(res.data.data[0].nilai_klasifikasi); i++){
                temp_nilai.push(1);
            }
            setItem(temp_nilai);
            setIsLoading(false);
        })
        .catch(err=>{
            console.log(err.response.message);
        })
    }

    useEffect(()=>{
        getLaporanDetail();
    },[])
    return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
      <HeaderWhite navigation={navigation} title="Detail Laporan" />
      {!isLoading ? <>
        <View style={{paddingHorizontal: '20%'}}><Image style={styles.imageLaporan} source={{uri: `data:image/png;base64,${dataDetail.foto}`}} /></View>
      <View style={{height: 10}}></View>
      <ScrollView style={{paddingHorizontal: 20, height: '33%'}}>
        <View style={{height: 20}}></View>
        <Text style={{...FontConfig.titleTwo, color:'#000000'}}>Detail Laporan</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Laporan Terkirim</Text>
        <Text style={styles.textContent}>{convertedDate}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>{`Nama ${jenis[0].toUpperCase()+jenis.slice(1)}`}</Text>
        <Text style={styles.textContent}>{dataDetail.nama}</Text>
        <View style={{height: 10}}></View>
        {jenis != 'tokoh' ?  <><Text style={styles.textSubject}>{`Pimpinan/Pengasuh ${jenis[0].toUpperCase()+jenis.slice(1)}`}</Text>
        <Text style={styles.textContent}>{dataDetail.pimpinan}</Text>
        <View style={{height: 10}}></View></>: <></>}
        <Text style={styles.textSubject}>Nomor Ponsel</Text>
        <Text style={styles.textContent}>{dataDetail.nomor_ponsel}</Text>
        <View style={{height: 10}}></View>
        {jenis == 'organisasi' ? <><Text style={styles.textSubject}>Alamat Organisasi</Text>
        <Text style={styles.textContent}>{dataDetail.alamat_organisasi}</Text>
        <View style={{height: 10}}></View></> : <></>}
        {jenis != 'tokoh' ? <><Text style={styles.textSubject}>Jumlah Anggota</Text>
        <Text style={styles.textContent}>{dataDetail.jumlah_anggota}</Text>
        <View style={{height: 10}}></View></> : <></>}
        {jenis == 'tokoh' ? <><Text style={styles.textSubject}>Organisasi</Text>
        <Text style={styles.textContent}>{dataDetail.organisasi}</Text>
        <View style={{height: 10}}></View></> : <></>}
        <Text style={styles.textSubject}>{`Lokasi (Kota/Kabupaten)`}</Text>
        <Text style={styles.textContent}>{dataDetail.kabkot}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Kategori</Text>
        <Text style={styles.textContent}>{dataDetail.kategori}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Afilliasi Pilpres 2019</Text>
        <Text style={styles.textContent}>{dataDetail.nama_afiliasi}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Dukungan Capres Saat Ini</Text>
        <Text style={styles.textContent}>{dataDetail.nama_dukungan}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Lingkup Pengaruh</Text>
        <Text style={styles.textContent}>{dataDetail.pengaruh}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Nilai Klasifikasi</Text>
        <View style={{flexDirection: 'row', marginVertical: 3,
        paddingBottom: 5,}}>
            {item.map((item, index)=>{
                return (
                    <Image key={index} source={IconStar} style={{width: 20, height: 20}} />
                )
            })}
        </View>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>{`Rekam Jejak Kegiatan (5 Tahun Terakhir)`}</Text>
        <Text style={styles.textContent}>{dataDetail.rekam_jejak}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Analisis</Text>
        <Text style={styles.textContent}>{dataDetail.analisis}</Text>
        <View style={{height: 10}}></View>
        <Text style={styles.textSubject}>Rekomendasi</Text>
        <Text style={styles.textContent}>{dataDetail.rekomendasi}</Text>
        <View style={{height: 30}}></View>
      </ScrollView></> : 
      <View style={{height: '60%', justifyContent: 'center'}}><ActivityIndicator size="large" color={Color.grayEight} /></View>
      }
    </View>
  )
}

export default DetailFigurScreen

const styles = StyleSheet.create({
    textSuccess: {
        color: Color.successMain,
        ...FontConfig.bodyThree
    },
    textDitolak: {
        color: Color.danger,
        ...FontConfig.bodyThree
    },
    textMenunggu: {
        color: Color.warning,
        ...FontConfig.bodyThree
    },
    boxSuccess: {paddingVertical: 8, marginVertical: 10, paddingHorizontal: 20,  borderWidth: 1, borderColor: Color.successMain, 
        alignSelf: 'baseline', borderRadius: 24, backgroundColor: '#F0FFF3'},
    boxDitolak: {paddingVertical: 8, marginVertical: 10, paddingHorizontal: 20,  borderWidth: 1, borderColor: Color.danger, 
        alignSelf: 'baseline', borderRadius: 24, backgroundColor: Color.redOne},
    boxMenunggu: {paddingVertical: 8, marginVertical: 10, paddingHorizontal: 20,  borderWidth: 1, borderColor: Color.warning, 
        alignSelf: 'baseline', borderRadius: 24, backgroundColor: Color.warningSurface},
    textSubject: {
        ...FontConfig.bodyTwo,
        color:Color.neutralZeroSeven
    },
    textContent: {
        color: '#000000',
        ...FontConfig.bodyTwo,
        marginVertical: 3,
        paddingBottom: 5,
        textAlign: 'justify'
    },
    imageLaporan: {
        height: 150,
        width: '100%'
    }
})