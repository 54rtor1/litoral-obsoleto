import useSWR from 'swr'
import useScenarioStore from '@/stores/scenarioStore'

const fetcher = (url) => fetch(url).then(res => res.json())

export default function useSeaLevel({ scenario = 'ssp245' } = {}) {
  const { data, error } = useSWR('../../data/sea-level-recife-nested.json', fetcher, {
    revalidateOnFocus: false,
  });

  const dataArray = data?.scenarios?.[scenario]?.confidence?.medium?.quantiles?.['50']?.data;

  const q50 = dataArray?.reduce((acc, { year, value }) => {
    acc[year] = year === 2020 ? 0.0 : value;
    return acc;
  }, {});

  return {
    data: q50,
    isLoading: !error && !data,
    error,
  };
}
