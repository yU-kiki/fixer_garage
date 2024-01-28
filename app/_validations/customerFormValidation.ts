import { OrderCustomerType } from '@/_stores/orderState';
import errorMessage from '@/_validations/error.json';

export const customerFormValidation = (
  request: OrderCustomerType,
) => {
  let errors: { [key: string]: string } = {};
  if (request.name === '') {
    errors.name = errorMessage.fieldValue.emptyName;
  }
  if (request.email === '') {
    errors.email = errorMessage.fieldValue.emptyEmail;
  }
  if (request.phone === '') {
    errors.phone = errorMessage.fieldValue.emptyPhone;
  }
  if (request.postcode === '') {
    errors.postcode = errorMessage.fieldValue.emptyPostcode;
  }
  if (request.prefecture === '') {
    errors.prefecture = errorMessage.fieldValue.emptyPrefecture;
  }
  if (request.city === '') {
    errors.city = errorMessage.fieldValue.emptyCity;
  }
  if (request.address === '') {
    errors.address = errorMessage.fieldValue.emptyAddress;
  }
  if (request.isBillingDiff) {
    if (request.billingPostcode === '') {
      errors.billingPostcode = errorMessage.fieldValue.emptyBillingPostcode;
    }
    if (request.billingPrefecture === '') {
      errors.billingPrefecture = errorMessage.fieldValue.emptyBillingPrefecture;
    }
    if (request.billingCity === '') {
      errors.billingCity = errorMessage.fieldValue.emptyBillingCity;
    }
    if (request.billingAddress === '') {
      errors.billingAddress = errorMessage.fieldValue.emptyBillingAddress;
    }
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
};