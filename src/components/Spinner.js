import React from 'react'
import loading from "./disk.gif"
export default function Spinner() {
  return (
    <div class="flex justify-center ">
        <img className="w-20 h-auto" src={loading}></img>
      
    </div>
  )
}
