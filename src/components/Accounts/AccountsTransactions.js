import React, { useState } from 'react';
import { gql, useQuery,useMutation } from '@apollo/client';
import { Button,Alert,Divider,Form,Input,Select,Modal } from "antd";

const GET_ACCOUNTS = gql`
  query accounts {
  accounts {
    id
    number
    user_id
  }
}
`;

const TRANSACTION = gql`
    mutation transaction($origin_account: Int!, $destination_account: Int!, $value: Int!) {
      createMovement(origin_account: $origin_account, destination_account: $destination_account, value: $value) {
        id
        value
        account {
          number
          balance
        }
      }
    }
`;
function TransactionsForm() {

    const [form] = Form.useForm();
    let [accounts_origin,setAccountsOrigin]= useState([])
    let [accounts_destination,setAccountsDestination]= useState([])
    let { id  }=JSON.parse(localStorage.getItem("data"))
    const { loading, error, data } = useQuery(GET_ACCOUNTS);
    const [transaction] = useMutation(TRANSACTION);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
    if(accounts_origin.length === 0 && data ){
      // eslint-disable-next-line 
       let options_origin = data.accounts.map(account => {
         if(account.user_id === parseInt(id)){
          return { label : account.number , value:account.id }
        }}).filter(option => option !== undefined);
        setAccountsOrigin(options_origin)
     }

    if(accounts_destination.length === 0 && data ){
      // eslint-disable-next-line 
       let options_origin = data.accounts.map(account => {
         if(account.user_id !== parseInt(id)){
          return { label : account.number , value:account.id }
        }}).filter(option => option !== undefined);
        setAccountsDestination(options_origin)
     }

    const onFinish = async (values) => {
      values.destination_account = parseInt(values.destination_account)
      values.origin_account = parseInt(values.origin_account)
      values.value = parseInt(values.value)
      transaction({variables : values}).then(
          ({data}) => {
            Modal.success({
                content: `la transferencia entre cuentas se pudo realizar de manera satisfactoria, el código de su transacción es ${data.createMovement.id}`,
          });
        },
        (error) => {
          let errors = error.graphQLErrors;
          if(errors[0].extensions.category === "validation"){
              Modal.error({
                  content: `${errors[0].extensions.validation.value[0]}`,
              });
            }
         }
      );
  };
  
    return (
      <div>
        <Alert message="Esta realizando una transacción a terceros" type="info" />
        <Divider></Divider>
        <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <Form.Item name="value" label="Monto de la transferencia">
          <Input  />
        </Form.Item>
        
        <Form.Item name="origin_account" label="Cuenta de origen">
          <Select options={accounts_origin}>
                     </Select>
        </Form.Item>

        <Form.Item name="destination_account" label="Cuenta de destino">
          <Select options={accounts_destination}>
          </Select>
        </Form.Item>

        <Form.Item >
            <Button type="primary" onClick={()=>{
                form
                .validateFields()
                .then(values => {
                    onFinish(values);
                })
                .catch(info => {
                });
            }}>
              Submit
            </Button>
          </Form.Item>
      </Form>
       </div>
    );
}

export default TransactionsForm;