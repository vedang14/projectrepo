/*!
=========================================================
* Now UI Dashboard React - v1.2.0
=========================================================
* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import axios from 'axios';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart
} from "variables/charts.jsx";

const Messages = props =>(
  <tr>
  <td>
                            <FormGroup check>
                              <Label check>
                                <Input defaultChecked type="checkbox" />
                                <span className="form-check-sign" />
                              </Label>
                            </FormGroup>
                          </td>
  <td> {props.messages.query}</td>
  <td>{ props.messages.queryResponse}</td>
  <td className="td-actions text-right">
    <Button
      className="btn-round btn-icon btn-icon-mini btn-neutral"
      color="info"
      id="tooltip731609871"
      type="button"
    >
      <i className="now-ui-icons ui-2_settings-90" />
    </Button>
    <UncontrolledTooltip
      delay={0}
      target="tooltip731609871"
    >
      Edit Task
    </UncontrolledTooltip>
    <Button
      className="btn-round btn-icon btn-icon-mini btn-neutral"
      color="danger"
      id="tooltip923217206"
      type="button"
    >
      <i className="now-ui-icons ui-1_simple-remove" />
    </Button>
    <UncontrolledTooltip
      delay={0}
      target="tooltip923217206"
    >
      Remove
    </UncontrolledTooltip>
  </td>

  </tr>
)



class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {messages:[]};
    let arr  = [];
  }

  componentDidMount(){
    axios.get('http://localhost:4000/messages/getmessage')
    .then(res =>{
      this.setState({messages :res.data});

    })
    .catch((error) =>{
      console.log(error);
    })
  }

  messageList(){
    let arr  = [];
    return this.state.messages.map(currentmsg =>{
      arr.push(currentmsg.intentconf)

      return <Messages messages={currentmsg} />;
    })
  }


  render() {
    return (
      <>
        <PanelHeader
          size="lg"
          content={
            <Line
              data={dashboardPanelChart.data}
              options={dashboardPanelChart.options}
            />
          }
        />
        <div className="content">

          <Row>
            <Col xs={12} md={6}>
              <Card className="card-tasks">
                <CardHeader>
                  <h5 className="card-category">Backend Development</h5>
                  <CardTitle tag="h4">Transcripts</CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                    <Table>
                      <tbody>
                        {this.messageList()}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="now-ui-icons loader_refresh spin" /> Updated 1
                    minutes ago
                  </div>
                </CardFooter>
              </Card>
            </Col>
  <Col xs={12} md={6}>
                <Card className="card-chart">
                <CardHeader>
                <h5 className="card-category">Intent Detection</h5>
                <CardTitle tag="h4">Intent Confidence Analysis</CardTitle>
                <UncontrolledDropdown>
                <DropdownToggle
                className="btn-round btn-outline-default btn-icon"
                color="default"
                >
                <i className="now-ui-icons loader_gear" />
                </DropdownToggle>
                <DropdownMenu right>
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another Action</DropdownItem>
                <DropdownItem>Something else here</DropdownItem>
                <DropdownItem className="text-danger">
                Remove data
                </DropdownItem>
                </DropdownMenu>
                </UncontrolledDropdown>
                </CardHeader>
                <CardBody>
                <div className="chart-area">
                <Line
                data= {dashboardShippedProductsChart.data}
                options={dashboardShippedProductsChart.options}
                />
                </div>
                </CardBody>
                <CardFooter>
                <div className="stats">
                <i className="now-ui-icons arrows-1_refresh-69" /> Just
                Updated
                </div>
                </CardFooter>
                </Card>
                </Col>

              <Card>
                <CardHeader>
                  <h5 className="card-category">All Persons List</h5>
                  <CardTitle tag="h4">Employees Stats</CardTitle>
                </CardHeader>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th className="text-right">Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Dakota Rice</td>
                        <td>Niger</td>
                        <td>Oud-Turnhout</td>
                        <td className="text-right">$36,738</td>
                      </tr>
                      <tr>
                        <td>Minerva Hooper</td>
                        <td>Curaçao</td>
                        <td>Sinaai-Waas</td>
                        <td className="text-right">$23,789</td>
                      </tr>
                      <tr>
                        <td>Sage Rodriguez</td>
                        <td>Netherlands</td>
                        <td>Baileux</td>
                        <td className="text-right">$56,142</td>
                      </tr>
                      <tr>
                        <td>Doris Greene</td>
                        <td>Malawi</td>
                        <td>Feldkirchen in Kärnten</td>
                        <td className="text-right">$63,542</td>
                      </tr>
                      <tr>
                        <td>Mason Porter</td>
                        <td>Chile</td>
                        <td>Gloucester</td>
                        <td className="text-right">$78,615</td>
                      </tr>
                    </tbody>
                  </Table>
                </CardBody>
              </Card>

          </Row>
        </div>
      </>
    );
  }
}
export default Dashboard;
