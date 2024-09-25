import styles from './postnewmessage.module.css'
import { useState } from 'react'


const PostNewMessage = () => {
  const [message, setMessage] = useState()
  const [username, setUsername] = useState()


/*   async function fetchMessages() {
    if (message) {
      try {
        const response = await fetch('https://wsz0ffu3ta.execute-api.eu-north-1.amazonaws.com/messages', {
          method: 'POST',
          body: JSON.stringify({ message, username }),
        }

         )
        const data = await response.json()
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
  }
 */







  return (
    <div className={styles.container}>
      <h1>Post New Message</h1>
      <form>
        <label for="message">
          Message:
          <input type="text" name="message" id="message"   />
        </label> <br />
        <label for="username">
          Username:
          <input type="text" name="username" id="username" />
        </label> <br />
        <button type="submit">Post Message!</button>
      </form>

    </div>
  )
}

export default PostNewMessage