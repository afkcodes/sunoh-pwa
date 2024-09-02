import useFetch from '~hooks/useFetch';
import http from '~network/http';

interface DataFetchContainerProps {
  key: string;
  url: string;
  shouldFetchOnLoad: boolean;
  containerType?: 'tile' | 'audio';
}

const DataFetchContainer: React.FC<DataFetchContainerProps> = ({
  key,
  url,
  shouldFetchOnLoad = true,
}) => {
  const { data, isLoading } = useFetch({
    queryKey: [`album_${key}`],
    queryFn: async () => await http(url),
    shouldFetchOnLoad,
  });
  return <div>{isLoading ? <div>LOADING</div> : <div>{JSON.stringify(data)}</div>}</div>;
};

export default DataFetchContainer;
