import React, { useEffect, useState } from "react";
import axios from "axios";
import "./cart.css";
import Payment from "./payment";
import OrderHistory from "./orderhistory";
import "./payment.css"

const Cart = ({ cartItems, handleAddProduct, handleDelProduct, handleCartClear }) => {
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const [purchasedItems, setPurchasedItems] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deliveryAddress, setDeliveryAddress] = useState("");

    const totalPrice = cartItems.reduce(
        (price, item) => price + item.quantity * item.price,
        0
    );

    const handlePaymentCompletion = async () => {
        try {
            const itemsWithAddress = cartItems.map(item => ({ ...item, deliveryAddress: deliveryAddress }));
            await axios.post("http://localhost:3000/history", { items: itemsWithAddress, deliveryAddress }); // Include deliveryAddress in the request body
            setPurchasedItems([...cartItems]);
            setPaymentCompleted(true);
            alert("Thanks for Shopping");
            window.location.reload();
            alert("Delivered to "+deliveryAddress);
        } catch (error) {
            console.error("Error storing cart item history:", error);
        }
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("http://localhost:3000/history");
            setData(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
      }, []);

    const handleShowHistory = async () => {
    try {
        setLoading(true);
        const itemsWithAddress = cartItems.map(item => ({ ...item, deliveryAddress: deliveryAddress }));
        await axios.post("http://localhost:3000/history", { items: itemsWithAddress });
        setShowHistory(!showHistory);
        setLoading(false);
    } catch (error) {
        console.error("Error storing cart item history:", error);
        setLoading(false);
    }
};

    

    return (
        <div className="conatinerofcart">
            <div className="carthead">Cart Items</div>
            {cartItems.length === 0 && (
                <div className="cartempty"> Cart is Empty </div>
            )}
            <div>
                <div>
                    {cartItems.length >= 1 && (
                        <button className="clearcart" onClick={() => handleCartClear()}>
                            Clear
                        </button>
                    )}
                </div>
                {cartItems.map((item) => (
                    <div key={item.id} className="cartlist">
                        <img className="cartimg" src={item.image} alt={item.name} />
                        <div className="cartItemsname">{item.title}</div>
                        <div className="cartItemsfunc">
                            <button onClick={() => handleAddProduct(item)} className="addbttn">+</button>
                            <button onClick={() => handleDelProduct(item)} className="delbttn">-</button>
                        </div>
                        <div> {item.quantity}*Rs{item.price} </div>
                    </div>
                ))}
            </div>
            <div className="finalamt">Total Price
                <div className="totprice">Rs {totalPrice}</div>
                <div>
                    {cartItems.length > 0 && !paymentCompleted && (
                        <>
                            <input
                                type="text"
                                placeholder="Enter Delivery Address"
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                            />
                            <button onClick={handlePaymentCompletion} className="paybtn">Proceed to Payment</button>
                        </>
                    )}
                </div>
            </div>
            <div className="history">
                <button onClick={handleShowHistory}>
                    {showHistory ? "Hide History" : "Show History"}
                </button>
                {showHistory && !loading && <OrderHistory purchasedItems={purchasedItems}/> }
                {showHistory && !loading && 
                    <div>
                        <h1>Transaction History</h1>
                        <ul>
                            {data.map((item) => (
                                <li key={item._id} >{item.title} - Quantity: {item.quantity}, Price: Rs{item.price}</li>
                            ))}
                        </ul>
                    </div>
                }
                {loading && <p>Loading...</p>}
            </div>
        </div>
    );
}

export default Cart;
