
            {/* Submit Button */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-[#000000] hover:bg-[#FFD700] text-[#FFD700] hover:text-[#000000] font-black py-4 uppercase tracking-[0.2em] transition-all duration-300"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-[#DCDCDC] text-center">
            <p className="text-xs text-gray-500 font-medium">
              Already part of the fleet?{' '}
              <Link href="/auth/login" className="text-[#000000] font-black hover:text-[#FEB60D] underline underline-offset-4">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Technical Notice */}
        <div className="bg-[#F8F8F8] py-3 px-8">
          <p className="text-[8px] text-gray-400 font-mono text-center uppercase tracking-widest">
            By registering, you agree to the Drone DT operational protocols & privacy policy.
          </p>
        </div>
      </div>

      <style jsx>{`
        .label-style {
          display: block;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          color: #6B7280;
          margin-bottom: 4px;
          margin-left: 4px;
        }
        .input-style {
          width: 100%;
          padding: 12px 16px;
          background-color: #F5F5F5;
          border-bottom: 2px solid transparent;
          color: #000000;
          outline: none;
          transition: all 0.3s;
          font-size: 14px;
        }
        .input-style:focus {
          border-color: #FFD700;
          background-color: #FFFFFF;
        }
      `}</style>
    </div>
  );
};