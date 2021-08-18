const { gql } = require('apollo-server');

module.exports = {
    sketchyShop: gql`
     type Cat {
    id: Int!
    name: String!
    picture: String!
    displayPrice: String!
    chargePrice: Int!
    description: String!
  }
  type Query {
    catsList: [Cat!]!
  }
  
  type DataResponsePI {
    clientSecret: String!
  }

  type PaymentIntentResponse {
    data: DataResponsePI!
  }

  type DataResponsePM {
    methodId: String!
  }

  type PaymentMethodResponse {
    data: DataResponsePM!
  }

  input PaymentIntentInput {
    amount: Int!
    currency: String!
    paymentMethod: String!
  }

  input PaymentMethodInput {
    type: String!
    cardNumber: String!
    expMonth: Int!
    expYear: Int!
    cvc: String!
  }

  type Mutation {
    createPaymentIntent(payload: PaymentIntentInput!): PaymentIntentResponse
    createPaymentMethod(payload: PaymentMethodInput!): PaymentMethodResponse
  }
    `
}