export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <>
        <header className=" text-gray-800 py-4 w-full">
          <div className="container mx-auto">
            <p className="text-xl">Header</p>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto">
          <div className="container mx-auto py-8">
            <h2 className="text-xl mb-4">Main Content</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              varius vestibulum libero id mattis. Aliquam erat volutpat. Nulla
              facilisi. Vivamus eget magna sed leo pulvinar rutrum et non arcu.
              Vestibulum nec lorem in tortor pulvinar ultrices.
            </p>
          </div>
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
