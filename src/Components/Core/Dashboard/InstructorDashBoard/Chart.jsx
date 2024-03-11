import { useState } from "react";
import {Chart,registerables} from 'chart.js'
import {Pie, pie} from 'react-chartjs-2'

Chart.register(...registerables);

function Charts({courses}){
    const [currChart,setCurrChart]  = useState('Student');

    function RandomColors(numColors){
        let colors=[];
        for(let i=0;i<numColors;i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`

            colors.push(color);
        }
        return colors;
    }

    //create data for chart displaying students info..
        const chartDataStudents = {
            labels:courses.map((course)=>course.courseName),
            datasets:[
                {
                    data:courses.map((course)=>course.totalStudents),
                    backgroundColor:RandomColors(courses.length)
                }
            ]
        }

    //create data for chart displaying students info..
    const chartDataIncome = {
        labels:courses.map((course)=>course.courseName),
        datasets:[
            {
                data:courses.map((course)=>course.totaAmountGenerated
                ),
                backgroundColor:RandomColors(courses.length)
            }
        ]
    }

    //create options
    let options ={

    }

    return(
        <div className="sm:w-[50%] flex flex-col gap-3 mt-5 bg-richblack-800 rounded-md p-5 sm:p-10">
            <h1 className="text-xl font-semibold text-richblack-25 ">Visualise</h1>
            <div className="flex gap-7">
                <p className={`${currChart === 'Student' ? "text-yellow-50 bg-richblack-700" :"text-yellow-100"} text-lg font-semibold w-fit p-1 px-2 rounded-md `}
                onClick={()=>setCurrChart('Student')}
                >
                    Students
                </p>

                <p className={`${currChart === 'Income' ? "text-yellow-25 bg-richblack-700" :"text-yellow-100"} text-lg font-semibold w-fit p-1 px-2 rounded-md`}
                onClick={()=>setCurrChart('Income')}
                >
                    Income
                </p>
            </div>
            <Pie 
            data={currChart === 'Student' ? chartDataStudents :chartDataIncome}
            options={options}
            />
        </div>
    )
}

export default Charts;