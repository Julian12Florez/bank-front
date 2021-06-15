import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams,useHistory } from "react-router-dom";
import { Divider,Button,Descriptions,Table } from "antd";

const AccountStates = () => {

    let { number_account } = useParams();
    let history = useHistory();
    let {identity_number} = JSON.parse(localStorage.getItem("data"));
    const [accountstates,setAccountAtates]=useState([])
    const [movements,setMovements]=useState([])

    const columns = [
        {
          title: 'Numero de cuenta',
          render :(record)=>{
            return (
                <span>{record?.account?.number}</span>
            )
          }
        },
        {
          title: 'Valor del movimiento',
          render :(record)=>{
            return (
                <span>{record?.value}</span>
            )
          }

        },
        {
          title: 'Tipo de movimiento',
          render :(record)=>{
            let value="";
            if (record?.type_movement === 1) {
                value= "Consignación"
            } else if (record?.type_movement === 2) {
                value= "Ingreso"
            }
            return (
                <span>{value}</span>
            )
          }

        },
        {
          title: 'Fecha',
          render :(record)=>{
            return (
                <span>{record?.created_at}</span>
            )
          }

        }
      ];

    const GET_ACCOUNT_STATES = gql`
    query Account($number: String!) {
      AccountStatus(number: $number) {
        id
        number
        balance
        user{
          name
        }
        movements{
          value
          type_movement
          created_at
          account {
            number
          }
        }
      }
    }
    `;


    const { loading, error, data } = useQuery(GET_ACCOUNT_STATES, {
      variables: { number: number_account },
      fetchPolicy: "no-cache"
    });

    if(accountstates.length === 0 && data !== undefined){
        setAccountAtates(data.AccountStatus[0])
        setMovements(data.AccountStatus[0].movements)
    }
  
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    
    return (
        <div>
            <Button onClick={()=>{
                history.push(`/accounts-user/${identity_number}`)
            }}>Volver a la lista de cuentas</Button>
            <Divider></Divider>
            <Descriptions title={`Estado bancario de la cuenta ${number_account}`}>
              <Descriptions.Item label="Número">{accountstates?.number}</Descriptions.Item>
              <Descriptions.Item label="Saldo">{accountstates?.balance}</Descriptions.Item>
              <Descriptions.Item label="Titular">{accountstates?.user?.name}</Descriptions.Item>
              <Descriptions.Item label="Movimientos">
              </Descriptions.Item>
            </Descriptions>
              <Table dataSource={movements} columns={columns} />;

        </div>
    );
};


export default AccountStates;