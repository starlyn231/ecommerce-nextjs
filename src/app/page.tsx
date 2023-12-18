
import LoginPage from './auth/login/page'
import Home from './views/home/page'

export default function HomeMain() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginPage />
    </main>
  )
}
