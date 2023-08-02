import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Color, FontConfig } from '../../theme'
import HeaderWhite from '../../components/header/headerWhite'
import CustomInput from '../../components/customInput'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { height } from '../../assets/constants'
import IconLike from '../../assets/images/icon/icon_like2.png'
import IconLiked from '../../assets/images/icon/icon_liked2.png'
import IconComment from '../../assets/images/icon/icon_comment.png'
import BeritaServices from '../../services/berita'
import ImageExample from '../../assets/images/example/exampleProfile.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ReplyKomenView from '../../components/berita/replyKomen'
import ImageServices from '../../services/getImage'
import Skeleton from '../../components/skeleton'


const ListKomentarBeritaScreen = ({navigation, route}) => {
    const [inputKomentar, setInputKomentar] = useState('')
    const [dataKomentar, setDataKomentar] = useState([]);
    const {id_berita} = route.params;
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [idBalasKomen, setIdBalasKomen] = useState('');
    const [userBalasKomen, setUserBalasKomen] = useState('');
    const [isLoadMore, setIsLoadMore] = useState(false);

    const getDataKomentar = () => {
        console.log("get data komentar");
        if(dataKomentar.length == 0) setIsLoading(true);
        if(dataKomentar.length > 0) setIsLoadMore(true);
        BeritaServices.getKomentarByBerita(id_berita, currentPage)
        .then(res=> {
            console.log(res.data.data.data);
            setTotalPages(res.data.data.totalPages);
            setDataKomentar([...dataKomentar , ...res.data.data.data]);
            setIsLoading(false);
            setIsLoadMore(false);
        })
        .catch(err=> {
            console.log(err);
            setIsLoading(false);
            setIsLoadMore(false);
        })
    }

    const getDataKomentarRefresh = () => {
        if(dataKomentar.length == 0) setIsLoading(true);
        BeritaServices.getKomentarByBerita(id_berita, 1)
        .then(res=> {
            console.log(res.data.data.data);
            setTotalPages(res.data.data.totalPages);
            setDataKomentar(res.data.data.data);
            setIsLoading(false);
        })
        .catch(err=> {
            console.log(err);
            setIsLoading(false);
        })
    }

    const addKomentar = () => {
        BeritaServices.addKomentar({"komen": inputKomentar}, id_berita)
        .then(res=> {
            console.log(res.data.data);
            setDataKomentar([...res.data.data , ...dataKomentar]);
        })
        .catch(err=> {
            console.log(err);
        })
        setInputKomentar('');
        
    }

    const InfoLaporan =  ({text, icon}) => (
        <View style={styles.rowInfo}>
          <Image source={icon} style={styles.iconInfo} />
          <Text style={styles.textInfo}>{text}</Text>
        </View>
    );

    const KomentarItem = ({item}) => {
        const [isLiked, setIsLiked] = useState(item.is_liked);
        const [jumlahLike, setJumlahLike] = useState(parseInt(item.jumlah_like));
        const [dataBalasan, setDataBalasan] = useState([]);
        const [pageBalasan, setPageBalasan] = useState(1);
        const [loadBalasan, setLoadBalasan] = useState(false);
        const [totalPageBalasan, setTotalPageBalasan] = useState(1)
        const [showReply, setShowReply] = useState(false);
        const [dataImage, setDataImage] = useState("");
        const [imageLoading, setImageLoading] = useState(false);

        const handleLike = () => {
            if (isLiked) {
                setJumlahLike(jumlahLike-1);
            }else{
                setJumlahLike(jumlahLike+1);
            }
            likeUnlikeKomentar();
            setIsLiked(!isLiked);
        }

        const handleSembunyikan = () => {
            setDataBalasan([]);
            setPageBalasan(1);
        }

        const likeUnlikeKomentar = () => {
            BeritaServices.likeKomentar(item.id_berita_komen)
            .then(res=> {
                console.log(res.data.data);
            })
            .catch(err=>{
                console.log(err);
            })
        }

        const balasKomen = () => {
            setIdBalasKomen(item.id_berita_komen);
            setUserBalasKomen(item.username);
        }

        const loadMoreBalasan = () => {
            console.log("load more balasan");
            if(pageBalasan < parseInt(totalPageBalasan)){
              setPageBalasan(pageBalasan + 1);
            }
            showBalasan();
        }
        

        const showBalasan = () => {
            console.log("show balasan..");
            console.log(pageBalasan);
            setShowReply(true);
            setLoadBalasan(true);
            BeritaServices.getBalasanByKomen(item.id_berita_komen, pageBalasan)
            .then(res=>{
                console.log(res.data.data);
                setDataBalasan([...dataBalasan , ...res.data.data.data]);
                setTotalPageBalasan(res.data.data.totalPages);
                setLoadBalasan(false);
            })
            .catch(err=>{
                console.log(err);
            })
        }

        const getDataImage = () =>{
            setImageLoading(true);
            ImageServices.getImage("relawan", item.foto_profil)
            .then(res=>{
              setDataImage(res.data.data);
              setImageLoading(false);
            })
            .catch(err=>{
              console.log(err);
            })
        }


        useEffect(()=>{
            getDataImage();
        },[])

        useEffect(()=> {
            if(dataBalasan.length >0) showBalasan();
        },[pageBalasan]);

        return(
            <View style={styles.komentarContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {!imageLoading ? <Image style={styles.fotoProfile} source={{uri: `data:image/png;base64, ${dataImage}`}} /> : 
                    <Skeleton height={32} width={32} style={{borderRadius: 16}} />
                    }
                    <Text style={styles.textUsername}>{item.username}</Text> 
                </View>
                <View style={{height: 8}}></View>
                <Text style={styles.textKomen}>{item.komen}</Text>
                <View style={{height: 5}}></View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Pressable onPress={handleLike}>
                        <InfoLaporan text={jumlahLike} icon={isLiked ? IconLiked : IconLike} />
                    </Pressable>
                    <Pressable onPress={balasKomen}>
                        <InfoLaporan text="Balas" icon={IconComment} />
                    </Pressable>
                </View>
                {item.jumlah_reply > 0 ? dataBalasan.length == 0 ? <Pressable onPress={showBalasan} style={{paddingHorizontal: 20,flexDirection: 'row', 
                justifyContent: 'space-between', width: 150}}>
                    <Text style={{...FontConfig.captionTwo, color: Color.graySeven}}>{`Lihat ${item.jumlah_reply} balasan`}</Text>
                    <Ionicons name="chevron-down-outline" size={15} color={Color.grayEight} />
                </Pressable> : 
                <View>
                    <ReplyKomenView dataBalasan={dataBalasan} />
                    {loadBalasan ? <ActivityIndicator size="small" color={Color.grayEight} /> : <></>
                    }

                    {pageBalasan == parseInt(totalPageBalasan) ? <Pressable onPress={handleSembunyikan} style={{flexDirection: 'row', justifyContent: 'space-between', 
                    width: 190, paddingHorizontal: 20}}>
                        <Text style={{...FontConfig.captionTwo, color: Color.graySeven}}>{`Sembunyikan balasan`}</Text>
                        <Ionicons name="chevron-up-outline" size={15} color={Color.grayEight} />
                    </Pressable> : 
                    <Pressable onPress={loadMoreBalasan} style={{flexDirection: 'row', justifyContent: 'space-between', 
                    width: 190, paddingHorizontal: 20}}>
                        <Text style={{...FontConfig.captionTwo, color: Color.graySeven}}>{`Lihat balasan lainnya`}</Text>
                        <Ionicons name="chevron-down-outline" size={15} color={Color.grayEight} />
                    </Pressable>}
                </View>
                 : null}
            </View>
        );
    }

    const LoadMoreItem = () => {
        return(
            <>
            {!isLoadMore ? currentPage < parseInt(totalPages) ? <View style={{alignItems: 'center', padding: 10}}>
                <Pressable onPress={loadMoreItem}><Text style={{...FontConfig.bodyTwo, color: Color.grayEight}}>Tampilkan komentar lainnya</Text></Pressable>
            </View> : <></> : <ActivityIndicator size="small" color={Color.grayEight} />}</>
        )
    }

    const loadMoreItem = () => {
        console.log("load more komentar");
        if(currentPage < parseInt(totalPages)){
            setIsLoadMore(true);
            setCurrentPage(currentPage + 1);
        }
    }
    
    const renderLoader = () => {
        return(
          <View style={styles.loaderStyle}>
              <ActivityIndicator size="large" />
          </View>
        );
    }

    const replyComment = () => {
        setIsLoading(true);
        setCurrentPage(1);
        BeritaServices.balasKomentar({"reply": inputKomentar}, idBalasKomen)
        .then(res=>{
            
            if(res.data.message == "Berhasil reply komentar."){
                getDataKomentarRefresh();
                setIsLoading(false);
            }
        })
        .catch(err=>{
            console.log(err);
        });
        setInputKomentar('');
    }

    const handleCloseBalas = () => {
        setIdBalasKomen('');
        setUserBalasKomen('');
    }

    useEffect(()=> {
        getDataKomentar();
    },[currentPage]);
  return (
    <View style={{flex: 1, backgroundColor: Color.neutralZeroOne, justifyContent: 'space-between'}}>
        <HeaderWhite navigation={navigation} title="Komentar Artikel" />
        {
        isLoading ? <ActivityIndicator style={{marginVertical: 100}} size="large" color={Color.graySix} /> :
        dataKomentar.length != 0 ?
        <FlatList
            data={dataKomentar} 
            renderItem={({item}) => <KomentarItem item={item} />}
            ListFooterComponent={<LoadMoreItem />}
            style={styles.flatlistStyle}
            />
             : <></>
        }
        <View>
            {idBalasKomen != '' ? <View style={{flexDirection: 'row', 
            justifyContent: 'space-between', padding: 10, backgroundColor: Color.lightBorder}}>
                <Text style={{color: Color.graySeven}}>{`Membalas ${userBalasKomen}`}</Text>
                <Pressable onPress={handleCloseBalas}>
                    <Ionicons name="close-outline" size={18} color={Color.grayEight} />
                </Pressable>
            </View>: <></>}
            <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                <CustomInput value={inputKomentar} setValue={setInputKomentar}
                placeholder="Tambahkan komentar kamu"
                childLeft={<></>}
                children={<Pressable onPress={inputKomentar != '' ? idBalasKomen == '' ? addKomentar : replyComment : null}>
                    <Ionicons name="send" size={18} color="#00a2ed" style={{padding: 5}} /></Pressable>}
                />
            </View>
        </View>
    </View>
  )
}

export default ListKomentarBeritaScreen

const styles = StyleSheet.create({
    fotoProfile: {
        width: 32,
        height: 32,
        borderRadius: 16
    },
    textUsername: {
        ...FontConfig.titleThree,
        color:Color.title,
        marginHorizontal: 10
    },
    loaderStyle: {
        marginVertical: 16,
        alignItems: 'center'
    },
    flatlistStyle: {
        height: height/1.45,
    },
    komentarContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    textKomen: {
        ...FontConfig.bodyFour,
        color: Color.title
    },
    iconInfo: {
        width: 16,
        height: 14.5
    },
    rowInfo: {
        flexDirection: 'row',
        marginHorizontal: 5,
        alignItems: 'center'
    },
    textInfo: {
        ...FontConfig.bodyThree,
        color: '#000000',
        marginLeft: 3
    },
})