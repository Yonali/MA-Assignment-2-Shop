import React, { useState, useEffect, useContext } from "react";
import "./payment.css";
import SoloAlert from "soloalert";
import axios from "axios";
import buyerAPI from "../../../apis/modules/buyer";
import AuthContext from "../../../context/AuthContext";
import { useCart } from "react-use-cart";
import { Mobile } from "../../../validations";
import { Field, Form, Formik } from "formik";

const MobilePayment = (props) => {
  const transfer_amount = props.total;
  const deliveryData = props.deliverFee;
  let totalAmount = transfer_amount + deliveryData.price * 1;
  const items = props.items;
  const shippingAddress = props.shippingDetails;
  const [isLoading, setIsLoading] = useState(false);

  const { loggedIn } = useContext(AuthContext);

  const { emptyCart } = useCart();

  async function sentPayment(mobile) {
    try {
      const text = "+94";
      setIsLoading(true);
      const user_id = loggedIn._id;
      let email = deliveryData.email;
      let shippingMethod = deliveryData.name;
      let shippingFee = deliveryData.price;
      const phone = text + parseInt(mobile, 10);
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
      const mobileData = {
        phone,
      };
      const data = await axios.post(
        "http://localhost:5002/mobile-payment",
        mobileData
      );
      // console.log(data)
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
      <div>
        <div class="">
          <div class="row">
            <div class="col-12 col-sm-12 col-md-12 mx-auto">
              <div id="pay-invoice" class="card">
                <div class="card-body">
                  <Formik
                    initialValues={{
                      phone: "",
                    }}
                    validationSchema={Mobile}
                    onSubmit={(values) => {
                      console.log(values);
                      sentPayment(values.phone);
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
                        <div class="form-group">
                          <label>Payment amount</label>
                          <h2>LKR {totalAmount}</h2>
                          <h6>Deliver fee : RS.{deliveryData.price}</h6>
                        </div>
                        <div class="form-group has-success">
                          <label for="cc-name" class="control-label">
                            Enter mobile number
                          </label>
                          <Field
                            id="phone"
                            name="phone"
                            type="number"
                            placeholder="Please enter you mobile number"
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
                          {errors.phone && touched.phone ? (
                            <p id={"login-error"} class="text-danger mt-2">
                              {errors.phone}
                            </p>
                          ) : null}
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
                              {isLoading ? "placing order..." : "Pay now"}
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

export default MobilePayment;
