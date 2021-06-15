import React,{useEffect} from 'react';
import  "./nav.css";
import { Layout, Menu,Modal } from 'antd';
import  MenuComponent from "../components/Menu/MenuComponent";
import { BrowserRouter as Router, Switch, Route, useRouteMatch} from "react-router-dom";
import  TransactionsForm  from "../components/Accounts/AccountsTransactions";
import  AccountsUser  from "../components/Accounts/AccountsUser";
import  AccountStates  from "../components/Accounts/AccountStates";


const { Header, Content, Sider } = Layout;
  

function LayoutComponent() {

      let { path } = useRouteMatch();

        useEffect(()=>{
          Modal.info({
            content: "Por favor seleccione desde el menu un tipo de operación bancaria",
          });
        },[])


        return (
          <Router>

          <Layout>
            <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            
            </Menu>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <MenuComponent/>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >   
                    <Switch>
                        <Route path={`${path}transactions/:account_type`}>
                          <TransactionsForm />
                        </Route>
                        <Route path={`${path}accounts-user/:user`}>
                          <AccountsUser />
                        </Route>
                        <Route path={`${path}account-states/:number_account`}>
                          <AccountStates />
                        </Route>
                  </Switch>
              </Content>
            </Layout>
          </Layout>
        </Layout>,
        </Router>
          );
}

export default LayoutComponent;

