import io from 'socket.io-client'
export const AUTJKEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiYzlkNDUyMi0xZDI0LTQxOTctOWQ3Yy1lMDE3NTU3YWY4ODAiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NzkxMjg0ODUsImV4cCI6MTc3OTIxNDg4NX0.wcVm_wj_P5P6XwtS6awBNOfrMjutjhJ0QPmPxE1yHek'

// Create a WebSocket connection
const socket = io('http://26.210.112.27:3000/boards', {
  query: { token: AUTJKEY },
  transports: ['websocket'],
  autoConnect: true,
})

socket.on('joinedBoard', (data) => {
  console.log('📡 Joined board:', data)
})

socket.on('cardCreated', (data) => {
  console.log('🔥 New card created (WebSocket):', data)
})

socket.on('error', (err) => {
  console.error('❌ WebSocket error:', err)
})

export default socket
