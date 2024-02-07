'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button, Divider, Flex, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { replace } = useRouter();
  const onFinish = async () => {
    try {
      const { data } = await axios.post('https://api.escuelajs.co/api/v1/users/', {
        name: name,
        email: email,
        password: password,
        avatar: 'https://picsum.photos/800'
      });

      console.log(data);

      replace('/login');
    } catch (e: any) {
      throw new Error(e.message);
    }
  };

  return (
    <main>
      <h2>Register</h2>
      <Divider />
      <Form
        layout={'vertical'}
        name="normal_register"
        style={{ width: 400 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
          label="Name"
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          label="Email"
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            type={'email'}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
          label="Password"
          hasFeedback={true}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            minLength={4}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="confirm-password"
          label="Confirm password"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              }
            })
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Flex gap={24} align={'center'} justify={'space-between'}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Sign up
            </Button>
            Or
            <Link href="/login">Log in</Link>
          </Flex>
        </Form.Item>
      </Form>
    </main>
  );
};

export default Register;
