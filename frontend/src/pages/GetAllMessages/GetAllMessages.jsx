import styles from './getallmessages.module.css'
import React from 'react'

const GetAllMessages = () => {
  return (
    <div className={styles.container}>

      <h1>Message Board</h1>
      <ul className={styles.message}>
        <li className={styles.createdAt}>
          <p>Created At: </p>
          <div>
          <p className={styles.message_text}>Message: </p>
          </div>
          <p className={styles.message_username}>Username</p>
        </li>
        </ul>

    </div>
  )
}

export default GetAllMessages