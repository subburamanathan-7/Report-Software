import React, {useState, useContext} from 'react'
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';

import{useMutation, useQueryClient} from '@tanstack/react-query'
import { login } from '../features/students/StudentServices';

const forese = require('../assets/forese.png');

function Home() {

	const [formData, setFormData] = useState({regNo:"", password:""})

    const queryClient = useQueryClient();
    const navigate = useNavigate();


	const loginMutation  = useMutation({
		mutationFn:login,
		onSuccess:(data)=>{
			toast.success('Login Successfull')
			console.log(data)
			sessionStorage.setItem('name',data.name)
			sessionStorage.setItem('regNo',data.regNo)
			sessionStorage.setItem('dept',data.dept)

			navigate('/dashboard')
		},
		onError:(message)=>{
			toast.error('Invalid Credentials')
		}
	})

	const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
		if(!formData.regNo || !formData.password){
		}
		else{
			loginMutation.mutate({
				regNo:formData.regNo,
				password:formData.password
			})
		}
    }
	return (
		<>
		<div className='flex flex-col justify-center items-center h-screen bg-[#8EA7E9]'>
			<div className='flex items-center justify-center mt-[-6%] py-[3%]'>
				<img 
					className='object-fill w-40'
					alt='logo'
					src={forese} />

			</div>
			
			<form className='w-96 p-6 shadow-lg bg-white rounded-md text-[#7286D3]'>
				<h2 className='text-2xl  block text-center font-semibold'><i className=' text-2xl fa-solid fa-user px-2'></i> Student Login</h2>
				<hr className='mt-3'/>
				<div className='mt-3'>
					<label htmlFor='username' className=' block text-base mb-2 font-base'>Register Number</label>
					<input type='text' id ='regNo' 
					name='regNo'
					className='border border-[#7286D3] w-full text-base px-2 py-1 focus:outline-none focus:ring-0' 
					placeholder='Enter Register Number...'
					value={formData.regNo} 
					onChange={handleChange}/>
				</div>
				<div className='mt-3'>
					<label htmlFor='password' className='block text-base mb-2 font-base'>Password</label>
					<input type='password' id ='password' 
					name='password'
					className='border border-[#7286D3] w-full text-base px-2 py-1 focus:outline-none focus:ring-0' 
					placeholder='Enter Password...'
					value={formData.password} 
					onChange={handleChange}/>
				</div>
				<div class="mt-3 flex justify-between items-center">
					
				</div>
				<div className='mt-5'>
					<button type='submit' className=' cursor-pointer border-2 border-[#a6c1ee] bg-[#7286D3] text-white py-1 w-full rounded font-semibold hover:opacity-75 hover:z-90 duration-150' onClick={handleSubmit}>Submit</button>
				</div>
			</form>
		</div>
		<div class=" fixed bottom-0 w-full">
			<div class="max-w-2xl mx-auto text-white py-2">
				<div class=" flex flex-col md:flex-row md:justify-center items-center text-lg">
					<p class="order-2 md:order-1 mt-8 md:mt-0">Designed & Developed by <span className='underline cursor-pointer'>FORESE - TECH</span></p>
					
				</div>
			</div>
		</div>
	</>
	)
}

export default Home