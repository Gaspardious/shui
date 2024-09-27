import styles from './postnewmessage.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const PostNewMessage = (fetchMessages) => {
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()


  async function postMessages() {
    if (message && username) {
      try {
        const response = await fetch('https://wsz0ffu3ta.execute-api.eu-north-1.amazonaws.com/messages', {
          method: 'POST',
          body: JSON.stringify({ message, username }),
        }

         )
        const data = await response.json()
        console.log(data)

        if(fetchMessages) {
          fetchMessages()
        }
      } catch (error) {
        console.error(error)
      }

    } else {
      console.log('Please fill in all fields')
  }
}

const handleSubmit = (e) => {
  e.preventDefault(); // Prevents the form from refreshing the page
  postMessages();
  navigate('/');
};

  return (
    <div className={styles.container}>
  
      <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Post New Message</h1> 

        <label className={styles.label} htmlFor="message">Message:</label>
          <textarea 
          className={styles.textarea}
          type="text" 
          placeholder='Enter your message here'
          name="message" 
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={300}
          />

        <label className={styles.label} htmlFor="username">Username:</label>
          <input 
          className={styles.input}
          type="text" 
          placeholder='Enter your username here'
          name="username" 
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          />
       
        <button className={styles.btn} type="submit">Post Message!</button>
      </form>

    </div>
  )
}

export default PostNewMessage