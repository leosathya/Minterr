import { Navbar, Welcomme } from "./components";

function App() {
	return (
		<div className="min-h-screen">
			<div className="gradient-bg-welcome">
				<Navbar />
				<Welcomme />
			</div>
		</div>
	);
}

export default App;
