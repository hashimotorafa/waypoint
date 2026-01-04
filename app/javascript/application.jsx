// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import React from "react"
import { createRoot } from "react-dom/client"
import App from "./components/App"

const mountNode = document.getElementById("root")

if (mountNode) {
	const root = createRoot(mountNode)
	root.render(<App />)
}
