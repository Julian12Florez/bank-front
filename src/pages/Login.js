
import React from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { gql, useMutation } from '@apollo/client';
import { useHistory} from "react-router-dom";

const LOGIN = gql`
    mutation Login($password: String!, $identity_number:Int!) {
      login(password: $password, identity_number: $identity_number) {
        identity_number,id,name,api_token
      }
    }
`;


const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function Login() {

    const [form] = Form.useForm();
    const [login] = useMutation(LOGIN);
    const history = useHistory()

      const onFinish = async (values) => {
        login({variables : values}).then(
            ({data}) => {
                localStorage.setItem("token",data.login.api_token)
                localStorage.setItem("data",JSON.stringify(data.login))
                Modal.success({
                    content: "La identificación y clave son correctas.",
                    onOk() {
                        history.push("/")
                    }
                  });
            },
            error => {
              Modal.error({
                  title: 'Credenciales no validas',
                  content: 'Por favor verifique su identificación o contraseña',
              });
           }
        );
    };
    
    
      return (
          <div >
        <Form
          {...layout}
          form={form} 
          name="basic"
          style={{
            margin: "0",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            msTransform: "translate(-50%, -50%)"
          }}
        >
          <Form.Item
            label="Identificación"
            name="identity_number"
            rules={[
              {
                required: true,
                message: 'Por favor ingrese su numero de identificación',
              }
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Clave"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please ingrese su clave de acceso',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" onClick={()=>{
                form
                .validateFields()
                .then(values => {
                    values.identity_number = parseInt(values.identity_number)
                    onFinish(values);
                })
                .catch(info => {
                });
            }}>
              Ingresar
            </Button>
          </Form.Item>
        </Form>
        </div>
      );

}

export default Login;
