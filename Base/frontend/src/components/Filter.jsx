import { useStat
          <p className="flex gap-2">
            <input
              className="w-3"
              type="checkbox"
              value="Kids"
         
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
