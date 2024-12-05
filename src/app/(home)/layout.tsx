import Link from "next/link";

export default function HomeLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] gap-8 bg-background px-4 font-sans antialiased">
      <header className="text-xl font-bold leading-[4rem]">
        <Link href="/">life-sphere-app</Link>
      </header>
      {children}
      <footer className="text-center leading-[4rem] opacity-70">life-sphere-app</footer>
    </div>
  );
}
