import i18next from "i18next";
import english from './english.json'
import french from './french.json'
import marathi from './marathi.json'
import gujarathi from './gujarathi.json'
import urdu from './urdu.json'

import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng:'en',
    fallbackLng:'en',
    resources:{
        en: english,
        fn: french,
        ma : marathi,
        gu : gujarathi,
        ur : urdu,
    },
    react:{
        useSuspense: false,
    },
});
 export default i18next;