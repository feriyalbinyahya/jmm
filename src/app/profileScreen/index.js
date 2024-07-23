import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator, Dimensions, Linking, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderRedLinear from '../../components/header/headerRedLinear'
import ImageProfile from '../../assets//images/example/Bonar.png'
import BoxAksi from '../../components/box/boxAksi'
import IconLaporan from '../../assets/images/icon/icon_laporan.png'
import IconReferral from '../../assets/images/icon/icon_referral.png'
import IconSurvey from '../../assets/images/icon/icon_survey.png'
import IconCopy from '../../assets/images/icon/icon_copy.png'
import IconQR from '../../assets/images/icon/qr_id.png'

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
import IconArrowLeft from '../../assets/images/icon/button_left.png'
import IconSetting from '../../assets/images/icon/button_setting.png'
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
import ChildrenButton from '../../components/customButtonChildren';
import BadgeNoMember from '../../assets/images/icon/badge_nomember.png';
import BadgeBronze from '../../assets/images/icon/badge_bronze.png';
import BadgeSilver from '../../assets/images/icon/badge_silver.png';
import BadgeGold from '../../assets/images/icon/badge_gold.png';
import BadgePlatinum from '../../assets/images/icon/badge_platinum.png';
import BadgeDiamond from '../../assets/images/icon/badge_diamond.png';
import IconPoinWhite from '../../assets/images/icon/icon_poin_white.png';
import { NAMA_APP, NAMA_APP_CAPS, rankPoin } from '../../utils/const'

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
    const [isModalWhatsappVisible, setModalWhatsappVisible] = useState(false);
    const [isLogoutVisible, setLogoutVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [account, setAccount] = useState([]);
    const status = useSelector((state)=>{
        return state.credential.status;
    })

    const keaktifan = useSelector((state)=>{
        return state.credential.keaktifan;
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

    const loadAccount = (accountStore) => {
        let account = [];
        account.push(accountStore.no_hp, "********");
        setAccount(account);
    }


    handlePoinButton = () => {
        navigation.navigate("PoinLeaderboard",  {infoPoin: profileData.infoPoin});
    }
    handleEditButton = () => {
        navigation.navigate("UbahProfile");
    }

    const getProfileData = () => {
        setIsLoading(true);
        ProfileServices.getProfile()
        .then(res=> {
            console.log(res.data.data[0]);
            if(res.data.message != "Token expired."){
                loadAccount(res.data.data[0]);
                setProfileData(res.data.data[0]);
                setIsLoading(false);
            }

        })
        .catch(err=> {
            console.log(err.response);
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

    const no_hp_cs = "0811-1111-1111";

    const handleWhatsapp = () => {
        var no_hp = no_hp_cs.substring(1);
        const url = `https://wa.me/62${no_hp}`;
        Linking.openURL(url);
    }

    const ContactUs = () => {
        return(
          <View style={{alignItems: 'center', justifyContent: 'center', paddingVertical: 20}}>
            <View style={{alignItems: 'center'}}>
              <Text style={{...FontConfig.bodyThree, color: Color.neutralColorGrayEight}}>Customer Service {NAMA_APP}</Text>
              <View style={{height: 5}}></View>
              <Text style={{...FontConfig.buttonThree, color: Color.primaryMain}}>{no_hp_cs}</Text>
            </View>
            <View style={{height: 10}}></View>
            <ChildrenButton borderColor={Color.successMain} 
            borderRadius={26}
            onPress={handleWhatsapp}
            height={44} backgroundColor={Color.neutralZeroOne}
            children={<View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name="logo-whatsapp" size={21} color={Color.successMain} />
              <View style={{width: 5}}></View>
              <Text style={{...FontConfig.buttonOne, color: Color.successMain}}>Hubungi Whatsapp</Text>
            </View>}
            />
          </View>
        )
    }

    

    const RankPoin = ({image, rank}) =>{
        return(
            <View style={{flexDirection: 'row', alignSelf: 'baseline', alignItems: 'center',
            paddingHorizontal: 10, paddingVertical: 2, backgroundColor: '#404040', borderRadius: 34}}>
                <Image style={{width: 11.7, height: 12}} source={image} />
                <Text style={{...FontConfig.buttonThree, marginTop: 2, color: Color.neutralZeroOne, marginHorizontal: 3}}>{rank}</Text>
            </View>
        )
    }

    const width = Dimensions.get('window').width;
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne}}>
        <CustomBottomSheet children={<QRView qr={ImageQRCode} />} 
        isModalVisible={isModalVisible} setModalVisible={setModalVisible} 
        title="Kode QR Referral" />
        <CustomBottomSheet children={<ContactUs />} 
        isModalVisible={isModalWhatsappVisible} setModalVisible={setModalWhatsappVisible} 
        title="Hubungi Kami" />
        <CustomBottomSheet children={<LogoutView />} 
        isModalVisible={isLogoutVisible} setModalVisible={setLogoutVisible} 
        title="" />
        {!isLoading ? <View style={styles.boxProfile}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Pressable onPress={()=>navigation.goBack()}>
                    <Image source={IconArrowLeft} style={{width: 36, height: 36}} />
                </Pressable>
            </View>
            <View style={{height: 20}}></View>
            <View style={styles.boxSection}>
                <Image style={styles.imageProfile} source={{uri: `data:image/png;base64,${profileData.foto_profil}`}} />
                <View style={{height: 10}}></View>
                <View style={{alignItems: 'center', paddingHorizontal: 20}}>
                    <Text style={styles.textNama}>{profileData.nama_lengkap}</Text>
                    <Text style={styles.textUsername}>@{profileData.username}</Text>
                    {/**<Text style={styles.textPhone}>{profileData.no_hp}</Text>
                    <View style={{height: 10}}></View>
                    <Text style={{...FontConfig.bodyTwo, color: Color.neutralZeroOne}}>{profileData.bio}</Text>*/}
                </View>
            </View>
            <View style={{height: 20}}></View>
            {/** 
            <View style={styles.aksiSection}>
                <BoxAksi image={IconLaporan} text="KAWAN" jumlah={profileData.total_kawan} imageHeight={18} imageWidth={14} />
                <View style={status == "Diterima" ? styles.garisVertical : styles.garisVerticalMati}></View>
                <BoxAksi image={IconReferral} text={NAMA_APP_CAPS} jumlah={profileData.total_referral} imageHeight={24} imageWidth={24} />
                <View style={status == "Diterima" ? styles.garisVertical : styles.garisVerticalMati}></View>
                <BoxAksi image={IconSurvey} text="SURVEI" jumlah={profileData.total_survey} imageHeight={22} imageWidth={22} />
            </View>*/}
            
        </View> : 
        <View style={styles.boxProfile}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Pressable onPress={()=>navigation.goBack()}>
                    <Image source={IconArrowLeft} style={{width: 36, height: 36}} />
                </Pressable>
                <Pressable onPress={status == "Diterima" ? handleEditButton : ()=>{}}>
                    <Image source={IconSetting} style={{width: 36, height: 36}} />
                </Pressable>
            </View>
            <View style={{height: 20}}></View>
            <View style={{height: '40%', justifyContent: 'center'}}><ActivityIndicator size="large" color={Color.neutralZeroOne} /></View>
        </View>
        }
    
        <ScrollView>
            <View style={{height: 20}}></View>
            <Text style={{...FontConfig.buttonFour, color: Color.neutral70,
            paddingHorizontal: 20}}>Profil Saya</Text>
            <View style={{height: 5}}></View>
            <View style={{borderWidth: 0.55, borderColor: Color.lightBorder}}></View>
            <Pressable onPress={keaktifan == 'Active' ? ()=>navigation.navigate('UbahProfile') : ()=>{}} style={{flexDirection: 'row', paddingHorizontal: 20,
            paddingVertical: 15, alignItems: 'center', 
            justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Color.lightBorder}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="person-outline" color={keaktifan == 'Active' ? Color.hitam : Color.neutralZeroSix} size={18} />
                    <View style={{width: 10}}></View>
                    <Text style={{...FontConfig.buttonOne, color: keaktifan == 'Active' ? Color.hitam : Color.neutralZeroSix}}>{`Data Diri`}</Text>
                </View>
                <Ionicons name="chevron-forward-outline" color={keaktifan == 'Active' ? Color.hitam : Color.neutralZeroSix} size={18} />
            </Pressable>
            <Pressable onPress={keaktifan == 'Active' ? ()=>navigation.navigate("InfoAkunProfile", 
                                {phone: account[0], password: account[1]}) : ()=>{}} style={{flexDirection: 'row', paddingHorizontal: 20,
            paddingVertical: 15, alignItems: 'center', 
            justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Color.lightBorder}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="call-outline" color={keaktifan == 'Active' ? Color.hitam : Color.neutralZeroSix} size={18} />
                    <View style={{width: 10}}></View>
                    <Text style={{...FontConfig.buttonOne, color: keaktifan == 'Active' ? Color.hitam : Color.neutralZeroSix}}>{`Info Akun`}</Text>
                </View>
                <Ionicons name="chevron-forward-outline" color={keaktifan == 'Active' ? Color.hitam : Color.neutralZeroSix} size={18} />
            </Pressable>
            {/**<Pressable onPress={keaktifan == 'Active' ? ()=>navigation.navigate('KartuAnggota') : ()=>{}} style={{flexDirection: 'row', paddingHorizontal: 20,
            paddingVertical: 15, alignItems: 'center', 
            justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Color.lightBorder}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="globe-outline" color={keaktifan == 'Active' ? Color.primaryMain : Color.neutralZeroSix} size={18} />
                    <View style={{width: 10}}></View>
                    <Text style={{...FontConfig.buttonOne, color: keaktifan == 'Active' ? Color.primaryMain : Color.neutralZeroSix}}>{`Organisasi`}</Text>
                </View>
                <Ionicons name="chevron-forward-outline" color={keaktifan == 'Active' ? Color.primaryMain : Color.neutralZeroSix} size={18} />
            </Pressable>*/}
            <View style={{height: 18}}></View>
            <Text style={{...FontConfig.buttonFour, color: Color.neutral70,
            paddingHorizontal: 20}}>Lainnya</Text>
            <View style={{height: 5}}></View>
            <View style={{borderWidth: 0.55, borderColor: Color.lightBorder}}></View>
            {/**<Pressable onPress={keaktifan == 'Active' ? handlePoinButton : ()=>{}} style={{flexDirection: 'row', paddingHorizontal: 20,
            paddingVertical: 15, alignItems: 'center', 
            justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Color.lightBorder}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={IconPoinWhite} style={{height: 18, width: 18}} />
                    <View style={{width: 10}}></View>
                    <Text style={{...FontConfig.buttonOne, color: keaktifan == 'Active' ? Color.primaryMain : Color.neutralZeroSix}}>Poinku</Text>
                    <View style={{width: 10}}></View>
                    {keaktifan == 'Active' ? profileData?.infoPoin?.badge == rankPoin.no_member ? <RankPoin image={BadgeNoMember} rank="Member" /> : 
                    profileData?.infoPoin?.badge == rankPoin.bronze ? <RankPoin image={BadgeBronze} rank="Bronze" /> : 
                    profileData?.infoPoin?.badge == rankPoin.silver ? <RankPoin image={BadgeSilver} rank ="Silver" /> :
                    profileData?.infoPoin?.badge == rankPoin.gold ? <RankPoin image={BadgeGold} rank="Gold" /> : 
                    profileData?.infoPoin?.badge == rankPoin.platinum ? <RankPoin image={BadgePlatinum} rank="Platinum" />:
        profileData?.infoPoin?.badge == rankPoin.diamond ? <RankPoin image={BadgeDiamond} rank="Diamond" /> : <></> : <></>
        }
                </View>
                <Ionicons name="chevron-forward-outline" color={keaktifan == 'Active' ? Color.primaryMain : Color.neutralZeroSix} size={18} />
            </Pressable>
            */}
            <Pressable onPress={()=>setModalWhatsappVisible(true)}  style={{flexDirection: 'row', padding: 20, alignItems: 'center', 
            justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Color.lightBorder}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="help-outline" color={keaktifan == 'Active' ? Color.hitam : Color.neutralZeroSix} size={18} />
                    <View style={{width: 10}}></View>
                    <Text style={{...FontConfig.buttonOne, color: Color.hitam}}>Bantuan</Text>
                </View>
                <Ionicons name="chevron-forward-outline" color={keaktifan == 'Active' ? Color.hitam : Color.neutralZeroSix} size={18} />
            </Pressable>
            {/**<Pressable onPress={keaktifan == 'Active' ? ()=>navigation.navigate('ListBlokir') : ()=>{}} style={{flexDirection: 'row', paddingHorizontal: 20,
            paddingVertical: 15, alignItems: 'center', 
            justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Color.lightBorder}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="alert-circle-outline" color={keaktifan == 'Active' ? Color.primaryMain : Color.neutralZeroSix} size={18} />
                    <View style={{width: 10}}></View>
                    <Text style={{...FontConfig.buttonOne, color: keaktifan == 'Active' ? Color.primaryMain : Color.neutralZeroSix}}>{`Pengguna diblokir (${profileData.jumlah_pengguna_diblokir})`}</Text>
                </View>
                <Ionicons name="chevron-forward-outline" color={keaktifan == 'Active' ? Color.primaryMain : Color.neutralZeroSix} size={18} />
            </Pressable>*/}
            <Pressable onPress={handleKeluarButton} style={{flexDirection: 'row', paddingHorizontal: 20,
            paddingVertical: 15, alignItems: 'center', 
            justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: Color.lightBorder}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Ionicons name="log-out-outline" color={Color.danger} size={18} />
                    <View style={{width: 10}}></View>
                    <Text style={{...FontConfig.buttonOne, color: Color.danger}}>Keluar</Text>
                </View>
                <Ionicons name="chevron-forward-outline" color={Color.danger} size={18} />
            </Pressable>
            <View style={{height: 20}}></View>
            <View style={{height: 10}}></View>
            <View style={styles.version}>
                <Text style={{...FontConfig.bodyThree, color: Color.graySeven}}>{VERSION}</Text>
            </View>
            <View style={{height: 20}}></View>
        </ScrollView>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    boxProfile: {
        backgroundColor: Color.primaryMain,
        elevation: 10,
        shadowOffset: {height: 2, width: 1},
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        padding: 20

    },
    butuhBantuan: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.neutralZeroTwo,
        alignSelf: 'center',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 8,
      },
    boxReferral: {
        marginHorizontal: 20,
        marginTop: -30,
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
        alignItems: 'center',
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
        alignItems: 'center'
    },
    imageProfile: {
        height: 72,
        width: 72,
        borderRadius: 100
    },
    textNama: {
        ...FontConfig.titleOne,
        color:  Color.neutralZeroOne,
    },
    iconEdit: {
        width: 24,
        height: 24
    },
    textPhone: {
        ...FontConfig.bodyTwo,
        color:  Color.neutralZeroOne,
    },
    textReferral: {
        ...FontConfig.headingFour,
        color: '#1C1C1C',
        paddingVertical: 3
    },
    textUsername: {
        ...FontConfig.bodyTwo,
        color: Color.neutralZeroOne,
        paddingVertical: 2
    },
    aksiSection: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#F5F5FF',
        borderRadius: 8
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
      },
      garisVertical: {
        borderWidth: 0.5,
        backgroundColor: '#DFE0F3', 
        borderColor: '#DFE0F3',
        height: '70%',
      },
      garisVerticalMati: {
        borderWidth: 0.5,
        backgroundColor: Color.grayEight, 
        borderColor: Color.grayEight,
        height: '70%',
      }
})