import Subscription from "../components/Subscription";
import Title from "../components/Title";
import aboutHero from "../assets/about_img.png";

export default function About() {
  return (
    <>

      <div className="text-xl py-4">
        <Title title1="WHY" title2="CHOOSE US?" />

          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <p className="font-bold">Convenience:</p>
            <p className="text-gray-600">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <p className="font-bold">Exceptional Customer Service:</p>
            <p className="text-gray-600">
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>
      <Subscription />
    </>
  );
}
