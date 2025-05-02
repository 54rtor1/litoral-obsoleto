import useSWR from 'swr'
import useScenarioStore from '@/stores/scenarioStore'

const fetcher = (url) => fetch(url).then(res => res.json())

export default function useSeaLevel() {
  const { scenario } = useScenarioStore()

  const { data, error } = useSWR('../../data/sea-level-recife-nested.json', fetcher, {
    revalidateOnFocus: false,
  })

  const quantileData =
    data?.scenarios?.[scenario]?.confidence?.medium?.quantiles || {}

  const quantile = quantileData['50']
    ? '50'
    : Object.keys(quantileData).sort((a, b) => parseFloat(a) - parseFloat(b))[0]

  return {
    data: quantileData[quantile]?.data,
    quantileUsed: quantile,
    isLoading: !data && !error,
    error,
  }
}
