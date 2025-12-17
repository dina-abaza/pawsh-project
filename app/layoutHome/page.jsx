"use client"

import { FaPaw } from "react-icons/fa";

export default function LayoutHome({title,description,img,children}) {
  return (
    <div className="relative w-full min-h-screen bg-green-900">
      
      {/* الخلفية البيضاء */}
      <div className="w-full h-[33vh] bg-white rounded-b-full relative z-0 flex flex-col items-center justify-center pb-20">
       
        <div className="relative">
          {/* عنوان pawsh */}
          <h1 className="text-[3rem] font-extrabold text-green-800 relative z-10">{title}</h1>

          {/* أيقونة بصمة الكلب */}
          <FaPaw 
            className="absolute -top-[6px] right-[2px] text-yellow-400 text-3xl rotate-[35deg] translate-x-[-6px]"
          />
        </div>

        <p className="mt-2">{description}</p>
      </div>

      {/* الصورة نصفها خارج الخلفية */}
      <div className="relative z-10 -mt-20 flex justify-center">
        <img src={img} className="w-40 h-40 object-cover rounded-full" />
      </div>

      {/* الأطفال */}
      <div className="mt-10">
        {children}
      </div>

    </div>
  )
}
