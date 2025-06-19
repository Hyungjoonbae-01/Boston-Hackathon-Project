  "use client"

  import type React from "react"
  import { createContext, useContext, useState, useEffect } from "react"

  interface ThemeContextProps {
    theme: "light" | "dark"
    setTheme: (theme: "light" | "dark") => void
  }

  const ThemeContext = createContext<ThemeContextProps>({
    theme: "dark",
    setTheme: () => {},
  })

  export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<"light" | "dark">("dark")
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
      const storedTheme = localStorage.getItem("theme")
      if (storedTheme) {
        setTheme(storedTheme === "dark" ? "dark" : "light")
      }
    }, [])

    useEffect(() => {
      if (mounted) {
        localStorage.setItem("theme", theme)
        document.documentElement.classList.toggle("dark", theme === "dark")
      }
    }, [theme, mounted])

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
      return <div className="dark">{children}</div>
    }

    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={theme}>{children}</div>
      </ThemeContext.Provider>
    )
  }

  export const useTheme = () => useContext(ThemeContext)