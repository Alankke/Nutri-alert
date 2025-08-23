export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen">
      <main className="max-w-screen-sm mx-auto mt-16">{children}</main>
    </div>
  );
}
