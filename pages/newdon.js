import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import Loader from '../components/Root/Loader'
import toast from 'react-hot-toast'

export default function Donate() {
    
    const [loading, setLoading] = useState(true)
    // Stores donation options
    const [options, setOptions] = useState([])
    // Stores user's choices
    const [choices, setChoices] = useState([])
    const [step, setStep] = useState(0)

    // Get all donation options
    const fetchOptions = async () => {
        const { data, error } = await supabase.from('causes').select()

        if (error) {
            toast.error('Sorry, something went wrong. Kinship is working on it.', { position: 'top-right' })
        } else {
            setOptions(data)
            setLoading(false)
        }
    }

    const submitStepOne = (event) => {
        event.preventDefault();
        setStep(2)
    }

    useEffect(()=>{
        fetchOptions()
    })

    return (
        <div>
            {
                loading && step == 0 ? 

                <Loader />

                :

                <StepOne options = {options} step = {step} choices = {choices} />
            }
        </div>
    )
}

export function StepOne({options, step, choices}) {

    const addToOptions = (id) => {
        if (choices.includes(id)) {
            let indexOfItem = choices.indexOf(id)
            let newChoices = choices.splice(indexOfItem, 1)
            console.log(newChoices)
        } else {
            console.log(id)
        }
    }

    return (
        <div className = 'flex'>
            {options.map((option)=>(
                <>
                    <input
                        type = 'checkbox'
                        id = {option.id}
                        onClick={addToOptions(option.id)}
                    />
                    <label htmlFor = {option.id}>{option.name}</label>
                </>
            ))}
            <button>Continue</button>
        </div>
    )
}

export function StepTwo({options, step}) {
    return (
        <div className = 'flex'>
            {options.map((option)=>(
                <>
                    <input
                        type = 'checkbox'
                        id = {option.id}
                    />
                    <label htmlFor = {option.id}>{option.name}</label>
                </>
            ))}
            <button>Continue</button>
        </div>
    )
}