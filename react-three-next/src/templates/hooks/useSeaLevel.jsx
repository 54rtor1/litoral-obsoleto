import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

export default function useSeaLevel() {
  const { data, error } = useSWR('../../data/sea-level-recife-nested.json', fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data: data?.scenarios?.ssp245?.confidence?.medium?.quantiles?.['50']?.data,
    isLoading: !error && !data,
    error
  };
}
