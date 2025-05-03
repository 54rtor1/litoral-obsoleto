import useSWR from 'swr'
import useScenarioStore from '@/stores/scenarioStore'

const fetcher = (url) => fetch(url).then(res => res.json())

export default function useSeaLevel({ scenario = 'ssp245' } = {}) {
  const { data, error } = useSWR('../../data/sea-level-recife-nested.json', fetcher, {
    revalidateOnFocus: false,
  });

  const q50 = data?.scenarios?.[scenario]?.confidence?.medium?.quantiles?.['50']?.data; // Median quantile

  return {
    data: q50,
    isLoading: !error && !data,
    error,
  };
}
