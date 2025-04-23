import useScrollStore from '@/stores/scrollStore';

export default function YearCounter() {
  const { year, seaLevel } = useScrollStore();

  return (
    <div className="glitch fixed bottom-4 left-4 font-mono text-xl text-green-500">
      YEAR: <span className="text-yellow-400">{Math.round(year)}</span>
      <div className="text-sm text-cyan-400">
        SEA LEVEL: {seaLevel.toFixed(2)}m
      </div>
    </div>
  );
}
