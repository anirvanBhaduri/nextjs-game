import Image from 'next/image';
import GamePanel from './components/GamePanel';
import LogPanel from './components/LogPanel';

export default function Home() {
  return (
    <main
      className="h-full grid grid-flow-row-dense 
        grid-row-2 gap-5 text-center lg:mb-0 
        lg:grid-row-1 lg:w-full lg:max-w-5xl lg:grid-cols-3"
    >
      <div className="lg:grid lg:col-span-2">
        <GamePanel />
      </div>
      <div className="lg:grid lg:col-span-1">
        <LogPanel />
      </div>
    </main>
  );
}
