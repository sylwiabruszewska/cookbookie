export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <>
        <header className=" text-gray-800 py-4 w-full">
          <div className="container mx-auto">
            <p className="text-xl">Header</p>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto w-full">
          <div className="container mx-auto">{children}</div>
        </main>

        <footer className="bg-gray-700 text-white py-4 w-full">
          <div className="container mx-auto">
            <p className="text-xl">Footer</p>
          </div>
        </footer>
      </>
    </div>
  );
}
