import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function useSeaLevel({ scenario = 'ssp245', quantile = '50' }) {
  const { data, error } = useSWR('../../data/sea-level-recife-nested.json', fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data: data?.scenarios?.[scenario]?.confidence?.medium?.quantiles?.[quantile]?.data,
    isLoading: !error && !data,
    error
  };
}
