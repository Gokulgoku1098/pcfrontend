import React from "react";

function Completebuild() {
  const builds = [
    {
      img: "https://cdna.pcpartpicker.com/static/forever/images/userbuild/521312.3920707004d842c35f037e01288c218a.1600.jpg",
      title: "OP Full Tower",
      desc: "General Use, Competitive Gaming, Occasional Streaming",
    },
    {
      img: "https://cdna.pcpartpicker.com/static/forever/images/userbuild/521311.9111610d77c5ac132969329f928cad05.512.jpg",
      title: "Recent build AUG 17th 2025",
      desc: "Swapping out 3090 Ti with TUF 5090 late September",
    },
    {
      img: "https://cdna.pcpartpicker.com/static/forever/images/userbuild/521309.1085a970bebfc01c0d4cf2d08812e2cd.512.jpg",
      title: "The 2025 Refresh",
      desc: "Retired the 1070. Overclocked 9900K, added 9060 XT, better fans & SSD.",
    },
    {
      img: "https://cdna.pcpartpicker.com/static/forever/images/userbuild/521307.465423fc3f46bd3342da1438a24d544b.512.jpg",
      title: "My amazing setup.",
      desc: "Upgraded from 5600 to 7700X because bundle was cheaper.",
    },
    {
      img: "https://cdna.pcpartpicker.com/static/forever/images/userbuild/521301.d4873d2d7fd2801016146bfd9a896821.512.jpg",
      title: "CKY 114",
      desc: "$1,020.25 before Taxes, OS & Materials",
    },
  ];

  return (
    <>
      
      <div className="mt-[-28px] flex justify-center items-center font-extrabold 
      h-20 w-full text-white bg-gradient-to-r from-black via-gray-900 via-yellow-500 via-pink-600 to-purple-900">
        <h1 className="text-3xl">Complete Builds</h1>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 
      gap-6 p-8 bg-gray-100 min-h-screen">

        {builds.map((b, i) => (
          <div
            key={i}
            className="bg-gray-300 rounded-xl shadow-md h-80 w-full 
            overflow-hidden hover:scale-105 transition-all duration-300"
          >
            <img
              src={b.img}
              className="w-full h-44 object-cover"
              alt=""
            />

            <div className="p-3">
              <h1 className="font-bold text-lg">{b.title}</h1>
              <p className="text-sm mt-2 text-gray-700">{b.desc}</p>
              <button
              className="
                mt-4 w-full py-2
                rounded-xl
                bg-black text-white font-semibold
                hover:bg-gray-800
                active:scale-95
                transition
              "
              onClick={() => console.log('Buying:', b.title)}
            >
              Buy Now
            </button>
            </div>
          </div>
        ))}

        

      </div>

      
    </>
  );
}

export default Completebuild;
