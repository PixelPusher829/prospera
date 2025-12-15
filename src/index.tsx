import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/app/App";
import { ThemeProvider } from "@/shared/contexts/ThemeContext";

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
	<React.StrictMode>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</React.StrictMode>,
);
