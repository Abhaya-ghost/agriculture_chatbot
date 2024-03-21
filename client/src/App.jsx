import { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { LinearProgress, TextField } from '@mui/material';
import axios from 'axios';
import ChatResponse from './components/ChatResponse';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'
import bot from './assets/bot1.gif'

function App() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatBot",
      sender: "ChatBot",
      direction: 'incoming'
    },
    {
      message: "How can I help you?",
      sender: "ChatBot",
      direction: 'incoming'
    }
  ])

  const handleSend = async (prompt) => {
    console.log(prompt)
    const newMessage = {
      message: prompt,
      sender: 'user',
      direction: 'outgoing'
    }

    const newMessages = [...messages, newMessage]

    setMessages(newMessages)

    setTyping(true)

    const res = await axios.post('https://agriculture-chatbot-q28j.onrender.com/chat', { prompt })
    console.log(res.data)

    setMessages([...newMessages, {
      message: res.data,
      sender: 'ChatBot',
      direction: 'incoming'
    }])

    setTyping(false)
  }

  return (
    <div className="app">
      <img src={bot} alt="" />
      <button onClick={handleOpen} className='btn'>Ask me anything!</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='chatbot-modal'
      >
        <MainContainer className="container">
          <ChatContainer>
            <MessageList scrollBehavior='smooth' typingIndicator={typing ? <TypingIndicator content='ChatBot is typing' /> : null}>
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder='Type your message here' onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </Modal>
    </div>

  )
}

export default App
