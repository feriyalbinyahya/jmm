import { StyleSheet, Text, View, Image, Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Color, FontConfig } from '../../../theme'
import HeaderRedLinear from '../../../components/header/headerRedLinear'
import ImageProfile from '../../../assets//images/example/Bonar.png'
import IconEdit from '../../../assets/images/icon/icon_edit.png'
import { useDispatch, useSelector } from 'react-redux'
import CustomBottomSheet from '../../../components/bottomSheet'
import ChildrenButton from '../../../components/customButtonChildren'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { launchImageLibrary } from 'react-native-image-picker'
import ProfileServices from '../../../services/profile'
import { useFocusEffect } from '@react-navigation/native';
import IconFacebook from '../../../assets/images/icon/icon_facebook.png';
import IconTwitter from '../../../assets/images/icon/icon_twitter.png';
import IconTiktok from '../../../assets/images/icon/icon_tiktok.png';
import IconInstagram from '../../../assets/images/icon/icon_instagram.png';

const UbahProfileScreen = ({navigation}) => {
    const subjectDataDiri = ["Nama Lengkap", "Username", "Tentangmu", "Pekerjaan",
     "Jenis Kelamin", "Tanggal Lahir"];
    const [dataDiri, setDataDiri] = useState([]);
    const [fotoProfil, setFotoProfil] = useState("");
    const [profileData, setProfileData] = useState({});
    const subjectAccount = [
        {text: "Nomor Ponsel", editPath: "UbahAkunProfile"}, 
        {text:"Kata Sandi", editPath:"KodeOTPRegister"}
    ];
    const [account, setAccount] = useState([]);
    const subjectAlamat = ["Alamat", "Provinsi", "Kota/Kab", "Kecamatan", "Desa/Kelurahan", "RT / RW"];
    const [alamat, setAlamat] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [imageGallery, setImageGallery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [medsos, setMedsos] = useState([
        {"instagram": "", "facebook": "", "tiktok": "", "twitter": ""}
    ]);

    const MediaSosialItem = ({image, username}) => {
        return(
        <Pressable style={{flexDirection: 'row'}}>
            <Image source={image} style={{width: 18, height: 18}} />
            <View style={{width: 5}}></View>
            <Text style={styles.textContent}>{username}</Text>
        </Pressable>)
    }


    const loadDataDiri = (dataDiriStore) => {
        let dataDiri = [];
        let usernameX = dataDiriStore.username;
        if(dataDiriStore.username == ''){
            usernameX = '(Belum diisi)';
        }
        dataDiri.push(dataDiriStore.nama_lengkap, usernameX, dataDiriStore.bio, dataDiriStore.pekerjaan,
            dataDiriStore.jenis_kelamin, dataDiriStore.tanggal_lahir);

        setDataDiri(dataDiri);
        setFotoProfil(dataDiriStore.foto_profil);
    }

    const loadAccount = (accountStore) => {
        let account = [];
        account.push(accountStore.no_hp, "********");
        setAccount(account);
    }

    const loadAlamat = (alamatStore) => {
        let alamat = [];
        let rt = "";
        let rw = "";
        if(alamatStore.rt == ""){
            rt = "-";
        }else{
            rt = alamatStore.rt;
        }
        if(alamatStore.rw == ""){
            rw = "-";
        }else{
            rw = alamatStore.rw;
        }
        let rtrw = rt + " / " + rw;
        alamat.push(alamatStore.alamat, alamatStore.provinsi, alamatStore.kabkot, alamatStore.kecamatan,
            alamatStore.kelurahan, rtrw);
        setAlamat(alamat);
    }

    const getProfileData = () => {
        setIsLoading(true);
        ProfileServices.getProfile()
        .then(res=> {
            if(res.data.message != "Token expired."){
                if(res.data.data[0].medsos.length != 0){
                    setMedsos(res.data.data[0].medsos);
                }
                loadDataDiri(res.data.data[0]);
                loadAccount(res.data.data[0]);
                loadAlamat(res.data.data[0]);
                setIsLoading(false);
            }

        })
        .catch(err=> {
            console.log(err);
        })
    }

    useFocusEffect(
        React.useCallback(() => {
          getProfileData();
        }, [])
      );

    handleAmbilFoto = () => {
        setModalVisible(false);
        navigation.navigate("AmbilFotoRegister", {path: 'HasilUbahFoto', type: 'holes'});
    }

    handlePilihDariGaleri = async () => {
        setModalVisible(false);
        let pathImage = '';
        let imageBase64;
        const options= {
            storageOptions: {
                mediaType: 'photo',
                quality: 0.8,
            },
            includeBase64: true
        };
        await launchImageLibrary(options, (response)=> {
            pathImage = {uri: 'data:image/jpeg;base64,' + response.assets[0].base64}
            imageBase64 = response.assets[0].base64;
        });

        navigation.navigate("HasilGalleryFoto", {imageSource: pathImage, imageBase64: imageBase64});

    }

    const UbahPhotoModal = () => {
        return(
        <View style={{flexDirection: 'row', paddingVertical: 10, justifyContent: 'space-evenly'}}>
            <ChildrenButton onPress={handleAmbilFoto} height='95%' width='45%' children={<View style={{alignItems: 'center'}}>
                <Text style={styles.textModal}>Ambil Foto</Text>
                <Ionicons name="camera" size={20} color={Color.primaryMain} />
            </View>} borderColor={Color.primaryMain} />
            <ChildrenButton onPress={handlePilihDariGaleri} width='45%' height='95%' children={<View style={{alignItems: 'center'}}>
                <Text style={styles.textModal}>Pilih Dari Galeri</Text>
                <Ionicons name="folder" size={20} color={Color.primaryMain} />
            </View>} borderColor={Color.primaryMain} />
        </View>
        );
    }
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
        <CustomBottomSheet children={<UbahPhotoModal />} 
        isModalVisible={isModalVisible} setModalVisible={setModalVisible} 
        title="Ubah Foto Profil" />
        <HeaderRedLinear navigation={navigation} title="Ubah Profil" children={(<View style={styles.headerSection}>
            <Image source={{uri: `data:image/png;base64,${fotoProfil}`}} style={styles.imageProfile} />
            <Pressable onPress={()=> setModalVisible(true)}><Text style={styles.textUbahFoto}>Ubah Foto Profil</Text></Pressable>
        </View>)} />
        {!isLoading ? <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.containSection}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.textTitleSection}>Data Diri</Text>
                    <Pressable onPress={()=> {
                    navigation.navigate("UbahDataDiriProfile", 
                    {namaLengkap: dataDiri[0], userName: dataDiri[1], biodata: dataDiri[2], medsos: medsos});
                    }}><Image style={styles.iconEdit} source={IconEdit} />
                    </Pressable>
                </View>
                <View style={{height: 10}}></View>
                <View>
                    {subjectDataDiri.map((item, index) => {
                        return(
                            <View style={styles.rowSection} key={item}>
                                <Text style={styles.textSubject}>{item}</Text>
                                <Text style={styles.textData}>{dataDiri[index]}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
            {medsos.length != 0 ? <View style={{flexDirection: 'row', flexWrap: 'wrap', columnGap: 30, rowGap: 10, paddingHorizontal: 20}}>
                {medsos[0].facebook != "" ? <MediaSosialItem image={IconFacebook} username={medsos[0].facebook} /> : <></>}
                {medsos[0].instagram != "" ? <MediaSosialItem image={IconInstagram} username={medsos[0].instagram} /> : <></>}
                {medsos[0].tiktok != "" ? <MediaSosialItem image={IconTiktok} username={medsos[0].tiktok} /> : <></>}
                {medsos[0].twitter != "" ? <MediaSosialItem image={IconTwitter} username={medsos[0].twitter} /> : <></>}
            </View> : <></>}
            <View style={{height: 15}}></View>
            <View style={{borderWidth: 0.5, borderColor: Color.lightBorder}}></View>
            <View style={styles.containSection}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.textTitleSection}>Info Akun</Text>
                </View>
                <View style={{height: 10}}></View>
                <View>
                    {subjectAccount.map((item, index) => {
                        return(
                            <View key={index} style={styles.editInfoAkun}>
                                <View style={styles.rowSection}>
                                    <Text style={styles.textSubject}>{item.text}</Text>
                                    <Text style={styles.textData}>{account[index]}</Text>
                                </View>
                                <Pressable onPress={()=> {
                                navigation.navigate(item.editPath, 
                                {phone: account[0], onPress: "ubahakun"});
                                }}>
                                <Image style={styles.iconEdit} source={IconEdit} /></Pressable>
                            </View>
                        );
                    })}
                </View>
            </View>
            <View style={{borderWidth: 0.5, borderColor: Color.lightBorder}}></View>
            <View style={styles.containSection}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.textTitleSection}>Alamat Lengkap</Text>
                </View>
                <View style={{height: 10}}></View>
                <View>
                    {subjectAlamat.map((item, index) => {
                        return(
                            <View style={styles.rowSection} key={item}>
                                <Text style={styles.textSubject}>{item}</Text>
                                <Text style={styles.textData}>{alamat[index]}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </ScrollView> : <View style={{flex: 1, marginTop: '40%'}}><ActivityIndicator size="large" color={Color.graySix} /></View>}
    </View>
  )
}

export default UbahProfileScreen

const styles = StyleSheet.create({
    rowSection: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        width: '90%'
    },
    textModal: {
        ...FontConfig.bodyOne,
        color: Color.primaryMain
    },
    textContent: {
        ...FontConfig.bodyTwo,
        color: '#000000'
    },
    imageProfile: {
        width: 72,
        height: 72,
        borderRadius: 10
    },
    editInfoAkun: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerSection: {
        alignItems: 'center',
    },
    textUbahFoto: {
        ...FontConfig.buttonOne,
        color: Color.grayOne,
        marginVertical: 6
    },
    containSection: {
        padding: 20
    },
    textTitleSection: {
        ...FontConfig.titleThree,
        color: Color.title
    },
    textSubject: {
        ...FontConfig.bodyThree,
        color: Color.grayEight,
        width: '40%',
    },
    textData: {
        ...FontConfig.titleThree,
        color: Color.title,
        width: '70%'
    },
    iconEdit: {
        width: 16,
        height: 16
    },
})