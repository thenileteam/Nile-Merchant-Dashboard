import { useState } from "react"
const WalkThrough = () => {
    const[next, showNext]= useState(0)
  return (
      <div className="fixed inset-0 bg-black/50">
          <div className="bg-white max-w-[300px]">
              <article>
                  <h3>Lorem ipsum dolor sit amet consectetur adipisicing </h3>
                  <button type="button"></button>
              </article>
          </div>
      </div>
          
  )
}

export default WalkThrough