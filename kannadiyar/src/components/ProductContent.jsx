import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Counter from "./Counter";
import { Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductContent({ productData }) {
  const custId = sessionStorage.getItem("custId");
  const [ratingsInfo, setRatingsInfo] = useState([]);
  const [quantity,setQuantity] = useState(1);

  useEffect(() => {
    if (productData) {
      productData.forEach(async (val) => {
        try {
          const response = await fetch(
            `http://localhost:4000/product/${val.id}/ratings`
          );
          const data = await response.json();
          const { rating_count, avg_rating } = data;

          setRatingsInfo((prevInfo) => [
            ...prevInfo,
            {
              id: val.id,
              count: rating_count,
              average: parseFloat(avg_rating).toFixed(1),
            },
          ]);
        } catch (error) {
          console.error("Error fetching ratings:", error);
        }
      });
    }
  }, [productData]);
  const handleWishlist = async (product) => {
    if (custId == '0' || custId == null) {
      toast.error('You are in guest mode',{
        position : toast.POSITION.TOP_RIGHT,
      })
      return
    } else {
      const res = await fetch(
       ` http://localhost:4000/wishlist/?action=add`,
        { method: "POST",
        headers : {
          "Content-type" : "application/json"
        },
        body : JSON.stringify({custId,product})
      }
      );
      if (!res.ok) {
        const data = await res.json();
        console.error("Error:", data.error);
      }
    }
    
  };

  const decreaseQuantity = () => {
    if (quantity == 1){
      setQuantity(1)
    }
    else{
      setQuantity(quantity-1)
    }
  }

  const addToCart = async (productId) => {
    
    try {
      if(custId == '0' ){
        toast.error('You are in guest mode',{
          position : toast.POSITION.TOP_RIGHT,
        })
        return
      }
      else{
        const response = await fetch(
          `http://localhost:4000/addToCart/?action=add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              custId: custId,
              prodId: productId,
              quantity : quantity
            }),
          }
        );
        if (response.ok) {
          // If successful, update the local state to reflect the added item
          toast.success('Successfully added to cart...!', {
            position: toast.POSITION.TOP_RIGHT,
          })
          window.location.reload();
          
        } else {
          toast.warning('Already in cart...!', {
            position: toast.POSITION.TOP_RIGHT,
          })
        }
      } 
    } catch (error) {
      console.error("Error adding item to wishlist:", error);
    }  
  }

  return (
    <>
      <ToastContainer />
      {productData.map((product) => (
        <>
        <div className="flex flex-row ">
          <div className="flex flex-col ">
          <div className='sm: mt-6 sm: ml-4 font-content'>
            <div className=" lg:mt-7  lg:ml-10 ">
              <h1 className=" sm: mt-2 lg:text-3xl lg:pb-5 lg:font-semibold">
                {product.product_name}
              </h1>
              <h1 className="sm: mt-2 lg:text-xl text-primecolor lg:font-semibold">

                Other Language: {product.tamil_name}
              </h1>
              <h1 className="sm: mt-2 lg:text-xl lg:pt-4  lg:pb-3 lg:font-semibold text-gray-400">
                Botanical Name : {product.botanical_name}{" "}
              </h1>
              <div className=" lg:pt-2 lg:text-2xl">
                <Rating
                  name="simple-controlled"
                  value={
                    ratingsInfo.find((item) => item.id === product.id)
                      ?.average || 0
                  }
                  readOnly
                  precision={0.5}
                  size="large"
                />{" "}
                (
                {ratingsInfo.find((item) => item.id === product.id)?.count || 0}
                )
              </div>
            </div>
            <h1 className="lg:pl-10 lg:text-xl lg:pt-6">Available in :</h1>
            <div className="lg:pl-10 lg:pt-4">
              <h2 className="lg:text-lg lg:p-2 font-content font-bold">{product.weight}</h2>
            </div>
            <div className="lg:pl-10 lg:pt-6 lg:flex lg:flex-row">
              <h1 className="lg:text-3xl sm:text-2xl font-semibold text-red-500">
                ₹ {product.mrp}
              </h1>
              <h1 className="lg:text-2xl sm:text-xl font-semibold text-gray-400 line-through lg:pl-3 lg:pt-2">
                ₹ {product.discount_price}
              </h1>
            </div>
           

            <div className="sm: mt-3 lg:flex lg:flex-col lg:ml-10 lg:mt-7 ">
            <Counter
                increase={() => setQuantity(quantity + 1)}
                decrease={decreaseQuantity}
                quantity={quantity}
                className="sm: mt-3 lg:mt-5"
              />
               <button className="sm: bg-primecolor sm: p-2 sm: text-white sm: mt-1 hover:opacity-80 rounded-lg lg:w-72 lg:h-14" onClick={() => handleWishlist(product.id)}>
              Add to Wishlist
            </button>
              <button
                
                className="sm: bg-primecolor sm: p-2 sm: text-white sm: mt-1 ml-1 sm:ml-2 lg:ml-0 hover:opacity-80 rounded-lg  lg:w-72 lg:h-14"
                onClick={() => addToCart(product.id)}
              >
                Add to Bag
              </button>
              
            </div>
          </div>
          </div>
          
          </div>
        </>
      ))}
    </>
  );
}

export default ProductContent;
