import React,{useState} from 'react'
import { useTranslation } from 'react-i18next';
import {Text,View,TextInput} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import SwitchSelector from 'react-native-switch-selector';
import styles from '../styles/homeScreen';

const options = [
  
    {label: 'English', value: 'en'},
    {label: 'French', value: 'fn'},
    {label: 'Marathi', value: 'ma'},
    {label: 'Gujarathi', value: 'gu'},
    {label: 'Urdu', value: 'ur'},
  
];

function Home() {
  const {t,i18n}=useTranslation();
  const [lang,setLang] = useState('');
  return (
    <SafeAreaView style={styles.body}>
     
      
        <Text style={styles.heading}>{t('language')}</Text>
    
      <SwitchSelector options={options} hasPadding fontSize={15} initial={0}  
            onPress={(language)=>{
              i18n.changeLanguage(language);
              setLang(language);
              
            }}
          />
        <Text style={styles.text}>{t('welcomeText')}</Text>
         <View style={{padding:15}}>
           <TextInput textAlign={lang=='ur'? 'right' : 'left'} placeholder={t('name')} fontSize={20} placeholderTextColor={'grey'} style={styles.textInput}/>
           <TextInput textAlign={lang=='ur'? 'right' : 'left'} placeholder={t('age')} fontSize={20}  keyboardType={'number-pad'} placeholderTextColor={'grey'} style={styles.textInput}/>
           <TextInput textAlign={lang=='ur'? 'right' : 'left'} placeholder={t('address')} fontSize={20}  placeholderTextColor={'grey'} style={styles.textInput}/>
       
          </View>   
    </SafeAreaView>
  )
}

export default Home;