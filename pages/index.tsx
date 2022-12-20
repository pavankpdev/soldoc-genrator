import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from "react";
// @ts-ignore
import solc from "solc";
import {sampleAbi} from "../sampleAbi";
import Editor from "../components/Editor";

export default function Home() {
  const [solContents, setSolContents] = useState('')
  const [abi, setAbi] = useState<any[]>([])
    const [cName, setCname] = useState('')

    const handleSolContents = (e: any) => {
      e.preventDefault()
       setSolContents(e.target.value)
    }
    const handleClick = async () => {
      try {
          const res = await fetch('/api/compile', {
              method: 'POST',
              body: JSON.stringify({solContents}),
          })

          const compiled = await res.json()
          setAbi(compiled.data)
          setCname(compiled.name)
      } catch (e) {
          alert('Seems like an invalid code, please paste solidity code')
      }
    }
    const laodSampleContract = () => {
        setAbi(sampleAbi)
        setCname('Ballot')
    }
    const startOver = () => {
        setAbi([]);
        setCname('');
        setSolContents('');
    }

    const ShowStats = () => {
      return <>
          <div className={styles.headings}>
              <h1 className={styles.h1}>
                  Welcome to solidity document generator
              </h1>
              <h4 className={styles.h4}>
                  This app will use the &apos;NatSpec&apos; comments in your solidity files to generate a documentation website.
              </h4>
              <h6 className={styles.h6}>Haven&apos;t decided on the name, so we&apos;ll call it SolDoc Generator 😅</h6>
          </div>
          <div className={styles.headings}>
              <h4 className={styles.h4}>Contract: {cName}</h4>
              <table className={styles.table}>
                  <tr>
                      <th className={styles.th}>slno</th>
                      <th className={styles.th}>Type</th>
                      <th className={styles.th}>Name</th>
                      <th className={styles.th}>State Mutability</th>
                      <th className={styles.th}>Inputs Count</th>
                  </tr>
                  {abi.map((item, index) => {
                      return <tr key={index}>
                          <td className={styles.td}>{index}</td>
                          <td className={styles.td}>{item.type}</td>
                          <td className={styles.td}>{item.name}</td>
                          <td className={styles.td}>{item.stateMutability}</td>
                          <td className={styles.td}>{item.inputs.length}</td>
                      </tr>
                  })}
              </table>
              <button
                  className={styles.button}
                  onClick={startOver}
              >
                  Start over
              </button>
              <small>
                  Note: This app is still in development, so it can display only certain amount data for now.
              </small>
          </div>
      </>
    }

    return (
    <>
      <Head>
        <title>SolDoc Generator 😅</title>
        <meta name="description" content="This app will use the 'NatSpec' comments in your solidity files to generate a documentation website." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
          {
                abi.length > 0 ? <ShowStats /> : <Editor handleClick={handleClick} handleSolContents={handleSolContents} solContents={solContents} laodSampleContract={laodSampleContract} />
          }
      </main>
    </>
  )
}
