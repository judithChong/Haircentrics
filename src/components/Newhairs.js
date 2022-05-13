import React from 'react'

import { useState } from "react";


const Newhairs = (props) => {

    


 const [image, setImage] = useState('');
 const [brand, setBrand] = useState('');
 const [color, setColor] = useState('');
 const [durability, setDurability] = useState('');
 const [price, setPrice] = useState('');

 const submitHandler = (e) => {
    e.preventDefault();

 if(!image || !brand|| !color || !durability || !price  ) {
    alert('Please fill up the form')
    return

}
props.addHair(image, brand, color, durability, price);

setImage('')
setBrand('')
setColor('')
setDurability('')
setPrice('')
};

return ( 
   <section className="addd"> 
   <div className="container">
   <form onSubmit={submitHandler}>
      <div className="row">
         <div className="col-lg-6">
            <div className="card-body">
               <div className="row">
                  <div className="col-lg-12">
                     <div className="head text-center text-white">
                         <h3> Add Hair</h3>

                     </div>

                  </div>

               </div>
               <div className="form p-3">
                  <div className="form-row my-5">
                     <div className="col-lg-6">
                        <input type="text" class="effect-1" placeholder="Enter Image of Hair" value={image}  onChange={(e) => setImage(e.target.value)}/>

                           <span class="focus-border">

                           </span>

                     </div>
                     <div className="col-lg-6">
                        <input type="text" class="effect-1" placeholder="Enter Brand of Hair" value={brand}  onChange={(e) => setBrand(e.target.value)}/>

                           <span class="focus-border">

                           </span>
                           </div>

                           <div className="col-lg-6">
                        <input type="text" class="effect-1" placeholder="Enter Color of Hair" value={color}  onChange={(e) => setColor(e.target.value)}/>

                           <span class="focus-border">

                           </span>
                           </div>

                           <div className="col-lg-6">
                        <input type="text" class="effect-1" placeholder="Enter Durability of Hair" value={durability}  onChange={(e) => setDurability(e.target.value)}/>

                           <span class="focus-border">

                           </span>
                           </div>
                           <div className="col-lg-6">
                        <input type="number" class="effect-1" placeholder="Enter Price of Hair" value={price}  onChange={(e) => setPrice(e.target.value)}/>

                           <span class="focus-border">

                           </span>
                           </div>



                  </div>
                  <button type="submit" class="btn btn-outline-success bot">Add Hair</button>

               </div>

            </div>

         </div>
         

      </div>
      </form>
   </div>
   </section>
   )
}
   
   
   export default Newhairs;
   
  