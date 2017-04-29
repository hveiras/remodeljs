'use strict';

const compile = require('../lib/compile');

describe.only('Compiler Tests', () => {
  it('should compile definition', () => {
    const def = {
      mapper: {
        version: '1.0'
      },
      description: 'Search Contact',
      input: {
        CustomerID: 1,
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        Addresses: [
          {
            street: '',
            number: 1,
            floor: 1,
            department: ''
          }
        ]
      },
      output: {
        customerId: 1,
        firstName: '',
        middleName: '',
        lastName: '',
        attribures: '',
        email: {
          name: '',
          isPrimary: true,
          type: ''
        },
        phones: [
          {
            number: '',
            isPrimary: true,
            type: ''
          }
        ],
        address: ''
      },
      mappings: [
        {
          type: 'OneToOne',
          source: { value: 'CustomerID', type: 'identifier' },
          target: { value: 'customerId' }
        },
        {
          type: 'OneToOne',
          source: { value: 'FirstName', type: 'identifier' },
          target: { value: 'firstName' }
        },
        {
          type: 'OneToOne',
          source: { value: 'LastName', type: 'identifier' },
          target: { value: 'lastName' }
        },
        {
          type: 'OneToOne',
          source: { value: 'Email', type: 'identifier' },
          target: { value: 'email.name' }
        },
        {
          description: 'map Phone to the array phones',
          type: 'OneToMany',
          source: { value: 'Phone', type: 'identifier' },
          target: { value: 'phones' }
        },
        {
          description: 'map only the first item of Addresses to address',
          type: 'ManyToOne',
          source: { value: 'Addresses', type: 'identifier' },
          target: { value: 'address' },
          exp: 'x => x[0]'
        }
      ]
    };

    const code = compile(def);
    console.log(code);
  });
});
