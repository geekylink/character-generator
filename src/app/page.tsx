import Image from 'next/image'
import { DnDCharacterForm } from './components'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <DnDCharacterForm />
      </div>

    </main>
  )
}
