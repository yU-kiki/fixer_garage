import { OrderCustomerType } from '@/_stores/orderState';
import errorMessage from '@/_validations/error.json';

const isValidEmail = (email: string) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const isValidPhone = (phone: string) => {
  const re = /^\d{10,11}$/;
  return re.test(phone);
};

const isValidPostcode = (postcode: string) => {
  const re = /^\d{7}$/;
  return re.test(postcode);
};

export const customerFormValidation = (request: OrderCustomerType) => {
  const errors: { [key: string]: string } = {};

  if (!request.name) {
    errors.name = errorMessage.fieldValue.emptyName;
  }
  if (!request.email) {
    errors.email = errorMessage.fieldValue.emptyEmail;
  } else if (!isValidEmail(request.email)) {
    errors.email = errorMessage.fieldValue.invalidEmail;
  }
  if (!request.phone) {
    errors.phone = errorMessage.fieldValue.emptyPhone;
  } else if (!isValidPhone(request.phone)) {
    errors.phone = errorMessage.fieldValue.invalidPhone;
  }
  if (!request.postcode) {
    errors.postcode = errorMessage.fieldValue.emptyPostcode;
  } else if (!isValidPostcode(request.postcode)) {
    errors.postcode = errorMessage.fieldValue.invalidPostcode;
  }
  if (!request.prefecture) {
    errors.prefecture = errorMessage.fieldValue.emptyPrefecture;
  }
  if (!request.city) {
    errors.city = errorMessage.fieldValue.emptyCity;
  }
  if (!request.address) {
    errors.address = errorMessage.fieldValue.emptyAddress;
  }

  if (request.isBillingDiff) {
    if (!request.billingPostcode) {
      errors.billingPostcode = errorMessage.fieldValue.emptyBillingPostcode;
    } else if (!isValidPostcode(request.billingPostcode)) {
      errors.billingPostcode = errorMessage.fieldValue.invalidBillingPostcode;
    }
    if (!request.billingPrefecture) {
      errors.billingPrefecture = errorMessage.fieldValue.emptyBillingPrefecture;
    }
    if (!request.billingCity) {
      errors.billingCity = errorMessage.fieldValue.emptyBillingCity;
    }
    if (!request.billingAddress) {
      errors.billingAddress = errorMessage.fieldValue.emptyBillingAddress;
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
};
