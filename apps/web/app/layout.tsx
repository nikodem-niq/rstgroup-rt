import "@repo/ui/globals.css";
import { cn } from "@repo/ui/lib/utils";
import { Roboto } from "next/font/google";
import Providers from "./providers";
import { Toaster } from "@repo/ui/components/ui/toaster";
const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className={roboto.className}>
        <Providers>
          <div className="flex min-h-screen">
            <main
              className={cn("flex-1 w-full min-h-screen", "pt-[76px] lg:pt-0")}
            >
              {children}
            </main>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
