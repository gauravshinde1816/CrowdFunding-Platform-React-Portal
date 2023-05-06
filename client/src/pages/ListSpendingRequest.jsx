import React, { useState, useEffect } from 'react'

import { useSpendingRequestContext } from "../context"
import { Loader } from '../components';

const ListSpendingRequest = () => {

    const [spendingRequests, setSP] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const { getSpendingRequests , getAmountCollected } = useSpendingRequestContext()


    const fetchSpendingRequest = async () => {
        setIsLoading(true)
        const data = await getSpendingRequests()
        setSP(data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchSpendingRequest()

        console.log("from CP " , spendingRequests)
        console.log(getAmountCollected())

    }, [])

    return (
        <div>
            <div>List Of Spending Request</div>
            {
                isLoading ? <Loader /> :
                    <div>
                        {spendingRequests.map((SP, i) => {
                            <h1>{SP.title}</h1>
                        })}
                    </div>
            }

        </div>
    )
}

export default ListSpendingRequest