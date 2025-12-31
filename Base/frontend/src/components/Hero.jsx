import homepageHero from "../assets/hero_img.png";

export default function Hero() {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <div className="py-10 sm:w-1/2 flex flex-col justify-center items-center">
        <div className="text-[#414141]">
          <div cl14141]"></p>
          </div>
        </div>
      </div>
      <img className="sm:w-1/2" src={homepageHero} alt="" />
    </div>
  );
}
