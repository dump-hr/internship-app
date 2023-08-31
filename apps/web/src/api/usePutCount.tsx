import { useMutation, useQueryClient } from "react-query"
import { api } from "."
import toast from "react-hot-toast"

const putCount = (n: number) => {
  return api.patch<number, number>('/counter/increment', {n})
}

export const usePutCount = () => {
  const queryClient = useQueryClient();

  return useMutation(putCount, {
    onSuccess: () => {
      queryClient.invalidateQueries('count');},
    onError: (error: string)=>{
      toast.error(error);
    }
  })
}