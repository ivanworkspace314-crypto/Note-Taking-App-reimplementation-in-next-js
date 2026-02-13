import Link from "next/link";
import { Plus } from "lucide-react";

const NavBar = () => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl px-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            ThinkBoard
          </h1>
          <Link href="/create" className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Note
          </Link>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
