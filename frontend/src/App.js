import React from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import './App.css';

const App = () => {
  const onFinish = (values) => {
    values.expirationDate = values.expirationDate.format('MM/YYYY');
    console.log('Success:', JSON.stringify({ values }));
    fetch(`http://localhost:8000/notes`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }),
    }).then(res => res.json()).then(data => {
      console.log(data)
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Card Number"
        name="cardNumber"
        rules={[
          {
            required: true,
            message: 'Please input your Card Number!',
          },
          { min: 16, message: 'Card Number must be minimum 16 characters.' },
        ]}
      >
        <Input
          maxLength="16"
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </Form.Item>
      <Form.Item
        label="Expiration Date"
        name="expirationDate"
        rules={[
          {
            required: true,
            message: 'Please input your Expiration Date!',
          },
        ]}
      >
        <DatePicker format={'MM/YYYY'} picker="month" />
      </Form.Item>
      <Form.Item
        label="CVV"
        name="cvv"
        rules={[
          {
            required: true,
            message: 'Please input your CVV!',
          },
          { min: 3, message: 'CVV must be minimum 16 characters.' },
        ]}
      >
        <Input
          maxLength="3"
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </Form.Item>
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            message: 'Please input Amount!',
          },
        ]}
      >
        <Input
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;