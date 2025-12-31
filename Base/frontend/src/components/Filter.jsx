import { useState } from "react";
import moreArrow from "../assets/back_arrow_icon.png";

export default function Filter({
  category,
  setCategory,
box"
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
