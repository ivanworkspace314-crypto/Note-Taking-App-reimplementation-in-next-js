import "./globals.css";
import ToastProvider from "../components/ToastProvider";

export const metadata = {
  title: "ThinkBoard",
  description: "Simple note board for quick ideas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="forest">
      <body className="min-h-screen bg-base-100 text-base-content">
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
