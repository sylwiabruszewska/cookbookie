export default function HomepageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex min-h-screen min-w-screen flex-col justify-center main-background bg-center bg-cover">
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      {children}
    </main>
  );
}
