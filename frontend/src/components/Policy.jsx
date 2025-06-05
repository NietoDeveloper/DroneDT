import exchange from "../assets/exchange_icon.png";
import quality from "../assets/quality_icon.png";
import support from "../assets/support_img.png";

export default function Policy() {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 py-20 text-gray-700 text-center">
      <div>
        <img className="w-12 m-auto mb-5" src={exchange} alt="" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>
      <div>
        <img className="w-12 m-auto mb-5" src={quality} alt="" />
        <p className="font-semibold">7-day return policy</p>
        <p className="text-gray-400">We provide 7-day return policy</p>
      </div>
      <div>
        <img className="w-12 m-auto mb-5" src={support} alt="" />
        <p className="font-semibold">Best customer support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
}
