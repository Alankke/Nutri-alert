import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-teal-50">
      <nav className="flex items-center justify-start w-full h-16 px-4 py-6">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
        </Link>
      </nav>
      <main className="max-w-screen-sm mx-auto mt-16">{children}</main>
    </div>
  );
}
