import { createAction } from "@reduxjs/toolkit";

export const setPaymentMode = createAction("checkout/setPaymentMode");
export const setPaymentDuration = createAction("checkout/setPaymentDuration");
export const setAddress = createAction("checkout/setAddress");