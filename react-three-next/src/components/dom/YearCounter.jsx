import useScrollStore from '@/stores/scrollStore';

export default function YearCounter() {
  const { year, seaLevel } = useScrollStore();

  return (
    <div className="fixed bottom-12 left-4 bg-black p-4 text-xl">
      <div className="flex flex-col items-start space-y-2">
        <div className="text-sm text-cyan-300">
          Projected Year: <span className="text-white">{Math.round(year)}</span>
        </div>
        <div className="text-sm text-cyan-300">
          Rise: {seaLevel.toFixed(2)}m
        </div>
        <div className="mt-4 cursor-pointer text-sm text-cyan-300  opacity-80 hover:text-white">
          <span>Scroll to alter view</span>
          <span className="ml-2 text-xl text-white">𓂃</span>
        </div>
      </div>
    </div>
  );
}
