import React, { useState, useEffect, useContext } from "react";
import "./payment.css";
import SoloAlert from "soloalert";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";
import { useCart } from "react-use-cart";
import buyerAPI from "../../../apis/modules/buyer";
import { BankCart } from "../../../validations";
import { Field, Form, Formik } from "formik";

const CartPayment = (props) => {
  const transfer_amount = props.total;
  const deliveryData = props.deliverFee;
  let totalAmount = transfer_amount + deliveryData.price * 1;
  const items = props.items;
  const shippingAddress = props.shippingDetails;
  const [isLoading, setIsLoading] = useState(false);

  const { loggedIn } = useContext(AuthContext);

  const { emptyCart } = useCart();

  async function sentPayment(data) {
    try {
      setIsLoading(true);
      let email = deliveryData.email;
      let shippingMethod = deliveryData.name;
      let shippingFee = deliveryData.price;
      const user_id = loggedIn._id;
      const newDetails = {
        user_id,
        totalAmount,
        items,
        shippingAddress,
        email,
        shippingMethod,
        shippingFee,
      };
      const orderData = await buyerAPI.placeOrder(newDetails);

      const client_email = loggedIn.email;
      const cartData = {
        client_email,
      };

      const data = await axios.post(
        "http://localhost:5001/cart-payment",
        cartData
      );
      console.log(data);
      SoloAlert.alert({
        title: "Great!",
        body: "you purchase was success",
        icon: "success",
        theme: "dark",
        useTransparency: true,
        onOk: function () {
          emptyCart();
          window.location = "/myorders";
        },
      });
    } catch (e) {
      console.log(e.response.data.message);
      SoloAlert.alert({
        title: "Oops!",
        body: e.response.data.message,
        icon: "error",
        theme: "dark",
        useTransparency: true,
        onOk: function () {},
      });
    }
    setIsLoading(false);
  }

  return (
    <div>
      <img
        src="https://i.postimg.cc/BbrzhpXf/services-left-dec.png"
        alt=""
        class="shape"
      />
      <div>
        <div class="">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-12 mx-auto">
              <div id="pay-invoice" class="card">
                <div class="card-body">
                  <Formik
                    initialValues={{
                      name: "",
                      cart_no: "",
                      expiration: "",
                      security: "",
                    }}
                    validationSchema={BankCart}
                    onSubmit={(values) => {
                      console.log(values);
                      sentPayment(values);
                    }}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <input
                          type="hidden"
                          id="x_first_name"
                          name="x_first_name"
                          value=""
                        />
                        <input
                          type="hidden"
                          id="x_last_name"
                          name="x_last_name"
                          value=""
                        />
                        <input
                          type="hidden"
                          id="x_card_num"
                          name="x_card_num"
                          value=""
                        />
                        <input
                          type="hidden"
                          id="x_exp_date"
                          name="x_exp_date"
                          value=""
                        />
                        <div class="form-group text-center">
                          <ul class="list-inline">
                            <li class="list-inline-item">
                              <i class="text-muted fa fa-cc-visa fa-2x"></i>
                            </li>
                            <li class="list-inline-item">
                              <i class="fa fa-cc-mastercard fa-2x"></i>
                            </li>
                            <li class="list-inline-item">
                              <i class="fa fa-cc-amex fa-2x"></i>
                            </li>
                            <li class="list-inline-item">
                              <i class="fa fa-cc-discover fa-2x"></i>
                            </li>
                          </ul>
                        </div>
                        <div class="form-group">
                          <label>Payment amount</label>
                          <h2>
                            LKR {totalAmount}{" "}
                            <h6>Deliver fee : RS.{deliveryData.price}</h6>
                          </h2>
                        </div>
                        <div class="form-group has-success">
                          <label for="cc-name" class="control-label">
                            Name on Card
                          </label>
                          <Field
                            id="name"
                            name="name"
                            type="text"
                            class="form-control cc-name valid"
                            data-val="true"
                            data-val-required="Please enter the name on card"
                            autocomplete="cc-name"
                            aria-required="true"
                            aria-invalid="false"
                            aria-describedby="cc-name-error"
                          />
                          <span
                            class="help-block field-validation-valid"
                            data-valmsg-for="cc-name"
                            data-valmsg-replace="true"
                          ></span>
                          {errors.name && touched.name ? (
                            <p id={"login-error"} class="text-danger mt-2">
                              {errors.name}
                            </p>
                          ) : null}
                        </div>
                        <div class="form-group">
                          <label for="cc-number" class="control-label">
                            Card Number
                          </label>
                          <Field
                            id="cart_no"
                            name="cart_no"
                            type="number"
                            class="form-control cc-number identified visa"
                            data-val="true"
                            data-val-required="Please enter the card number"
                            data-val-cc-number="Please enter a valid card number"
                            autocomplete="cc-number"
                          />
                          <span
                            class="help-block"
                            data-valmsg-for="cc-number"
                            data-valmsg-replace="true"
                          ></span>
                          {errors.cart_no && touched.cart_no ? (
                            <p id={"login-error"} class="text-danger mt-2">
                              {errors.cart_no}
                            </p>
                          ) : null}
                        </div>
                        <div class="row">
                          <div class="col-6">
                            <div class="form-group">
                              <label for="cc-exp" class="control-label">
                                Expiration
                              </label>
                              <Field
                                id="expiration"
                                name="expiration"
                                type="text"
                                class="form-control cc-exp"
                                data-val="true"
                                data-val-required="Please enter the card expiration"
                                data-val-cc-exp="Please enter a valid month and year"
                                placeholder="MM / YY"
                                autocomplete="cc-exp"
                              />
                              <span
                                class="help-block"
                                data-valmsg-for="cc-exp"
                                data-valmsg-replace="true"
                              ></span>
                              {errors.expiration && touched.expiration ? (
                                <p id={"login-error"} class="text-danger mt-2">
                                  {errors.expiration}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div class="col-6">
                            <label for="x_card_code" class="control-label">
                              Security code
                            </label>
                            <div class="input-group">
                              <Field
                                id="security"
                                name="security"
                                type="Number"
                                class="form-control cc-cvc"
                                data-val="true"
                                data-val-required="Please enter the security code"
                                data-val-cc-cvc="Please enter a valid security code"
                                placeholder="CVV"
                                autocomplete="off"
                              />
                            </div>
                            {errors.security && touched.security ? (
                              <p id={"login-error"} class="text-danger mt-2">
                                {errors.security}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div>
                          <button
                            disabled={isLoading}
                            id="payment-button"
                            type="submit"
                            class="btn btn-lg btn-success btn-block"
                          >
                            <i class="fa fa-lock fa-lg"></i>&nbsp;
                            <span id="payment-button-amount">
                              {isLoading ? "placing order..." : "Pay Now"}
                            </span>
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPayment;
