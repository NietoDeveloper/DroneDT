import { useState } from "react";
import moreArrow from "../assets/back_arrow_icon.png";

export default function Filter({
  category,
  setCategory,
  subCategory,
  setSubCategory,
}) {
  const [showFilter, setShowFilter] = useState(false);
.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  }

  return (
    <div className="min-w-52 md:min-w-60">
      <p
        onClick={() => setShowFilter(!showFilter)}
        className="w-fit text-xl my-2 flex cursor-pointer items-center gap-2"
      >
        FILTERS{" "}
        <img
          src={moreArrow}
          alt=""
          className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
        />
      </p>
      <div
        className={`border border-gray-300 pl-5 py-5 mt-6 ${
          showFilter ? "" : "hidden"
        } sm:block`}
      >
        <p className="mb-3 font-medium">CATEGORIES</p>
        <div className="flex flex-col gap-3 font-light text-gray-700">
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value="Men"
              onChange={toggleCategory}
            />
            Men
          </p>
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value="Women"
              onChange={toggleCategory}
            />
            Women
          </p>
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value="Kids"
              onChange={toggleCategory}
            />
            Kids
          </p>
        </div>
      </div>
      <div
        className={`border border-gray-300 pl-5 py-5 my-5 ${
          showFilter ? "" : "hidden"
        } sm:block`}
      >
        <p className="mb-3 font-medium">TYPE</p>
        <div className="flex flex-col gap-3 font-light text-gray-700">
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value="Topwear"
              onChange={toggleSubCategory}
            />
            Topwear
          </p>
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value="Bottomwear"
              onChange={toggleSubCategory}
            />
            Bottomwear
          </p>
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value="Winterwear"
              onChange={toggleSubCategory}
            />
            Winterwear
          </p>
        </div>
      </div>
    </div>
  );
}
