import useScrollStore from '@/stores/scrollStore';

export default function YearCounter() {
  const { year, seaLevel } = useScrollStore();

  return (
    <div className="text-sm text-cyan-200">
      Year: <span className="text-white">{Math.round(year)}</span> |
      Rise: <span className="text-white">{seaLevel.toFixed(2)}m</span>
    </div>
  );
}
