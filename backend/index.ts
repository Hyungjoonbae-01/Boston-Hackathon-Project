import { Elysia } from 'elysia'

const app = new Elysia()

app.get('/', () => 'Hello from Elysia!')

app.listen(3000)
console.log('🚀 Elysia is running on http://localhost:3000')