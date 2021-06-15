import React from 'react';
import { Menu,Tooltip} from 'antd';
import { useRouteMatch,useHistory } from "react-router-dom";
import { gql, useMutation } from '@apollo/client';


const { SubMenu } = Menu;

const LOGOUT = gql`
    mutation logout($id:Int!) {
      logout(id: $id) {
        name
      }
    }
`;

function MenuComponent() {

    let { url } = useRouteMatch();
    let history = useHistory();
    let {id,identity_number} = JSON.parse(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : {id:null,identity_number:null}
    let [ logout ] = useMutation(LOGOUT)

        return (
            <>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <SubMenu key="sub1"
                    onClick={({ key }) => {history.push(key);}}  
                    title="Transacciones Bancarias"  >
                    <Menu.Item key={`${url}transactions/2`}>
                      <Tooltip placement="left" title="Transferencia a Cuentas de Terceros">
                        Transferencia a Cuentas de Terceros
                    </Tooltip>
                    </Menu.Item>
                </SubMenu>
                <Menu.Item onClick={({ key }) => {history.push(key);}}  
                    key={`${url}accounts-user/${identity_number}`}>
                    Estado de cuentas
                </Menu.Item>
                  <Menu.Item onClick={( ) => {
                    logout({variables : { id : parseInt(id) }}).then(
                      async ({data})=>{
                        await localStorage.clear();
                         window.location.href =  await "/login";
                      },
                      error=>{
                        console.log(error);
                      }
                    )
                  }}  
                    key={`logout`}>
                    Salir
                </Menu.Item>
              </Menu>
            </>
          );
}

export default MenuComponent;

