import styles from "../styles/Home.module.css";
import React from "react";

type Props = {
    handleSolContents: (e: any) => void;
    solContents: string;
    handleClick: () => void;
    laodSampleContract: () => void;
}

const ShowEditor: React.FC<Props> = (props) => {
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
              <textarea
                  className={styles.textarea}
                  placeholder={'Paste your solidity code here'}
                  rows={10}
                  cols={80}
                  onChange={props.handleSolContents}
                  value={props.solContents}
              />

            <div
                style={{
                    display: 'flex',
                    gap: '10px',
                    alignItems: 'center'
                }}
            >
                <button
                    className={styles.button}
                    onClick={props.handleClick}
                >
                    Get Documentation
                </button>
                <button
                    className={styles.button}
                    onClick={props.laodSampleContract}
                >
                    Load sample contract
                </button>
            </div>
            <small>
                Note: This app is still in development, so it can display only certain amount data for now.
            </small>
        </div>
    </>
}

export default ShowEditor;