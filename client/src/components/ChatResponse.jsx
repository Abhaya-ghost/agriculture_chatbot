import React from 'react'

const ChatResponse = ({ response }) => {
    const answer = response.data
    console.log(answer)
    return (
        <div className='answer'>{answer}</div>
    )
}

export default ChatResponse