import Image from 'next/image'
import styles from './page.module.css'

import GlobalNumbers from './components/GlobalNumbers/GlobalNumbers'

import MainTable from './components/MainTable/MainTable'

export default function Home() {
  return (
    <main className='main-wrapper'>
      <GlobalNumbers />
      <MainTable />
    </main>
  )
}
