import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../layouts/footer";
import Header from "../../../layouts/header";
import { useCart } from "react-use-cart";
import "./cart.css";
import CartPayment from "../payment/cartPayment";
import MobilePayment from "../payment/mobilePayment";

const Cart = () => {
  const deliveryData = [
    {
      id: 1,
      price: 100,
      name: "Prompto",
      email: "lahirupr471@gmail.com",
    },
    {
      id: 2,
      price: 150,
      name: "Crypto",
      email: "lahirupr471@gmail.com",
    },
    {
      id: 3,
      price: 200,
      name: "Kooria service",
      email: "lahirupr471@gmail.com",
    },
  ];

  const [cartDisplay, setCart] = useState(true);

  const [deliveryPrice, setDeliveryPrice] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(true);
  const [shippingDetails, setShippingDetails] = useState({
    address: "",
    country: "",
    city: "",
    postal: "",
  });

  const [deliverDetails, setDeliverDetails] = useState({
    price: "",
    name: "",
    email: "",
  });
  const {
    items,
    totalItems,
    isEmpty,
    cartTotal,
    updateItemQuantity,
    removeItem,
  } = useCart();

  const setAddressData = (e) => {
    e.preventDefault();

    setDeliveryStatus(false);
  };
  const clearData = (e) => {
    e.preventDefault();

    setDeliveryStatus(true);
  };

  const setData = (e) => {
    let Id = e.target.value;
    const data = deliveryData.find((e) => e.id == Id);
    setDeliveryPrice(data.price);

    setDeliverDetails((prevState) => ({
      ...prevState,
      price: data.price,
      name: data.name,
      email: data.email,
    }));

    console.log(deliverDetails);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (isEmpty)
    return (
      <>
        <Header />
        <img
          src="https://i.postimg.cc/BbrzhpXf/services-left-dec.png"
          alt=""
          class="shape"
        />
        <div class="container">
          <div className="shopc">
            <h1>CART</h1>
            <p>
              <Link to="/homeclient">Home</Link> / Cart
            </p>
          </div>
        </div>
        <div class="container">
          <div class="col-sm-12 empty-cart-cls text-center">
            {/* <div style={{padding: '20px', color: '#515151'}}><svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg></div> */}
            <div className="crti">
              <div style={{ padding: "20px", color: "#515151" }}>
                <img src="https://i.postimg.cc/SRv62yX7/ezgif-2-7ee06abb16.gif"></img>
              </div>
            </div>
            <h4>
              <strong style={{ lineHeight: "30px", color: "#515151" }}>
                Your Cart is Empty
              </strong>
            </h4>
            <h5 style={{ color: "#515151", paddingBottom: "25px" }}>
              Add something to make me happy :)
            </h5>
            <Link to="/homeclient">
              <div className="btn2">Continue Shopping</div>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );

  return (
    <div>
      {cartDisplay && (
        <div>
          <Header />
          <img
            src="https://i.postimg.cc/BbrzhpXf/services-left-dec.png"
            alt=""
            class="shape"
          />

          <div className="container">
            <div className="shopc">
              <h1>CART</h1>
              <p>
                <Link to="/homeclient">Home</Link> / Cart
              </p>
            </div>
            <div className="container pb-5 mt-n2 mt-md-n3">
              <div className="row">
                <div className="col-xl-9 col-md-8">
                  <h2 className="h6 d-flex flex-wrap justify-content-between align-items-center px-4 py-3">
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "30px",
                        fontfamily: "Poppins",
                      }}
                    >
                      Products
                    </span>
                    <Link to="/homeclient">
                      <a className="font-size-sm" href="/homeclient">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-chevron-left"
                          style={{
                            fontWeight: "bold",
                            fontSize: "30px",
                            fontfamily: "Poppins",
                          }}
                        >
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                        Continue Shopping
                      </a>
                    </Link>
                  </h2>
                  {items.map((item, index) => {
                    return (
                      <div
                        className="d-sm-flex justify-content-between my-4 pb-4 border-bottom"
                        key={index}
                      >
                        <div className="media d-block d-sm-flex text-center text-sm-left">
                          <a
                            className="cart-item-thumb mx-auto mr-sm-4"
                            href="#"
                          >
                            <div className="cardc">
                              <div className="imgBxc">
                                <Link to={`/itemview/${item._id}`}>
                                  <img
                                    src={
                                      "http://localhost:5000/img/product/" +
                                      item.image
                                    }
                                  />
                                </Link>
                              </div>
                            </div>
                          </a>
                          <div className="media-body pt-3">
                            <Link to={`/itemview/${item._id}`}>
                              <h3 className="product-card-title font-weight-semibold border-0 pb-0">
                                {item.name}
                              </h3>
                            </Link>
                            <div className="font-size-sm">
                              <span className="text-muted mr-2">SKU:</span>
                              {item.sku}
                            </div>
                            <div className="font-size-lg text-primary pt-2">
                              Rs. {item.price}
                            </div>
                          </div>
                        </div>

                        <div
                          className="pt-2 pt-sm-0 pl-sm-3 mx-auto mx-sm-0 text-center text-sm-left"
                          style={{ width: "auto" }}
                        >
                          <div className="plusm">
                            <input
                              className="crt"
                              type="button"
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity - 1)
                              }
                              value="-"
                            />
                            <input
                              className="crt"
                              type="text"
                              name="quantity"
                              value={item.quantity}
                              maxlength="2"
                              max="10"
                              size="1"
                              id="number"
                            />
                            <input
                              className="crt"
                              type="button"
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity + 1)
                              }
                              value="+"
                            />
                          </div>
                          <br />
                          <button
                            className="btn btn-outline-danger btn-sm btn-block mb-2"
                            type="button"
                            onClick={() => removeItem(item.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              className="feather feather-trash-2 mr-1"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                              <line x1="10" y1="11" x2="10" y2="17"></line>
                              <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-xl-3 col-md-4 pt-3 pt-md-0">
                  <h2
                    className="h6 px-4 py-3 bg-info text-center"
                    style={{ color: "white" }}
                  >
                    Subtotal
                  </h2>
                  <div className="h3 font-weight-semibold text-center py-3">
                    Rs. {cartTotal}
                  </div>
                  <h3
                    className="h6 pt-1 font-weight-semibold"
                    style={{ textAlign: "center" }}
                  >
                    Total Items: {totalItems}
                  </h3>
                  <hr />
                  <center>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@mdo"
                    >
                      Add shipping address
                    </button>
                    <h3
                      style={{ paddingBottom: "15px" }}
                      className="h6 pt-4 font-weight-semibold"
                    >
                      <span className="badge badge-success mr-2">S</span>
                      Shipping Service
                    </h3>
                    <div className="input-group-btn search-panel">
                      <select
                        disabled={deliveryStatus}
                        name="search_param"
                        id="search_param"
                        style={{ borderRadius: "0px", width: "200px" }}
                        className="btn btn-light dropdown-toggle"
                        data-toggle="dropdown"
                        onChange={(e) => {
                          setData(e);
                        }}
                      >
                        <option value="">-Shipping Service-</option>
                        {/* eslint-disable-next-line array-callback-return */}
                        {deliveryData.map((event) => {
                          return <option value={event.id}>{event.name}</option>;
                        })}
                      </select>
                    </div>
                    <div className="mt-2" hidden={deliveryPrice.length === 0}>
                      <h6>Delivery fee : RS.{deliveryPrice}</h6>
                    </div>
                  </center>
                  <br />
                  <div
                    hidden={deliveryPrice.length === 0}
                    data-bs-toggle="modal"
                    data-bs-target="#cartPayment"
                  >
                    <a className="btn btn-primary btn-block" href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-credit-card mr-2"
                      >
                        <rect
                          x="1"
                          y="4"
                          width="22"
                          height="16"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                      Pay with Card
                    </a>
                  </div>
                  <br />
                  <div
                    hidden={deliveryPrice.length === 0}
                    data-bs-toggle="modal"
                    data-bs-target="#mobilePayment"
                  >
                    <a className="btn btn-success btn-block" href="#">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="bi bi-phone-vibrate"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4zM6 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6z" />
                        <path d="M8 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM1.599 4.058a.5.5 0 0 1 .208.676A6.967 6.967 0 0 0 1 8c0 1.18.292 2.292.807 3.266a.5.5 0 0 1-.884.468A7.968 7.968 0 0 1 0 8c0-1.347.334-2.619.923-3.734a.5.5 0 0 1 .676-.208zm12.802 0a.5.5 0 0 1 .676.208A7.967 7.967 0 0 1 16 8a7.967 7.967 0 0 1-.923 3.734.5.5 0 0 1-.884-.468A6.967 6.967 0 0 0 15 8c0-1.18-.292-2.292-.807-3.266a.5.5 0 0 1 .208-.676zM3.057 5.534a.5.5 0 0 1 .284.648A4.986 4.986 0 0 0 3 8c0 .642.12 1.255.34 1.818a.5.5 0 1 1-.93.364A5.986 5.986 0 0 1 2 8c0-.769.145-1.505.41-2.182a.5.5 0 0 1 .647-.284zm9.886 0a.5.5 0 0 1 .648.284C13.855 6.495 14 7.231 14 8c0 .769-.145 1.505-.41 2.182a.5.5 0 0 1-.93-.364C12.88 9.255 13 8.642 13 8c0-.642-.12-1.255-.34-1.818a.5.5 0 0 1 .283-.648z" />
                      </svg>
                      Pay with Mobile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      )}

      {/*Cart payment model*/}
      <div
        className="modal fade"
        id="cartPayment"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Pay Invoice
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CartPayment
                total={cartTotal}
                shippingDetails={shippingDetails}
                deliverFee={deliverDetails}
                items={items}
              />
            </div>
          </div>
        </div>
      </div>

      {/*Mobile payment model*/}
      <div
        className="modal fade"
        id="mobilePayment"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Mobile payment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <MobilePayment
                total={cartTotal}
                shippingDetails={shippingDetails}
                deliverFee={deliverDetails}
                items={items}
              />
            </div>
          </div>
        </div>
      </div>

      {/*add shipping model*/}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add shipping address
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter your address"
                      className="form-control"
                      id="recipient-name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter city"
                      className="form-control"
                      id="recipient-name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      County
                    </label>
                    <input
                      type="text"
                      name="country"
                      placeholder="Enter country"
                      className="form-control"
                      id="recipient-name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Postal code
                    </label>
                    <input
                      type="number"
                      name="postal"
                      placeholder="Enter postal code"
                      className="form-control"
                      id="recipient-name"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  clearData(e);
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={(e) => {
                  setAddressData(e);
                }}
                disabled={
                  shippingDetails.address.length === 0 ||
                  shippingDetails.city.length === 0 ||
                  shippingDetails.postal.length === 0 ||
                  shippingDetails.country.length === 0
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
