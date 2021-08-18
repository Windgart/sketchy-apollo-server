require("dotenv").config();
const { ApolloServer } = require('apollo-server');
const { catsList } = require('./data');
const { sketchyShop } = require('./typeDef')
const { RESTDataSource } = require('apollo-datasource-rest');

const { STRIPE_API_SERVICE } = process.env

class PaymentApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = STRIPE_API_SERVICE;
  }
  async createPaymentIntent(payload) {
    return this.post(
      `/create-payment-intent`,  
      payload      
    )
  }
  async createPaymentMethod(payload) {
    return this.post(
      `/create-payment-method`, 
      payload
      ) 
    }
}

const resolvers = {
  Query: {
    catsList: () => catsList,
  },
  Mutation: {
    createPaymentIntent: async (_, {payload} , { dataSources }) => {
      const response = await dataSources.PaymentApi.createPaymentIntent(payload);
      if(response) {
        return response
      }
    },
    createPaymentMethod: async (_, { payload }, { dataSources }) => {
      const response = await dataSources.PaymentApi.createPaymentMethod(payload);
      if(response) {
        return response
      }
    },
   
  },
};

const server = new ApolloServer({
  typeDefs: sketchyShop,
  resolvers,
  introspection: true,
  dataSources: () => {
    return {
      PaymentApi: new PaymentApi(),
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
