import React from 'react'

function Trend() {
    return (
  <div className="min-h-screen bg-gray-100 p-6">
    <h1 className="text-3xl font-bold text-center mb-10">
      PC Components Overview
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

      {/* CPU */}
      <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4 text-center">
        <h2 className="text-lg font-semibold mb-4">CPU</h2>
        <img
          className="w-full h-48 object-contain"
          src="https://cdna.pcpartpicker.com/static/forever/images/trends/2025.12.10.cad.cpu.raptor_lake.core-i9.lga1700.971d811700d80165bc2bd85037ac63fb.png"
          alt="CPU"
        />
      </div>

      {/* Memory */}
      <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4 text-center">
        <h2 className="text-lg font-semibold mb-4">Memory</h2>
        <img
          className="w-full h-48 object-contain"
          src="https://cdna.pcpartpicker.com/static/forever/images/trends/2025.12.10.cad.ram.ddr5.6000.2x32768.248b13b3c50badc76db6592a22934841.png"
          alt="Memory"
        />
      </div>

      {/* Storage */}
      <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4 text-center">
        <h2 className="text-lg font-semibold mb-4">Storage</h2>
        <img
          className="w-full h-48 object-contain"
          src="https://cdna.pcpartpicker.com/static/forever/images/trends/2025.12.10.cad.storage.hdd350.16000.e33a90105c1350be14411d7ddf3783d8.png"
          alt="Storage"
        />
      </div>

      {/* Cooler / GPU */}
      <div className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4 text-center">
        <h2 className="text-lg font-semibold mb-4">CPU Cooler</h2>
        <img
          className="w-full h-48 object-contain"
          src="https://cdna.pcpartpicker.com/static/forever/images/trends/2025.12.10.cad.gpu.chipset.radeon-rx-9070-xt.5f26208e8682d3f261806a56f7f27df1.png"
          alt="Cooler"
        />
      </div>

    </div>
  </div>
);

}

export default Trend