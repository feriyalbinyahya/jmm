import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderRedLinear from '../../components/header/headerRedLinear'
import ImageProfile from '../../assets//images/example/Bonar.png'
import BoxAksi from '../../components/box/boxAksi'
import IconLaporan from '../../assets/images/icon/icon_laporan.png'
import IconReferral from '../../assets/images/icon/icon_referral.png'
import IconSurvey from '../../assets/images/icon/icon_survey.png'
import IconCopy from '../../assets/images/icon/icon_copy.png'
import IconSetting from '../../assets/images/icon/setting.png'
import IconWaiting from '../../assets/images/icon/waiting.png'
import CustomButton from '../../components/customButton'
import IconEdit from '../../assets/images/icon/icon_edit.png'
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';
import CustomBottomSheet from '../../components/bottomSheet'
import ImageQRCode from '../../assets/images/example/QR_Code.png';
import QRCode from 'react-native-qrcode-svg';
import ImageLogout from '../../assets/images/logout.png'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCredentials } from '../../redux/credentials'
import ProfileServices from '../../services/profile'
import Skeleton from '../../components/skeleton'
import { useFocusEffect } from '@react-navigation/native';
import { VERSION } from '../../utils/environment';
import Logo from '../../assets/images/LogoAplikasi.png';

const ProfileScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const [profileData, setProfileData] = useState({});
    const nama = "Bonar";
    const username = "Bonartampan";
    const phone = "089772234987";
    const jumlah = [54, 12, 8];
    const referral = "A-1234567";
    const [copiedText, setCopiedText] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isLogoutVisible, setLogoutVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const status = useSelector((state)=>{
        return state.credential.status;
    })

    const isReferalOrganization = useSelector((state)=>{
        return state.credential.isReferalOrganization;
    })

    handleCopyReferral = () => {
        Clipboard.setString(profileData.kode_referal);
        Snackbar.show({
            text: 'Kode referral telah disalin',
            duration: Snackbar.LENGTH_SHORT,
        });
    }
    handleLihatQRButton = () => {
        setModalVisible(true);
    }

    handleLogout = () => {
        resetCredentials();
    }

    const resetCredentials = () => {
        dispatch(
          deleteCredentials()
        );
      }

    handleKeluarButton = () => {
        setLogoutVisible(true);
    }
    handleEditButton = () => {
        navigation.navigate("UbahProfile");
    }

    const getProfileData = () => {
        setIsLoading(true);
        ProfileServices.getProfile()
        .then(res=> {
            console.log(res.data.data);
            if(res.data.message != "Token expired."){
                setProfileData(res.data.data[0]);
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

    const QRView = ({qr}) => {
        let base64Logo = `data:image/png;base64,${profileData.kode_referal}`;
        return(
        <View style={{alignItems: 'center', padding: 20}}>
            {/**<Image style={{width: 180, height: 180}} source={qr} /> **/}
            <QRCode
            value={profileData.kode_referal}
            />
            {/**<View style={{height: 10}}></View>
            <CustomButton 
            fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
            width='100%' height={44} text="Share"
            backgroundColor={Color.primaryMain}
            />*/}
        </View>
        );
    }

    const LogoutView = () => {
        return(
        <View style={{alignItems: 'center', padding: 20}}>
            {/**<Image style={{width: 180, height: 180}} source={qr} /> **/}
            <Image style={{width: 232, height: 170}} source={ImageLogout} />
            <View style={{height: 10}}></View>
            <Text style={{...FontConfig.titleOne,color: '#000000'
            }}>Yakin ingin keluar?</Text>
            <View style={{height: 10}}></View>
            <Text style={{...FontConfig.bodyTwo,color: '#7B7B7B',textAlign: 'center'
            }}>Sayang sekali... jika keluar, kamu tidak akan mendapatkan informasi apapun lagi.</Text>
            <View style={{height: 20}}></View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                <CustomButton
                onPress={handleLogout} 
                fontStyles={{...FontConfig.buttonOne, color: Color.primaryText}}
                width='43%' height={44} text="Keluar"
                backgroundColor={Color.neutralZeroOne}
                borderColor={Color.primaryText}
                borderWidth={1}
                />
                 <CustomButton 
                fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
                width='43%' height={44} text="Batal"
                onPress={()=>setLogoutVisible(false)}
                backgroundColor={Color.primaryMain}
                />
            </View>
        </View>
        );
    }

    const width = Dimensions.get('window').width;
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
        <CustomBottomSheet children={<QRView qr={ImageQRCode} />} 
        isModalVisible={isModalVisible} setModalVisible={setModalVisible} 
        title="Kode QR Referral" />
        <CustomBottomSheet children={<LogoutView />} 
        isModalVisible={isLogoutVisible} setModalVisible={setLogoutVisible} 
        title="" />
        <HeaderRedLinear navigation={navigation} title="" />
        {!isLoading ? <View style={styles.boxProfile}>
            <View style={styles.boxSection}>
                <View style={styles.profileSection}>
                    <Image style={styles.imageProfile} source={{uri: `data:image/png;base64,${profileData.foto_profil}`}} />
                    <View style={{paddingHorizontal: 15}}>
                        <Text style={styles.textNama}>{profileData.nama_lengkap}</Text>
                        <Text style={styles.textUsername}>@{profileData.username}</Text>
                        <Text style={styles.textPhone}>{profileData.no_hp}</Text>
                    </View>
                </View>
                <Pressable onPress={status == "Diterima" ? handleEditButton : ()=>{}}><Image style={styles.iconEdit} 
                source={status == "Diterima" ? IconEdit : IconSetting} /></Pressable>
            </View>
            <View style={{paddingHorizontal: 10, paddingVertical: 15}}>
                <Text style={{...FontConfig.bodyThree, color: Color.secondaryText}}>Bio:</Text>
                <Text style={{...FontConfig.bodyTwo, color: Color.primaryText}}>{profileData.bio}</Text>
            </View>
            <View style={{height: 20}}></View>
            {
                status != "Diterima" ? 
                <View style={styles.waitingStatus}>
                    <Image source={IconWaiting} style={{width: 34, height: 34}} />
                    <View style={{paddingHorizontal: 15, width: '90%'}}>
                        <Text style={{...FontConfig.buttonThree, color: Color.neutralTen}}>Menunggu Persetujuan</Text>
                        <Text style={{...FontConfig.bodyThree, color: Color.neutralTen}}>Silahkan tunggu persetujuan akunmu untuk dapat menggunakan fitur.</Text>
                    </View>
                </View> 
                : <></>
            }
            
            <View style={styles.aksiSection}>
                <BoxAksi image={IconLaporan} text="Laporan" jumlah={profileData.total_laporan} imageHeight={18} imageWidth={14} />
                <BoxAksi image={IconReferral} text="Referral" jumlah={profileData.total_referral} imageHeight={24} imageWidth={24} />
                <BoxAksi image={IconSurvey} text="Survei" jumlah={profileData.total_survey} imageHeight={22} imageWidth={22} />
            </View>
        </View> : 
        <View style={styles.boxProfile}>
            <View style={styles.boxSection}>
                <View style={styles.profileSection}>
                    <Skeleton height={72} width={72} style={{borderRadius: 40}} />
                    <View style={{paddingHorizontal: 15}}>
                        <Skeleton height={18} width={width*0.4} style={{borderRadius: 3}} />
                        <Skeleton height={14} width={width*0.3} style={{borderRadius: 3, marginTop: 8}} />
                        <Skeleton height={14} width={width*0.3} style={{borderRadius: 3, marginTop: 8}} />
                    </View>
                </View>
                
            </View>
            <View style={{height: 30}}></View>
            <View style={styles.aksiSection}>
                <Skeleton height={60} width={width*0.8} style={{borderRadius: 5}} />
            </View>
        </View>
        }
        <View style={{height: 20}}></View>
        { status == "Diterima" && isReferalOrganization == 1 ? <View style={styles.boxReferral}>
            { !isLoading ?
                <><View style={{width: '48%'}}>
                    <Text style={styles.textKodeAnda}>Kode referral anda</Text>
                    <Text style={styles.textReferral}>{profileData.kode_referal}</Text>
                </View>
                <Pressable onPress={handleCopyReferral} style={styles.buttonCopy}><Image style={styles.iconCopy} source={IconCopy} /></Pressable>
                <CustomButton onPress={handleLihatQRButton} text="Lihat QR" 
                fontStyles={{...FontConfig.buttonZeroTwo, color: Color.neutralZeroOne}} 
                width={90} height={40} backgroundColor={Color.primaryMain} /></> : 
                <Skeleton height={40} width={width*0.8} style={{borderRadius: 5}}/>
            }
        </View> : <></>}
        <View style={{padding: 20, height: '38%', justifyContent: 'space-between'}}>
            <CustomButton
            onPress={()=>navigation.navigate('Leaderboard')} 
            fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
            width='100%' height='17%' text="Leaderboard"
            disabled={status == "Diterima" ? false : true}
            backgroundColor={Color.primaryMain}
            />
            <View style={{height: 10}}></View>
            {/**<CustomButton
            onPress={()=>navigation.navigate('Bantuan')} 
            fontStyles={{...FontConfig.buttonOne, color: Color.neutralZeroOne}}
            width='100%' height='14%'  text="Bantuan"
            backgroundColor={Color.primaryMain}
            />
            <View style={{height: 10}}></View> */}
            <CustomButton 
            onPress={handleKeluarButton}
            fontStyles={{...FontConfig.buttonOne, color: Color.primaryMain}}
            width='100%' height='17%' text="Keluar" borderWidth={1}
            borderColor={Color.primaryMain}
            backgroundColor={Color.neutralZeroOne}
            />
            <View style={{height: 10}}></View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image source={Logo} style={{width: 240, height: 96}} />
            </View>
            <View style={styles.version}>
                <Text style={{...FontConfig.bodyThree, color: Color.graySeven}}>{VERSION}</Text>
            </View>
        </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    boxProfile: {
        marginHorizontal: 20,
        backgroundColor: Color.neutralZeroOne,
        elevation: 10,
        shadowOffset: {height: 2, width: 1},
        marginTop: -100,
        borderRadius: 12,
        padding: 20

    },
    boxReferral: {
        marginHorizontal: 20,
        height: '9%',
        backgroundColor: Color.neutralZeroOne,
        elevation: 10,
        shadowOffset: {height: 2, width: 1},
        borderRadius: 12,
        paddingHorizontal: 20,
        paddingVertical: 9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    boxSection: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonCopy: {
        borderWidth: 1,
        borderColor: Color.neutralZeroSix,
        width: 32,
        height: 32,
        padding: 5,
        borderRadius: 4
    },
    iconCopy: {
        width: 18,
        height: 18
    },
    profileSection: {
        flexDirection: 'row',
        width: '70%'
    },
    imageProfile: {
        height: 72,
        width: 72,
        borderRadius: 100
    },
    textNama: {
        ...FontConfig.titleOne,
        color: '#000000',
    },
    iconEdit: {
        width: 24,
        height: 24
    },
    textPhone: {
        ...FontConfig.bodyTwo,
        color: Color.secondaryText
    },
    textReferral: {
        ...FontConfig.headingFour,
        color: '#1C1C1C',
        paddingVertical: 3
    },
    textUsername: {
        ...FontConfig.bodyTwo,
        color: Color.neutralZeroSix,
        paddingVertical: 2
    },
    aksiSection: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    textKodeAnda: {
        ...FontConfig.captionZero,
        color:'#7B7B7B'
    },
    waitingStatus: {
        padding: 15,
        backgroundColor: Color.warningSurface,
        flexDirection: 'row',
        marginBottom: 15
    },
    version: {
        alignItems: 'center',
        backgroundColor: Color.neutralZeroOne,
        justifyContent: 'center',
        height: 20,
      }
})