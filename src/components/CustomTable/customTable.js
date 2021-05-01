import React, { useState } from 'react';
// import axios from 'axios';

import styles from './customTable.module.css';

const CustomTable = ({headers, data, onItemClick, onRemoveItems, onFilter}) => {
    const [count, setCount] = useState(15)

    const [current, setCurrent] = useState('CustomTable )')
    const ratingColor = (rating) => {
        return rating > 700 ? 'green' : rating > 300 ? 'brown' : 'red'
    }

    const onScroll = (e, d) => {
        const {scrollHeight, scrollTop, clientHeight} = e.target
        let scroll = scrollHeight - scrollTop - clientHeight
        if (scroll < 1) {
          setCount(count + 10)
        }
      }

    return (
            <div className={styles.Main}>

                <div className={styles.Headers}>
                    {
                        headers.map((header, i) => {
                            return <h3 key={header.title}
                                style={{cursor: header.sorter ? 'pointer' : null}}
                                onClick={() => onFilter(header.dataIndex, i)}
                            >{header['title']}</h3>
                        })
                    }
                </div>
                <div className={styles.Opt}>
                    <p className={styles.Del}
                        onClick={onRemoveItems}
                    >Delete</p>
                    <p style={{color: 'white', fontWeight: 'bold'}}>Current: <span style={{color: 'green'}}>{current}</span></p>
                </div>
                <div className={styles.Data} onScroll={onScroll}>
                    <div>
                        {
                            data.slice(0,count).map((d, i) => {
                                return (
                                    <div style={{display: 'flex'}} key={d['id']}>
                                        <div onClick={() => [console.log(d), onItemClick(i), setCurrent(d['name'])]} className={styles.Row} >
                                            <p style={{color: d.selected ? 'red' : 'green'}} >{d['name']}</p>
                                            <p style={{fontStyle: 'initial', color: ratingColor(d['rating'])}}>{d['rating']}</p>
                                        </div>
                                    </div>
                                    )
                            })
                        }
                    </div>
                </div>
            </div>
        )
}

export default CustomTable;
