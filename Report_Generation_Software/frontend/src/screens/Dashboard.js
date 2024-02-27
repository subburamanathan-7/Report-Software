import { Fragment, useEffect, useState } from 'react';
import  {useNavigate} from 'react-router-dom';

import DashNavbar from '../components/DashNavbar'
import { useQuery } from '@tanstack/react-query';
import { getScores } from '../features/students/StudentServices';

function Dashboard() {
    
    const navigate = useNavigate();
    
    const [studentScores, setStudentScores] = useState(null);
    const [GDState, setGDState] = useState(true);
    const [AptitudeState, setAptitudeState] = useState(true);


    useEffect(()=>{
        if(!sessionStorage.getItem('user'))
            navigate('/')
    })

    const getScoresQuery = useQuery({
        queryKey:['score',sessionStorage.getItem('regNo')],
        queryFn:()=>{
            return getScores(sessionStorage.getItem('user'))
        },
        enabled:!!sessionStorage.getItem('user'),
        refetchOnMount:true,
        refetchOnReconnect:true,
        refetchOnWindowFocus:false,
    })
    if(getScoresQuery.isLoading || getScoresQuery.isFetching){}
    
    else if(getScoresQuery.isFetched){
        if(studentScores===null){
            // console.log(getScoresQuery.data)
            setStudentScores(getScoresQuery.data[0])
        }
    }

    return (
    <>
        <DashNavbar/>
        <Fragment>
            <div  className="">
                <div className='mx-[5%]'>
                    <table className=' mt-[3%] mx-6 text-xl'>
                        <tr>
                            <td><div className='font-medium pr-2'>Register Number:</div></td>
                            <td><div className='font-bold hover:underline hover:cursor-pointer  '>{sessionStorage.getItem('regNo')}</div></td>
                        </tr>
                        <tr>
                            <td><div className='font-medium pr-2'>Department:</div></td>
                            <td><div className='font-bold hover:underline hover:cursor-pointer'>{sessionStorage.getItem('dept')}</div></td>
                        </tr>
                    </table>
                    <hr className='my-[2%]'/>
                    {

                        GDState!==false? studentScores?studentScores.gd_total===-1?setGDState(false):'':'':''
                        
                    }
                    {
                        AptitudeState!==false? studentScores?studentScores.aptitude_total===-1?setAptitudeState(false):'':'':''
                        
                    }
                    <div className='overflow-auto rounded-lg  my-[2%]'>
                        <table className='cursor-default w-full shadow-md border rounded-md'>
                            <caption className="text-xl font-bold underline my-[2%] rounded">Aptitude Scores</caption>
                            <thead className=''>
                                <tr className='py-[5%] text-lg font-semibold rounded '>
                                    <th className='p-3 tracking-wide text-center border'>Core</th>
                                    <th className='p-3 tracking-wide text-center border'>Verbal</th>
                                    <th className='p-3 tracking-wide text-center border'>Aptitude</th>
                                    <th className='p-3 tracking-wide text-center border'>Coding</th>
                                    <th className='p-3 tracking-wide text-center border'>Total</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide'>
                                <tr className='rounded'>
                                    
                                    <td className='p-3 text-sm tracking-wide text-center border whitespace-nowrap '>{!AptitudeState?'-': studentScores?studentScores.aptitude_scores.core:''}</td>
                                    <td className='p-3 text-sm tracking-wide text-center border whitespace-nowrap '>{!AptitudeState?'-': studentScores?studentScores.aptitude_scores.verbal:''}</td>
                                    <td className='p-3 text-sm tracking-wide text-center border whitespace-nowrap '>{!AptitudeState?'-': studentScores?studentScores.aptitude_scores.quants:''}</td>
                                    <td className='p-3 text-sm tracking-wide text-center border whitespace-nowrap '>{!AptitudeState?'-': studentScores?studentScores.aptitude_scores.coding:''}</td>
                                    <td className='p-3 text-sm tracking-wide text-center border whitespace-nowrap '>{!AptitudeState?'AB': studentScores?studentScores.aptitude_total:''}</td>


                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className='overflow-auto rounded-lg  my-[2%]'>
                        <table className='cursor-default w-full shadow-md border rounded-md'>
                            <caption className="text-xl font-bold underline my-[2%] rounded">Group Discussion Scores</caption>
                            <thead className=''>
                                <tr className='py-[5%] text-lg font-semibold rounded '>
                                    <th className='p-3 tracking-wide text-center border'>Subjective Knowledge</th>
                                    <th className='p-3 tracking-wide text-center border'>Communication Skills</th>
                                    <th className='p-3 tracking-wide text-center border'>Active Participation</th>
                                    <th className='p-3 tracking-wide text-center border'>Body Language</th>
                                    <th className='p-3 tracking-wide text-center border'>Listening Skills</th>
                                    <th className='p-3 tracking-wide text-center border'>Total</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide'>
                                <tr className='rounded'>
                                    <td className='p-3 text-sm tracking-wide text-center border whitespace-nowrap '>{!GDState?'-': studentScores?studentScores.gd_scores.subject:''}</td>
                                    <td className='p-3 text-sm tracking-wide text-center border whitespace-nowrap '>{!GDState?'-': studentScores?studentScores.gd_scores.communication:''}</td>
                                    <td className='p-3 text-sm tracking-wide text-center border whitespace-nowrap '>{!GDState?'-': studentScores?studentScores.gd_scores.body_language:''}</td>
                                    <td className='p-3 text-sm tracking-wide text-center border whitespace-nowrap '>{!GDState?'-': studentScores?studentScores.gd_scores.active:''}</td>
                                    <td className='p-3 text-sm tracking-wide text-center border whitespace-nowrap '>{!GDState?'-': studentScores?studentScores.gd_scores.listening:''}</td>
                                    <td className='p-3 text-sm tracking-wide text-center border whitespace-nowrap '>{!GDState?'AB': studentScores?studentScores.gd_total:''}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="fixed bottom-0 w-[100%]">
                    <div class="max-w-2xl mx-auto shadow-md py-2 bg-[#DBDFEA]">
                        <div class=" flex flex-col md:flex-row md:justify-center items-center text-lg">
                            <p class="order-2 md:order-1 mt-8 md:mt-0">For queries reach us through <span className='underline cursor-pointer'>forese@svce.ac.in</span></p>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    </>
    )
}

export default Dashboard