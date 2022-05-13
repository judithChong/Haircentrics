import React from "react";
import { useState } from "react";

const Hairs = (props) => {
  const [newImage, setnewImage] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="row">
        {props.hairs.map((hair) => (
          <div className="col-4" key={hair.index}>
            <div class="card">
              <img className="card-img-top" src={hair.image} alt="img" />
              <div class="card-body ">
                <h5 class="card-title">Brand: {hair.brand}</h5>
                <h6 class="card-subtitle">Color: {hair.color}</h6>
                <h6 class="card-text">Durability: {hair.durability}</h6>
                <h5 class="card-title">
                  price : {hair.price / 1000000000000000000} cUSD
                </h5>
              </div>
              {/* // Other users can see the "Buy Hair" button except the owner */}
              {!(hair.owner === props.currentUser) && (
                <div>
                  <button
                    type="button"
                    class="btn tip btn-outline-dark"
                    onClick={() => props.buyHair(hair.index)}
                  >
                    Buy Hair
                  </button>
                </div>
              )}
              {/* Only owners can update hair image URL */}
              {hair.owner === props.currentUser && (
                <div>
                  <div class="form-group mx-sm-3 mb-2">
                    <label for="Change Image" class="sr-only">
                      Change Image
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      onChange={(e) => setnewImage(e.target.value)}
                      id="Input new image"
                      placeholder="New Image"
                    />
                  </div>
                  <button
                    class="btn btn-dark mb-2"
                    onClick={() => props.changeHairImage(hair.index, newImage)}
                  >
                    Change Image
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        ;
      </div>
    </div>
  );
};
export default Hairs;
