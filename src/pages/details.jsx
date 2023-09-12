import { GetQueryParams } from '@/components/getQuery'
import { Text } from '@chakra-ui/react'
import React from 'react'

const details = () => {
  let id = GetQueryParams('/details')?.id

  console.log('single id', id)
  
  return (
    <Text color='#000'>details</Text>
  )
}

export default details