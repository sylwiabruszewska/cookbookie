import { Inter, Poppins, Roboto } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
});

export const roboto = Roboto({ weight: ["500"], subsets: ["latin"] });
