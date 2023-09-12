import { useRouter } from 'next/router'

export const GetQueryParams = (url) => {
  const {asPath} = useRouter()

  const params = new URLSearchParams(asPath.replace(url, ''));
  const paramObj = {};

  for (const value of Array.from(params.keys())) {
    paramObj[value] = params.get(value);
  }
  return paramObj;
}