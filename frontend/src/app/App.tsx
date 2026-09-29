import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouterProvider } from 'react-router'
import { selectAuth } from '@/entities/user'
import { baseApi, createRealtimeConnection, type RealtimeTopic } from '@/shared/api'
import { router } from './router'

const TOPIC_TAG: Record<RealtimeTopic, 'Product' | 'Organization' | 'Person'> = {
  '/topic/products': 'Product',
  '/topic/organizations': 'Organization',
  '/topic/persons': 'Person',
}

const ALL_TAGS = Object.values(TOPIC_TAG)

export function App() {
  const dispatch = useDispatch()
  const { status } = useSelector(selectAuth)

  useEffect(() => {
    if (status !== 'authenticated') return

    const connection = createRealtimeConnection({
      onConnect: () => dispatch(baseApi.util.invalidateTags(ALL_TAGS)),
      onTopicMessage: (topic) => dispatch(baseApi.util.invalidateTags([TOPIC_TAG[topic]])),
    })

    return () => connection.close()
  }, [status, dispatch])

  return <RouterProvider router={router} />
}
