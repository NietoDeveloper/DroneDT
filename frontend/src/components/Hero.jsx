import homepageHero from "../assets/hero_img.png";

export default function Hero() {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <div className="py-10 sm:w-1/2 flex flex-col justify-center items-center">
        <div className="text-[#414141]">
          <div className="flex gap-2 items-center">
            <p className="w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm text-base"> Nuestros mas Vendidos</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Ultimos Productos
          </h1>
          <div className="flex gap-2 items-center">
            <p className="font-semibold text-sm text-base">Compra Ahora</p>
            <p className="w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      <img className="sm:w-1/2" src={homepageHero} alt="" />
    </div>
  );
}
