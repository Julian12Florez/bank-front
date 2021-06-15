import React, { useState } from 'react';
import {useParams} from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import { Table,Button,Alert,Divider } from "antd";
import { useHistory } from "react-router-dom";

const AccountsUser = () => {
    let { user } = useParams();
    let [accounts,setAccounts] = useState([]);
    let history = useHistory();

    const USER_ACCOUNTS = gql`
      query UserAccounts($identity_number: Int!) {
        ClientAccounts(identity_number: $identity_number) {
          id
          number
          balance
        }
      }
    `;
  

    const { loading, error, data } = useQuery(USER_ACCOUNTS, {
      variables: { identity_number: parseInt(user) },
      fetchPolicy: "no-cache"
    });

    if(accounts.length === 0 && data !== undefined){
      setAccounts(data.ClientAccounts)
    }
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
    const columns = [
      {
        title: 'Numero de cuenta',
        dataIndex: 'number',
        key: 'number',
      },
      {
        title: 'Saldo',
        dataIndex: 'balance',
        key: 'balance',
      },
      {
        title: 'Edit',
        dataIndex: 'number',
        key: 'number',
        render : (number_account)=>{
          return (
            <Button onClick={()=>{
              history.push(`/account-states/${number_account}`)
            }}>Ver Estado</Button>
          )
        }
      },
    ];

    return (
        <div>
            <Alert message="Seleccione la cuenta de la que desea conocer el estado" type="info" />
            <Divider></Divider>
            <Table dataSource={accounts} columns={columns} />;
        </div>
    );
};


export default AccountsUser;