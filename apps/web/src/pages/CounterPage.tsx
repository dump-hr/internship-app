import { Button } from "@mui/material"
import { useFetchCount } from "../api/useFetchCount"
import { usePutCount } from "../api/usePutCount"

export const CounterPage = () => {
  const {data} = useFetchCount();
  const putCount = usePutCount();

  return <Button variant="outlined" onClick = {() => putCount.mutate(2)}>{data}</Button>
} 