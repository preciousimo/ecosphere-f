import { useState, useEffect, useCallback } from 'react'

const useWebSocket = (url: string) => {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [socket, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket(url)

    ws.onopen = () => {
      console.log('WebSocket connected')
      setSocket(ws)
    }

    ws.onmessage = (event) => {
      setData(JSON.parse(event.data))
    }

    ws.onerror = (event) => {
      console.error('WebSocket error:', event)
      setError('WebSocket error')
    }

    ws.onclose = () => {
      console.log('WebSocket disconnected')
      setSocket(null)
    }

    return () => {
      ws.close()
    }
  }, [url])

  const sendMessage = useCallback((message: any) => {
    if (socket) {
      socket.send(JSON.stringify(message))
    }
  }, [socket])

  return { data, error, sendMessage }
}

export default useWebSocket