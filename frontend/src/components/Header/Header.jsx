import styles from './header.module.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
 
<>

    <div className={styles.header}>
        <h1 className={styles.header_title}>Message Board</h1>
        <nav>
          <ul className={styles.header_nav}>
            <li><Link to="/">Message Board</Link></li>
            <li><Link to="/post">Post New Message</Link></li>
          </ul>
    </nav>
    </div>

</>

  )
}

export default Header