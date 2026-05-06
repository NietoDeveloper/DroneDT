ext-[8px] font-bold ${currentStatus.color}`}>
            {currentStatus.label}
          </span>
        </div>
      </div>

      <ShieldCheck className="absolute bottom-2 right-2 h-12 w-12 text-white/[0.02] pointer-events-none" />
    </motion.div>
  );
};