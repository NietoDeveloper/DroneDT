import js from "@eslint/js";
import globals from "./frontend/node_modules/globals";
import react from "./frontend/node_modules/eslint-plugin-react";
import reactHooks from "./frontend/node_modules/eslint-plugin-react-hooks";
import reactRefresh from "./frontend/node_modules/eslint-plugin-react-refresh";


    settings: { react: { version: "18.3" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

      ],
    },
  },
];
