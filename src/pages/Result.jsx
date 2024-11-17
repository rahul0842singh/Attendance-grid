import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const App = () => (
    <>
        <div className='container mt-5'>
            <Result
                status="success"
                title="Payment is successful."
                subTitle="please go to the register section through below register button and register youself as comapny with same email and phone you have done the payment"
                extra={[
                    <Link to="/register">
                        <Button type="primary" key="console">
                            Register
                        </Button>
                    </Link>,
                    <Link to="/" >
                    <Button key="buy">Home</Button>
                    </Link>,
                ]}
            />
        </div>
    </>
);
export default App;