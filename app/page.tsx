import GamePanel from './components/GamePanel';
import LogPanel from './components/LogPanel';

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row lg:flex-1 gap-5">
      <div className="w-full lg:w-2/3 flex-auto text-center">
        <GamePanel />
      </div>
      <div className="w-full lg:w-1/3 flex-auto text-center">
        <LogPanel />
      </div>
    </main>
  );
}
