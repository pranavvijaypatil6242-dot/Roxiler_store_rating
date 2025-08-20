import React from 'react'
import { LoginForm } from '../components/LoginForm'
function Login() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 flex items-center justify-center p-4">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(800px_circle_at_15%_-10%,rgba(56,189,248,0.08),transparent_40%),radial-gradient(600px_circle_at_95%_10%,rgba(139,92,246,0.08),transparent_40%),radial-gradient(500px_circle_at_10%_95%,rgba(244,114,182,0.06),transparent_40%)]" />

      <div className="relative w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Illustration Side - Hidden on mobile */}
        <div className="hidden lg:flex flex-col items-center justify-center text-left">
          <div className="w-full bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-lg p-8 text-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-12 rounded-xl bg-gradient-to-br from-sky-600 to-indigo-600 flex items-center justify-center text-2xl text-white">🏪</div>
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-indigo-400">Store Rating Platform</h1>
                <p className="text-slate-400">Discover nearby gems and help others with your reviews.</p>
              </div>
            </div>
            <p className="text-slate-400">Simple, fast, and delightful reviewing experience.</p>
          </div>
        </div>

        {/* Login Form Side */}
        <div className="w-full max-w-md mx-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default Login