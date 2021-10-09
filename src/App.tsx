import React, {useEffect, useState} from 'react';
import './App.css';
import {Breadcrumb, Col, Layout, Menu, Row} from "antd";
import {ArrowRight, DropletFill, ThermometerHalf} from "react-bootstrap-icons";
import {baseApi} from "./api/baseApi";
import {Mjerenje} from "./models/Mjerenje";
import {Notification} from "./components/helper/Notification";
import {ApiError} from "./models/ApiError";

function App() {
  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;
  const [mjerenje, setMjerenje] = useState<Mjerenje>();

  useEffect(() => {
      (async () => {
          try {
              setMjerenje(await baseApi.get<Mjerenje>("/api/dummy_mjerenje"));

          }
          catch (error) {
              if(error instanceof ApiError) {
                  Notification("error", error.title, error.message);
              }
          }
      })()
  }, []);

  console.log(mjerenje);
  return (
      <Layout style={{ height: "100vh", overflow: "auto" }}>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Home</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['Information']}
                style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="Information" icon={<ArrowRight />} title="Information">
                <Menu.Item key="1">Basic</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Information</Breadcrumb.Item>
              <Breadcrumb.Item>Basic</Breadcrumb.Item>
            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
            >
                <Row>
                    <Col span={24}>
                        euid: {mjerenje?.id}
                    </Col>
                    <Col span={24}>
                        mac: {mjerenje?.mac}
                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col span={0.5} ><ThermometerHalf size={24}/></Col>
                            <Col span={12}>{mjerenje?.temperatura} &#8451;</Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col span={0.5} ><DropletFill size={24}/></Col>
                            <Col span={2}>{mjerenje?.vlaga}</Col>
                        </Row>
                    </Col>
                </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>
  );
}

export default App;
