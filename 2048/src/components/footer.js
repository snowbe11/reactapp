import React from 'react'
import './footer.css'

export default function Footer() {
    const style = {
        borderWidth: '1px 0 0 0',
        borderColor: 'cadetblue',
    }

    return (
        <div className='footer-container'>
            <hr style={style}/>
            <a href='https://2048game.com/blog/'>about 2048</a>
            <div>
                @snowbe11@ncsoft.com
            </div>
        </div>
    )
}
