"use client"

import { useState } from "react";
import { useRouter } from "next/navigation"; // استيراد الrouter
import LayoutHome from "./layoutHome/page";

export default function Home() {
  const [lang,setLang] = useState(''); // '' يعني لم تُختار بعد
  const router = useRouter(); // تهيئة الروتر

  const handleContinue = () => {
    if(lang){
      console.log("Continue with language:", lang);
      router.push('/register'); // الانتقال لصفحة /register
    }
  }

  return (
    <LayoutHome 
      title={"pawsh"}
      description={"make your pet happy"}
      img={"/dogshome.jpg"}
    >
      <div className="flex flex-col gap-4 justify-center items-center mt-10">

        {/* النصوص */}
        <h3 className="text-white text-lg">choose your language</h3>
        <h4 className="text-white text-lg">اختر لغتك</h4>

        {/* أزرار اللغات */}
        <div className="flex justify-between items-center gap-4 w-full max-w-xs">
          
          {/* زر الإنجليزية */}
          <button 
            className="flex-1 flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black justify-center"
            onClick={()=>setLang('en')}
          >
            English
            <span 
              className={`w-4 h-4 rounded-full border border-black
                ${lang === 'en' ? 'bg-black' : 'bg-white'}`} 
            />
          </button>

          {/* زر العربية */}
          <button 
            className="flex-1 flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black justify-center"
            onClick={()=>setLang('ar')}
          >
            العربيه
            <span 
              className={`w-4 h-4 rounded-full border border-black
                ${lang === 'ar' ? 'bg-black' : 'bg-white'}`} 
            />
          </button>

        </div>

       <button
          className={`mt-4 w-full max-w-xs px-4 py-2 rounded-lg
            ${lang ? 'bg-white text-black cursor-pointer' : 'bg-green-900 text-gray-400 cursor-not-allowed'}`}
          disabled={!lang}
          onClick={handleContinue}
        >
          Continue
        </button>

      </div>
    </LayoutHome>
  )
}
