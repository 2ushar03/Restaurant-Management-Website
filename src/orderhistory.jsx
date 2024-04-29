import React from "react";

const OrderHistory = ({ purchasedItems }) => {
    return (
        <div>
            <h2>Order History</h2>
            <ul>
                {purchasedItems.map((item, index) => (
                    <li key={index}>
                        {item.title} - {item.quantity}*Rs{item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderHistory;
