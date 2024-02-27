import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


import Home from './screens/Home';
import Dashboard from './screens/Dashboard';

export function App() {
	return (
		<>
			<Router>
			<Routes>
				<Route path="/" element={<Home/>}/>  
				<Route path="/dashboard" element={<Dashboard/>}/>  
			</Routes>
		</Router>

		<Toaster toastOptions={{
			success: {
				style: {
				background: '',
				},
			},
			error: {
				style: {
				background: '',
				},
			},
		}} />
				
		
		</>
    	
  	)
}
